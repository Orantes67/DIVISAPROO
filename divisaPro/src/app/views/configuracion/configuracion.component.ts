import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarteraService } from '../../core/services/cartera.service';
import { Cartera } from '../../core/models/cartera.model';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Necesario para ngModel y pipes
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  cartera?: Cartera;
  monedaSeleccionada = 'USD';
  monedas = ['USD', 'EUR', 'MXN', 'GBP', 'JPY', 'AUD', 'CAD'];

  constructor(private carteraService: CarteraService) {}

  ngOnInit(): void {
    this.carteraService.list().subscribe(c => {
      this.cartera = c && c.length ? c[0] : undefined;
      if (this.cartera) this.monedaSeleccionada = this.cartera.moneda_base;
    });
  }

 guardar() {
  if (!this.cartera) {
    const nueva: Cartera = { saldo_total: 0, moneda_base: this.monedaSeleccionada };
    this.carteraService.create(nueva).subscribe(res => {
      alert('Cartera creada con moneda base ' + res.moneda_base);
      this.cartera = res;
    });
    return;
  }

  // Usa el ID conocido
  const id = 1; // o this.cartera.id_cartera si ya está definido

  const updated: Cartera = {
    ...this.cartera,
    moneda_base: this.monedaSeleccionada,
    saldo_total: this.cartera.saldo_total
  };

  this.carteraService.update(id, updated).subscribe(res => {
    alert('Moneda base actualizada a ' + res.moneda_base);
    this.cartera = res;
  }, err => {
    console.error(err);
    alert('Error actualizando cartera.');
  });
}
  resetCartera() {
    if (!this.cartera) return;
    if (!confirm('¿Deseas eliminar todas las transacciones y reiniciar la cartera?')) return;

    this.carteraService.delete(this.cartera.id_cartera!).subscribe(() => {
      alert('Cartera eliminada. Refresca la página para crear una nueva.');
      this.cartera = undefined;
    });
  }
}
