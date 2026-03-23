<div align="center">

# 📝 Blog Pessoal

API RESTful de um blog pessoal desenvolvida com NestJS, TypeORM e PostgreSQL.
Permite gerenciar usuários, postagens e temas com autenticação segura via JWT.

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TypeORM](https://img.shields.io/badge/TypeORM-FE0902?style=for-the-badge&logo=typeorm&logoColor=white)](https://typeorm.io/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://render.com/)

[🔗 Deploy](#-deploy) • [📖 Documentação](#-documentação-swagger) • [🚀 Como rodar](#-como-rodar-localmente)

</div>

---

## 📋 Sobre o projeto

API de blog pessoal com operações CRUD completas para **usuários**, **postagens** e **temas**. A aplicação conta com autenticação via JWT, criptografia de senhas com Bcrypt, documentação interativa com Swagger e banco de dados PostgreSQL hospedado no Neon.

---

## ✨ Funcionalidades

- **Usuários** — cadastro, login, atualização e listagem
- **Postagens** — criação, edição, remoção e busca por título
- **Temas** — categorização de postagens, busca por descrição
- **Autenticação** — login com JWT, rotas protegidas por guards
- **Segurança** — senhas criptografadas com Bcrypt
- **Relacionamentos** — postagens vinculadas a temas e usuários
- **Documentação** — Swagger UI disponível em `/swagger`
- **Deploy** — hospedado no Render com banco de dados no Neon

---

## 🗂️ Estrutura do projeto

```
src/
├── auth/                        # Autenticação e segurança
│   ├── bcrypt/                  # Criptografia de senhas
│   ├── constants/               # Chave secreta do JWT
│   ├── controllers/             # Endpoint de login
│   ├── entities/                # Entidade de login
│   ├── guard/                   # Guards JWT e Local
│   ├── services/                # Lógica de autenticação
│   ├── strategy/                # Estratégias Passport (JWT e Local)
│   └── auth.module.ts
│
├── data/services/               # Configuração do banco de dados
│   ├── dev.service.ts           # Configuração para desenvolvimento
│   └── prod.service.ts          # Configuração para produção
│
├── postagem/                    # Módulo de postagens
│   ├── controllers/
│   ├── entities/
│   ├── services/
│   └── postagem.module.ts
│
├── tema/                        # Módulo de temas
│   ├── controllers/
│   ├── entities/
│   ├── services/
│   └── tema.module.ts
│
├── usuario/                     # Módulo de usuários
│   ├── controllers/
│   ├── entities/
│   ├── services/
│   └── usuario.module.ts
│
├── app.module.ts
└── main.ts
```

---

## 🔗 Relacionamentos entre entidades

```
Usuario  1 ──────────── N  Postagem
Tema     1 ──────────── N  Postagem
```

Um **usuário** pode ter várias **postagens**.
Um **tema** pode estar associado a várias **postagens**.

---

## 🛠️ Tecnologias utilizadas

| Tecnologia     | Versão   | Finalidade                          |
|----------------|----------|-------------------------------------|
| NestJS         | ^10.x    | Framework principal                 |
| TypeScript     | ^5.x     | Linguagem de programação            |
| TypeORM        | ^0.3.x   | ORM para banco de dados             |
| PostgreSQL      | —        | Banco de dados relacional           |
| Passport.js    | ^0.6.x   | Autenticação                        |
| JWT            | ^10.x    | Tokens de acesso                    |
| Bcrypt         | ^5.x     | Criptografia de senhas              |
| Swagger        | ^7.x     | Documentação da API                 |
| Neon           | —        | Banco de dados serverless (produção)|
| Render         | —        | Plataforma de deploy                |

---

## 🚀 Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- PostgreSQL instalado localmente (ou conexão com Neon)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/blogpessoal.git

# Acesse a pasta do projeto
cd blogpessoal

# Instale as dependências
npm install
```

### Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de dados (desenvolvimento)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=blogpessoal

# JWT
JWT_SECRET=sua_chave_secreta
```

### Executando

```bash
# Modo desenvolvimento
npm run start:dev

# Modo produção
npm run start:prod

# Build
npm run build
```

A API estará disponível em: `http://localhost:4000`

---

## 📡 Endpoints

### 🔐 Auth
| Método | Rota         | Descrição           | Auth |
|--------|--------------|---------------------|------|
| POST   | `/auth/login` | Login do usuário   | ❌   |

### 👤 Usuário
| Método | Rota              | Descrição                   | Auth |
|--------|-------------------|-----------------------------|------|
| GET    | `/usuarios`       | Lista todos os usuários     | ✅   |
| GET    | `/usuarios/:id`   | Busca usuário por ID        | ✅   |
| POST   | `/usuarios/cadastrar` | Cadastra novo usuário   | ❌   |
| PUT    | `/usuarios/atualizar` | Atualiza usuário        | ✅   |

### 📝 Postagem
| Método | Rota                  | Descrição                    | Auth |
|--------|-----------------------|------------------------------|------|
| GET    | `/postagens`          | Lista todas as postagens     | ✅   |
| GET    | `/postagens/:id`      | Busca postagem por ID        | ✅   |
| GET    | `/postagens/titulo/:titulo` | Busca por título       | ✅   |
| POST   | `/postagens`          | Cria nova postagem           | ✅   |
| PUT    | `/postagens`          | Atualiza postagem            | ✅   |
| DELETE | `/postagens/:id`      | Remove postagem              | ✅   |

### 🏷️ Tema
| Método | Rota                        | Descrição                  | Auth |
|--------|-----------------------------|----------------------------|------|
| GET    | `/temas`                    | Lista todos os temas       | ✅   |
| GET    | `/temas/:id`                | Busca tema por ID          | ✅   |
| GET    | `/temas/descricao/:descricao` | Busca por descrição      | ✅   |
| POST   | `/temas`                    | Cria novo tema             | ✅   |
| PUT    | `/temas`                    | Atualiza tema              | ✅   |
| DELETE | `/temas/:id`                | Remove tema                | ✅   |

> ✅ = Requer token JWT no header `Authorization: Bearer <token>`

---

## 🔒 Autenticação

A API utiliza **JWT (JSON Web Token)** para proteger as rotas. Após realizar o login, utilize o token retornado no header de todas as requisições autenticadas:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

As senhas são armazenadas com hash **Bcrypt**, garantindo que nunca sejam salvas em texto puro no banco de dados.

---

## 📖 Documentação Swagger

A documentação interativa da API está disponível em:

- **Local:** `http://localhost:4000/swagger`
- **Produção:** `https://blogpessoal-generation-66yb.onrender.com/swagger`

---

## ☁️ Deploy

A aplicação está hospedada no **[Render](https://render.com/)** com banco de dados **PostgreSQL serverless** pelo **[Neon](https://neon.tech/)**.

**URL da API em produção:**
```
https://blogpessoal-generation-66yb.onrender.com
```

> ⚠️ Por ser um serviço gratuito, o servidor pode demorar alguns segundos para responder na primeira requisição (cold start).

---

