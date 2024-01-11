# Desafio-NPL

Bem-vindo ao Desafio-NPL, um projeto incrível que faz XYZ.

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

4. **Acesso à Aplicação:**
   - Após a conclusão das etapas anteriores, você pode acessar a aplicação em [http://localhost:3000](http://localhost:3000).

5. **Desligando o Ambiente:**
   - Para parar os contêineres, execute o seguinte comando no terminal:
     ```bash
     docker-compose down
     ```

6. **Personalização e Configurações Adicionais:**
   - Para personalizar ou ajustar configurações específicas, consulte os arquivos `Dockerfile`, `docker-compose.yml` e qualquer arquivo de configuração no diretório do seu projeto.

## Contribuição

Se você quiser contribuir para o projeto, siga as diretrizes de contribuição no arquivo CONTRIBUTING.md.

---