# Usar una imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Generar el cliente de Prisma
RUN npx prisma generate

# Compilar TypeScript a JavaScript
RUN npm run build

# Exponer el puerto en el que la aplicación escucha
EXPOSE 3000

# Comando para iniciar la aplicación
CMD [ "npm", "run", "start" ]
