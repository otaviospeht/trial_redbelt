# Ambiente DOCKER com PHP8, Laravel8, ReactJS17 e MySQL5.7

Requisitos:
- Docker e Docker Compose instalados

O ambiente tem quatro serviços que rodam simultaneamente:

- Serviço `db` que roda o MySQL
- Serviço `api` que roda o PHP
- Serviço `nginx` que usa o container `api` pra interpretar o PHP
- Serviço `app` que roda o front end em ReactJS

## Rodando o projeto

- Verifique se as informações do `.env` estão corretas.

- Use o seguinte comando para buildar e iniciar os containers

```bash
docker-compose up --build
```

- Aguarde até que as dependências sejam instaladas e as tabelas criadas/populadas. Você deve ver a seguinte mensagem no console:

```bash
NOTICE: ready to handle connections
```

- A aplicação estará disponível em http://localhost:3000
