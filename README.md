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
git clone https://github.com/Olival42/Autentication-User.git
cd Autentication-User
```
2. Instale as dependências:

```bash
npm install
```

3. Configure o arquivo .env com as variáveis necessárias:

```ini
PORT=3000
DB_DIALECT=postgres
DATABASE_URL=postgres://postgres:postgres@localhost:5432/auth-user
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1h
REDIS_URL=redis://localhost:6379
```

4. Execute a aplicação:

```bash
npm start
```

5. Acesse a documentação Swagger:

```bash
http://localhost:3000/api-docs
```

---

## Fluxo de Autenticação

1. Registro de Usuário

POST /auth/register

Body:

```json
{
  "name": "Aluno Exemplo",
  "email": "aluno@exemplo.com",
  "password": "senha123"
}
```

Exemplo de Print:

![Registro](docs/prints/register-user.png)

2. Login de Usuário

POST /auth/login

```json
{
  "email": "aluno@exemplo.com",
  "password": "senha123"
}
```

Exemplo de Print:

![Login](docs/prints/login-user.png)

Retorna JWT válido:

```json
{
  "token": "JWT_TOKEN_AQUI",
  "user": {
    "id": "uuid-do-usuario",
    "name": "Aluno Exemplo",
    "email": "aluno@exemplo.com"
  }
}
```

3. Logout Seguro

POST /auth/logout

Header:

```makefile
Authorization: Bearer JWT_TOKEN_AQUI
```

Exemplo de Print (Logout com sucesso):

![Logout com sucesso](docs/prints/logout-user-sucess.png)

Exemplo de Print (Token revogado):

![Token revogado](docs/prints/logout-user-token-revoked.png)