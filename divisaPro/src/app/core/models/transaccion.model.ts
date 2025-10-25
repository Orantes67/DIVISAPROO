export interface Transaccion {
  id_transaccion?: number;
  id_cartera: number;
  tipo: 'ingreso' | 'egreso' | 'transferencia';
  monto: number;
  divisa: string;
  tasa_cambio: number;
  descripcion?: string;
  fecha_transaccion?: string;
}
