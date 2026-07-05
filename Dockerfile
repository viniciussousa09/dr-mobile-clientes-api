# Imagem oficial do Node.js (20)
FROM node:20-alpine

# Define a pasta de trabalho dentro do contêiner
WORKDIR /app

# Copia apenas os arquivos de configura;ão de pacotes primeiro
COPY package*.json ./

# Istala todas as dependências
RUN npm install

# Copia o resto do código 
COPY . .

# Roda o TS para converter em JS puro
RUN npm run build

# Expõe a porta que a API vai rodar
EXPOSE 3000

# O comndo que deve executar quando fo ligado
CMD ["npm", "start"]