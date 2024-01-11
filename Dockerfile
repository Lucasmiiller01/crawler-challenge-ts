FROM node:20.10.0

# Instalação de dependências para o Puppeteer
RUN apt-get update && \
    apt-get -y install xvfb gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 \
      libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 \
      libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 \
      libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 \
      libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget && \
    rm -rf /var/lib/apt/lists/*

# Define o diretório de trabalho
WORKDIR /app

# Adiciona usuário root
USER root

# Cria diretório dist com permissões totais
RUN mkdir dist

# Copia os arquivos do projeto Nest.js para o contêiner, ignorando node_modules e dist
COPY package*.json ./
COPY .dockerignore ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .
# Instala o Chromium manualmente
RUN apt-get update && \
    apt-get install -y chromium && \
    ln -sf /usr/bin/chromium /usr/bin/chromium-browser

# Configuração necessária para o Puppeteer funcionar no ambiente headless
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Inicia o projeto Nest.js
CMD ["npm", "start"]
