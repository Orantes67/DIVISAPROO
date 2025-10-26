-- =========================================
-- IMPORTANTE: Eliminada la línea CREATE DATABASE. 
-- MySQL la crea automáticamente con el nombre de la variable MYSQL_DATABASE.
-- Solo cambiamos el nombre de la base de datos a usar.
-- =========================================

-- Usamos la base de datos definida en docker-compose (hector_robles_orantes_db)
-- NOTA: Debes confirmar que tu DB_NAME en el backend también es hector_robles_orantes_db
USE hector_robles_orantes_db;

-- =========================================
-- TABLA: cartera
-- =========================================
CREATE TABLE IF NOT EXISTS cartera (
 id_cartera INT AUTO_INCREMENT PRIMARY KEY,
 saldo_total DECIMAL(15, 2) DEFAULT 0.00,
 moneda_base VARCHAR(10) DEFAULT 'USD',
 fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
 ON UPDATE CURRENT_TIMESTAMP
);

-- =========================================
-- TABLA: transaccion
-- =========================================
CREATE TABLE IF NOT EXISTS transaccion (
 id_transaccion INT AUTO_INCREMENT PRIMARY KEY,
 id_cartera INT NOT NULL,
 tipo ENUM('ingreso', 'egreso', 'transferencia') NOT NULL,
 monto DECIMAL(15, 2) NOT NULL,
 divisa VARCHAR(10) NOT NULL,
 tasa_cambio DECIMAL(10, 4) DEFAULT 1.0000,
descripcion VARCHAR(255),
fecha_transaccion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (id_cartera) REFERENCES cartera(id_cartera)
);

-- =========================================
-- TRIGGER: actualizar saldo de la cartera
-- =========================================
DELIMITER $$

-- Se agrega 'DROP TRIGGER IF EXISTS' para evitar errores al reiniciar el contenedor
DROP TRIGGER IF EXISTS actualizar_saldo_cartera;
CREATE TRIGGER actualizar_saldo_cartera
AFTER INSERT ON transaccion
FOR EACH ROW
BEGIN
    IF NEW.tipo = 'ingreso' THEN
     UPDATE cartera 
     SET saldo_total = saldo_total + (NEW.monto * NEW.tasa_cambio)
     WHERE id_cartera = NEW.id_cartera;
 ELSEIF NEW.tipo = 'egreso' THEN
 UPDATE cartera 
 SET saldo_total = saldo_total - (NEW.monto * NEW.tasa_cambio)
WHERE id_cartera = NEW.id_cartera;
 END IF;
END$$

DELIMITER ;

-- =========================================
-- EJEMPLOS DE INSERCIÓN (Para pruebas)
-- Se envuelve en una verificación para que solo se ejecute si la tabla está vacía.
-- =========================================
INSERT INTO cartera (saldo_total, moneda_base)
SELECT 500.00, 'USD'
WHERE NOT EXISTS (SELECT 1 FROM cartera WHERE id_cartera = 1);

INSERT INTO transaccion (id_cartera, tipo, monto, divisa, tasa_cambio, descripcion)
SELECT 1, 'ingreso', 200.00, 'USD', 1.0000, 'Depósito inicial'
WHERE NOT EXISTS (SELECT 1 FROM transaccion WHERE id_transaccion = 1);
-- (el segundo INSERT en transaccion se ejecutará gracias al trigger)

-- =========================================
-- VERIFICAR RESULTADOS (Opcional: puedes quitarlos ya que el script INIT no debería devolver resultados)
-- =========================================
-- SELECT * FROM cartera;
-- SELECT * FROM transaccion;