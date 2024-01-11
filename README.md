# Crawler

Esse projeto tem como objetivo navegar na pagina https://www.bpsaude.com.br/Transparencia/, a cada 10 minutos, e 
realizar a persistência do cliente e seus pcas.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/)

## Configuração do Ambiente

1. **Clone o Repositório:**
    ```bash
    git clone https://seurepositorio.com/desafio-npl.git
    cd desafio-npl
    ```

2. **Adicionar variaveis de ambiente:**
   - Basta renomear o .env.sample para .env

3. **Inicar projeto com docker:**
   - Abra o terminal e navegue até o diretório raiz do projeto.
   - Execute o seguinte comando para iniciar o contêiner com BD PostgreSQL e o Projeto Nest:
     ```bash
     docker-compose up -d --build
     ```
   - Aguarde até que o contêiner esteja em execução.

4. **Monitorar log do projeto em execução:**
   - Execute o seguinte comando para listar os logs da aplicacao:
     ```bash
     docker logs desafio-npl-node-app 
     ```
5. **Desligando o Ambiente:**
   - Para parar os contêineres, execute o seguinte comando no terminal:
     ```bash
     docker-compose down
     ```
