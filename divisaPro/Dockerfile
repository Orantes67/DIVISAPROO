# --------------------------------------------------------------------------
# Archivo: /frontend/Dockerfile
#
# Dockerfile multi-etapa para construir y servir la aplicación Angular.
# --------------------------------------------------------------------------

# --- Etapa 1: Construcción (Build) ---
# Usamos una imagen de Node para construir la app
FROM node:20-slim AS builder
# Establecemos el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instalamos las dependencias
# Se usa --legacy-peer-deps para evitar posibles conflictos
RUN npm install --legacy-peer-deps

# Copia el resto del código fuente de Angular
COPY . .

# Construimos la aplicación para producción.
# El resultado por defecto va a /app/dist/divisaPro/
# Nota: La estructura moderna de Angular a menudo pone los archivos estáticos
# dentro de un subdirectorio 'browser' dentro de 'dist/<project-name>'.
RUN npm run build

# --- Etapa 2: Servidor (Serve) ---
# Usamos una imagen ligera de Node para el servidor final
FROM node:20-slim
# Establecemos el directorio de trabajo
WORKDIR /app

# Instalamos 'serve' globalmente para servir archivos estáticos
RUN npm install -g serve

# Copiamos SOLO los archivos estáticos construidos desde la etapa 'builder'.
# La ruta ajustada es /app/dist/divisaPro (basado en el nombre de tu proyecto)
COPY --from=builder /app/dist/divisa-pro ./

# Expone el puerto 4200
EXPOSE 4200

# Comando para iniciar el servidor
# EL CAMBIO CLAVE ES AQUÍ: Se especifica el directorio 'browser' para servir
# (-s indica modo SPA)
CMD ["serve", "-s", "browser", "-l", "4200"]
