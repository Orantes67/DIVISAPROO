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
# El resultado por defecto va a /app/dist/divisa-pro/
RUN npm run build

# --- Etapa 2: Servidor (Serve) ---
# Usamos una imagen ligera de Node para el servidor final
FROM node:20-slim
# Establecemos el directorio de trabajo
WORKDIR /usr/share/app-dist

# Instalamos 'serve' globalmente para servir archivos estáticos
RUN npm install -g serve

# Copiamos SOLO los archivos estáticos construidos desde la etapa 'builder'.
# La ruta ajustada es /app/dist/divisa-pro (basado en el nombre de tu proyecto)
COPY --from=builder /app/dist/divisa-pro ./

# Expone el puerto 4200
EXPOSE 4200

# Comando para iniciar el servidor
# -s : Indica modo SPA (Single Page App)
# .  : Sirve el directorio actual (/usr/share/app-dist)
# -l 4200 : Escucha en el puerto 4200
CMD ["serve", "-s", ".", "-l", "4200"]
