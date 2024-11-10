# Usa una imagen base de Node.js
FROM node:latest

# Crea y establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de tu aplicación
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto de la API
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
