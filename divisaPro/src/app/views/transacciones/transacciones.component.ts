import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransaccionService } from '../../core/services/transaccion.service';
import { Transaccion } from '../../core/models/transaccion.model';

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css'] 
})

export class TransaccionesComponent implements OnInit {
    transacciones: Transaccion[] = [];

  // Campos del formulario
  mostrarFormulario = false;
  nuevaTransaccion: Transaccion = {
  tipo: 'ingreso',
  monto: 0,
  divisa: '',
  descripcion: '',
  id_cartera: 0,    // Asigna el id_cartera correcto según tu lógica
  tasa_cambio: 1    // Valor por defecto, ajústalo si es necesario
};
  constructor(private transaccionService: TransaccionService) {}

  ngOnInit(): void {
    this.listar();
  }

  // 🔹 Cargar todas las transacciones
  listar() {
    this.transaccionService.list().subscribe({
      next: (data) => this.transacciones = data,
      error: (err) => console.error('Error al listar transacciones:', err)
    });
  }

  // 🔹 Mostrar / ocultar formulario
  abrirFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  // 🔹 Crear nueva transacción
crear() {
  if (!this.nuevaTransaccion.tipo || !this.nuevaTransaccion.divisa || !this.nuevaTransaccion.monto) {
    alert('Por favor completa todos los campos obligatorios.');
    return;
  }

  // Asegúrate de asignar el id_cartera correcto aquí
  this.nuevaTransaccion.id_cartera = 1; // <-- reemplaza por el id real

  this.transaccionService.create(this.nuevaTransaccion).subscribe({
    next: (res) => {
      alert('Transacción creada correctamente ✅');
      this.nuevaTransaccion = {
        tipo: 'ingreso',
        monto: 0,
        divisa: '',
        descripcion: '',
        id_cartera: 0,
        tasa_cambio: 1
      };
      this.mostrarFormulario = false;
      this.listar();
    },
    error: (err) => {
      console.error(err);
      alert('Error al crear transacción.');
    }
  });
}

  // 🔹 Eliminar transacción
  eliminar(id?: number) {
    if (!id) return;
    if (!confirm('¿Deseas eliminar esta transacción?')) return;

    this.transaccionService.delete(id).subscribe({
      next: () => {
        alert('Transacción eliminada correctamente 🗑️');
        this.listar();
      },
      error: (err) => {
        console.error(err);
        alert('Error al eliminar la transacción.');
      }
    });
  }
}
