# Projeto de Autenticação de Usuários com JWT e Redis

Este projeto implementa um sistema de autenticação completo, permitindo que usuários se registrem, façam login, acessem rotas protegidas e realizem logout seguro. Ele utiliza **Node.js**, **Express**, **Sequelize (PostgreSQL)**, **JWT** e **Redis**.

---

## Funcionalidades

- Registro de usuários (`POST /auth/register`)
- Login de usuários (`POST /auth/login`) com geração de JWT
- Rotas protegidas utilizando middleware de autenticação
- Logout seguro com tokens armazenados na blacklist do Redis
- Documentação Swagger (`/api-docs`) disponível

---

## Tecnologias Utilizadas

- Node.js / Express
- PostgreSQL com Sequelize
- Redis via Docker
- JWT para autenticação
- Swagger para documentação
- Postman ou Insomnia para testes da API

---

## Como Rodar o Projeto

1. Clone o repositório:

```bash
git clone <link-do-repo-github>
cd <nome-do-repo>
Instale as dependências:

bash
Copiar código
npm install
Configure o arquivo .env com as variáveis necessárias:

PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/dbname
JWT_SECRET=seu_secret
JWT_EXPIRES_IN=1h
REDIS_HOST=localhost
REDIS_PORT=6379

Execute a aplicação:

npm start

Acesse a documentação Swagger:

http://localhost:3000/api-docs

Fluxo de Autenticação
1. Registro de Usuário
POST /auth/register

Body:

{
  "name": "Aluno Exemplo",
  "email": "aluno@exemplo.com",
  "password": "senha123"
}

Exemplo de Print:

2. Login de Usuário
POST /auth/login

Body:

{
  "email": "aluno@exemplo.com",
  "password": "senha123"
}

Exemplo de Print:

Retorna JWT válido:

{
  "token": "JWT_TOKEN_AQUI",
  "user": {
    "id": "uuid-do-usuario",
    "name": "Aluno Exemplo",
    "email": "aluno@exemplo.com"
  }


3. Logout Seguro
POST /auth/logout

Header:

Authorization: Bearer JWT_TOKEN_AQUI
Exemplo de Print (Logout com sucesso):


Exemplo de Print (Token revogado):
