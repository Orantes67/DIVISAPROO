export default class Cartera {
    constructor({ id, saldo_total, moneda_base, fecha_creacion, ultima_actualizacion }) {
        this.id = id;
        this.saldo_total = saldo_total;
        this.moneda_base = moneda_base;
        this.fecha_creacion = fecha_creacion;
        this.ultima_actualizacion = ultima_actualizacion;
    }
}
