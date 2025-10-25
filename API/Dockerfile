# Usa una imagen base oficial de Node.js
FROM node:20-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json (si existe)
# para aprovechar el cache de Docker y acelerar las builds futuras
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de tu aplicación al directorio de trabajo
COPY . .

# Expón el puerto 3000 (siguiendo los requisitos)
EXPOSE 3000

# Define una variable de entorno para el puerto
ENV PORT=3000

# Comando para ejecutar la aplicación
CMD [ "node", "server.js" ]