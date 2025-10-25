import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FrankfurterService } from '../../core/services/frankfuter.service'; // importa el servicio

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent {
  monto: number = 0;
  from: string = 'USD';
  to: string = 'EUR';
  resultado: number | null = null;
  tasa: number | null = null;

  constructor(private frankfurter: FrankfurterService) {}

  convertir() {
    if (!this.monto || !this.from || !this.to) {
      alert('Por favor, ingresa monto y divisas válidas');
      return;
    }

    this.frankfurter.obtenerTasa(this.from, this.to, this.monto).subscribe({
      next: (data) => {
        const rate = data?.rate || null;
        if (rate) {
          this.tasa = rate;
          this.resultado = data.convertedAmount ?? (this.monto * rate);
        } else {
          alert('No se pudo obtener la tasa de cambio.');
        }
      },
      error: (err) => {
        console.error('Error al convertir divisa:', err);
        alert('Error al conectar con el servidor.');
      }
    });
  }
}