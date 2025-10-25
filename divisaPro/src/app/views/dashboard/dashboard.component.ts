import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { CarteraService } from '../../core/services/cartera.service';
import { Cartera } from '../../core/models/cartera.model';
import { FrankfurterService } from '../../core/services/frankfuter.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  cartera?: Cartera;
  tasaCambio: string = 'Cargando...';
  chart?: Chart;

  constructor(
    private carteraService: CarteraService,
    private frankfurterService: FrankfurterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCartera();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.crearGrafica(), 500);
  }

  irA(ruta: string) {
    this.router.navigate([ruta]);
  }

  cargarCartera() {
    this.carteraService.list().subscribe((carteras) => {
      this.cartera = carteras && carteras.length ? carteras[0] : undefined;

      if (this.cartera?.moneda_base) {
        this.frankfurterService
          .obtenerTasa(this.cartera.moneda_base, 'EUR')
          .subscribe((data) => {
            const tasa = data?.rates?.EUR;
            this.tasaCambio = tasa
              ? `1 ${this.cartera!.moneda_base} = ${tasa} EUR`
              : 'No disponible';
          });
      }
    });
  }

  crearGrafica() {
    const ctx = document.getElementById('saldoChart') as HTMLCanvasElement;
    if (!ctx) return;

    const data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [
        {
          label: 'Saldo (Histórico)',
          data: [500, 700, 650, 800, 900, 950],
          borderColor: '#2563EB',
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
          fill: true,
          tension: 0.3,
        },
      ],
    };

    this.chart = new Chart(ctx, {
      type: 'line',
      data,
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true },
        },
      },
    });
  }
}
