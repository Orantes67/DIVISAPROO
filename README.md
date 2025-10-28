# DIVISAPRO

Proyecto full-stack para gestión de carteras y transacciones con conversión de divisas.

Este repositorio contiene un backend en Express, un frontend en Angular y una base de datos MySQL, además de un archivo `docker-compose.yml` para orquestarlos.

---

## Estructura principal

- `API/` — Backend (Express.js)
  - `src/cartera` — lógica de carteras (controllers, usecases, repo)
  - `src/transaccion` — lógica de transacciones (controllers, usecases, repo)
  - `src/core/frankfurter.js` — servicio para conversión de divisas
  - `Dockerfile`, `package.json`, `app.js`, `server.js`
- `divisaPro/` — Frontend (Angular)
  - `src/app/core/services` — `cartera.service.ts`, `transaccion.service.ts`, `frankfuter.service.ts`
  - `angular.json`, `package.json`
- `mysqlinit/schema.sql` — script SQL para inicializar la base de datos
- `docker-compose.yml` — orquesta contenedores: MySQL, backend y frontend

---

## Requisitos

- Docker y Docker Compose instalados (recomendado).
- (Opcional) Node.js y Angular CLI si prefieres ejecutar frontend/backend localmente sin Docker.

---

## Levantar todo con Docker Compose (modo recomendado)

En PowerShell (desde la raíz del proyecto):

```powershell
docker-compose up --build -d

# Ver logs del backend
docker-compose logs -f hector-backend

# Parar y eliminar contenedores
docker-compose down
```

Notas importantes:
- La base de datos MySQL se inicializa con `mysqlinit/schema.sql` la primera vez que se crea el contenedor.
- Puertos por defecto: MySQL 3306, Backend 3000, Frontend 4200.

Credenciales (tal como están en `docker-compose.yml`):

- DB name: `hector_robles_orantes_db`
- DB user: `hector_robles_orantes`
- DB password: `hectororantessoft2025`
- MySQL root password: `hectorsoft2025`

---

## Ejecutar servicios en desarrollo (sin Docker)

Backend (API):

```powershell
cd .\API
npm install
# Copiar example.env -> .env y ajustar variables si se requiere
npm start
```

Frontend (Angular):

```powershell
cd .\divisaPro
npm install
ng serve --host 0.0.0.0 --port 4200
```

Asegúrate de que `environment.apiUrl` (en `divisaPro` o `environment.ts`) apunte al backend (ej. `http://localhost:3000`).

---

## Endpoints principales

### Carteras (`/carteras`)
- POST `/carteras` — Crear cartera
  - Body ejemplo:
    ```json
    {
      "saldo_total": 1000.00,
      "moneda_base": "USD"
    }
    ```
- GET `/carteras` — Listar carteras
- PUT `/carteras/:id` — Actualizar cartera
- DELETE `/carteras/:id` — Eliminar cartera

### Transacciones (`/transacciones`)
- POST `/transacciones` — Crear transacción
  - Body ejemplo:
    ```json
    {
      "id_cartera": 12,
      "tipo": "gasto",
      "monto": 150.00,
      "divisa": "USD",
      "tasa_cambio": 1.0,
      "descripcion": "Compra X"
    }
    ```
  - Al crear, el backend inserta la transacción y actualiza el saldo de la cartera asociada.
- GET `/transacciones` — Listar todas o filtrar por `?id_cartera=12`
- PUT `/transacciones/:id` — Actualizar transacción (si cambia monto/tipo, recalcular saldo)
- DELETE `/transacciones/:id` — Eliminar transacción (revertir efecto en cartera)
- GET `/transacciones/convertir-divisa?from=USD&to=EUR&amount=100` — Convertir divisa (proxy a `core/frankfurter.js` / servicio externo)

---

## Flujo crítico y buenas prácticas

- Crear transacción + actualizar saldo de cartera deben ejecutarse dentro de una transacción DB (BEGIN/COMMIT/ROLLBACK) para garantizar atomicidad.
- Para evitar condiciones de carrera al actualizar saldos, usar SELECT ... FOR UPDATE o un mecanismo de versión (optimistic locking).
- Manejo de errores:
  - Validación -> 400
  - No encontrado -> 404
  - Error interno / BD -> 500
  - Fallo en servicio externo -> 502/504
- Considerar cache con TTL para resultados de conversión de divisa.

---

## Base de datos

- Inicialización: `mysqlinit/schema.sql`.
- Recomiendo usar migraciones (Flyway / Knex / Sequelize CLI) si el esquema va a cambiar frecuentemente.

---

## Variables de entorno (backend)

- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS`
- `PORT` (por ejemplo 3000)

Frontend: ajustar `environment.apiUrl` en `divisaPro`.

---

## Pruebas manuales rápidas (smoke tests)

1. Levantar con Docker Compose.
2. Abrir `http://localhost:4200`.
3. Crear cartera y transacción desde la UI; verificar saldo actualizado.

Ejemplos curl/Postman:

```powershell
# Crear cartera
curl -X POST http://localhost:3000/carteras -H "Content-Type: application/json" -d '{ "saldo_total": 1000, "moneda_base": "USD" }'

# Crear transaccion
curl -X POST http://localhost:3000/transacciones -H "Content-Type: application/json" -d '{ "id_cartera": 1, "tipo": "gasto", "monto": 50, "divisa": "USD", "tasa_cambio": 1.0, "descripcion": "Test" }'

# Convertir divisa
curl "http://localhost:3000/transacciones/convertir-divisa?from=USD&to=EUR&amount=100"
```

---

## Desarrollo y pruebas futuras (sugerencias)

- Añadir tests unitarios para usecases y servicios (Jest / Mocha).
- Agregar pruebas de integración que levanten una BD temporal.
- Implementar migraciones y logging estructurado.

---

## Contribuir

1. Crea una rama `feature/...`.
2. Haz commits claros y PR hacia `main`.
3. Actualiza `mysqlinit/schema.sql` o agrega migraciones cuando cambies modelos.

---
