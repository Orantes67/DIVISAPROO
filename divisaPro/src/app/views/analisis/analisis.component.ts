import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { Transaccion } from '../../core/models/transaccion.model';
import { TransaccionService } from '../../core/services/transaccion.service';
import { Cartera } from '../../core/models/cartera.model';
import { CarteraService } from '../../core/services/cartera.service';

@Component({
  selector: 'app-analisis',
  standalone: true,
  imports: [CommonModule, FormsModule], // 🔹 Necesario para pipes y ngModel
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.css']
})
export class AnalisisComponent implements OnInit {
  transacciones: Transaccion[] = [];
  cartera?: Cartera;
  exposure: { [currency: string]: number } = {};
  selectedCurrency = 'EUR';
  windowDays = 30;
  loading = false;

  // proyección
  historicalRates: { date: string, rate: number }[] = [];
  lastRate = 0;
  projectedRate = 0;
  expectedPL = 0;
  chart: any;

  constructor(
    private transService: TransaccionService,
    private carteraService: CarteraService,
    private http: HttpClient
  ) {}
  
  getKeys(obj: any): string[] {
  return Object.keys(obj || {});
}
  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.loading = true;
    try {
      this.transService.list().subscribe(tx => {
        this.transacciones = tx || [];
        this.computeExposure();
      });

      this.carteraService.list().subscribe(c => {
        this.cartera = c && c.length ? c[0] : undefined;
      });
    } finally {
      this.loading = false;
    }
  }

  computeExposure() {
    this.exposure = {};
    for (const t of this.transacciones) {
      if (!this.exposure[t.divisa]) this.exposure[t.divisa] = 0;
      this.exposure[t.divisa] += (t.tipo === 'egreso') ? -t.monto : t.monto;
    }
  }

  private dateStr(d: Date) {
    return formatDate(d, 'yyyy-MM-dd', 'en-US');
  }

  async analizar() {
    if (!this.cartera) {
      alert('Primero crea o selecciona una cartera (moneda base).');
      return;
    }

    this.loading = true;
    try {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - this.windowDays);

      const startStr = this.dateStr(start);
      const endStr = this.dateStr(end);

      const url = `https://api.frankfurter.app/${startStr}..${endStr}?from=${this.cartera.moneda_base}&to=${this.selectedCurrency}`;
      const resp: any = await this.http.get(url).toPromise();

      const ratesArray: { date: string, rate: number }[] = [];
      const dates = Object.keys(resp.rates).sort();
      for (const d of dates) {
        ratesArray.push({ date: d, rate: resp.rates[d][this.selectedCurrency] });
      }

      this.historicalRates = ratesArray;
      if (ratesArray.length === 0) {
        alert('No hay datos históricos disponibles para el rango seleccionado.');
        return;
      }

      this.lastRate = ratesArray[ratesArray.length - 1].rate;

      const returns: number[] = [];
      for (let i = 1; i < ratesArray.length; i++) {
        const r = Math.log(ratesArray[i].rate / ratesArray[i - 1].rate);
        returns.push(r);
      }

      const avgReturn = returns.reduce((a, b) => a + b, 0) / (returns.length || 1);
      const variance = returns.reduce((a, b) => a + Math.pow(b - avgReturn, 2), 0) / (returns.length || 1);
      const volatility = Math.sqrt(variance);

      const horizonDays = 30;
      const projectedLogReturn = avgReturn * horizonDays;
      this.projectedRate = this.lastRate * Math.exp(projectedLogReturn);

      const exposureInSelected = this.exposure[this.selectedCurrency] || 0;
      const delta = this.projectedRate - this.lastRate;
      this.expectedPL = exposureInSelected * delta;

      this.plotChart();
    } catch (err) {
      console.error(err);
      alert('Error obteniendo datos históricos. Revisa la consola.');
    } finally {
      this.loading = false;
    }
  }

  plotChart() {
    const labels = this.historicalRates.map(r => r.date);
    const data = this.historicalRates.map(r => r.rate);

    if (this.chart) this.chart.destroy();

    const ctx = (document.getElementById('historyChart') as HTMLCanvasElement).getContext('2d')!;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: `${this.cartera?.moneda_base} → ${this.selectedCurrency}`,
          data,
          fill: true,
          tension: 0.25,
          pointRadius: 2
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { x: { display: true }, y: { display: true } }
      }
    });
  }

  formatNumber(n: number) {
    return n ? n.toFixed(4) : '0.0000';
  }
}
