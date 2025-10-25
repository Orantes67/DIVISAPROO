export default class Transaccion {
    constructor({ id_transaccion = null, id_cartera, tipo, monto, divisa, tasa_cambio = 1.0, descripcion, fecha_transaccion = null }) {
        this.id_transaccion = id_transaccion;
        this.id_cartera = id_cartera;
        this.tipo = tipo;
        this.monto = monto;
        this.divisa = divisa;
        this.tasa_cambio = tasa_cambio;
        this.descripcion = descripcion;
        this.fecha_transaccion = fecha_transaccion;
    }
}
