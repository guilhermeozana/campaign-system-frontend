# Use a imagem Node.js como base
FROM node:20 AS builder

# Defina o diretório de trabalho como /app
WORKDIR /app

# Copie o package.json e package-lock.json para o diretório de trabalho
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie o código-fonte do Angular para o diretório de trabalho
COPY . .

# Construa o aplicativo Angular
RUN npm run ng build --prod

# Use uma imagem base mais leve
FROM node:20-slim

# Defina o diretório de trabalho como /app
WORKDIR /app

# Copie os arquivos do build do Angular da etapa anterior
COPY --from=builder /app/dist/agide-base .

# Instale o servidor HTTP
RUN npm install -g http-server

# Exponha a porta 8080
EXPOSE 8080

# Inicie o servidor HTTP para servir o aplicativo Angular
CMD ["http-server", "-p", "8080"]

