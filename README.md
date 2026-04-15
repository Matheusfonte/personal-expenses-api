# API de Despesas Pessoais

## Descrição do projeto

Este projeto consiste no desenvolvimento de uma API REST utilizando Node.js e Express, com o objetivo de gerenciar despesas pessoais.

A aplicação permite realizar operações básicas como:

- cadastrar despesas
- listar despesas
- buscar despesa por ID
- atualizar despesa
- remover despesa
- calcular o total de despesas
- calcular o total por categoria

A aplicação não utiliza banco de dados. Os dados são armazenados em memória, utilizando um array.

---

## Tecnologias utilizadas

- Node.js
- Express.js

---

## Estrutura do projeto

personal-expenses-api
│
├── src
│   ├── app.js
│   ├── data
│   │   └── expenses.json
│   └── models
│       └── expense.js
│
├── package.json
├── package-lock.json
└── README.md

---

## Modelo de dados

### Entidade: Expense

| Campo        | Tipo   | Descrição                     |
|-------------|--------|-------------------------------|
| id          | number | Identificador único           |
| title       | string | Nome da despesa               |
| amount      | number | Valor da despesa              |
| category    | string | Categoria da despesa          |
| date        | string | Data da despesa               |
| description | string | Descrição opcional            |
| createdAt   | string | Data de criação               |

---

## Rotas da API

| Método | Rota                        | Descrição                          |
|--------|-----------------------------|------------------------------------|
| GET    | /                           | Verifica se a API está funcionando |
| POST   | /expenses                   | Cria uma nova despesa              |
| GET    | /expenses                   | Lista todas as despesas            |
| GET    | /expenses/:id               | Busca uma despesa por ID           |
| PUT    | /expenses/:id               | Atualiza uma despesa               |
| DELETE | /expenses/:id               | Remove uma despesa                 |
| GET    | /expenses/summary/total     | Retorna o total das despesas       |
| GET    | /expenses/summary/category  | Retorna o total por categoria      |

---

## Exemplos de requisição

### Criar despesa

POST /expenses

{
  "title": "Internet",
  "amount": 99.90,
  "category": "Casa",
  "date": "2026-04-14",
  "description": "Conta mensal da internet"
}

---

### Atualizar despesa

PUT /expenses/:id

{
  "title": "Energia",
  "amount": 150,
  "category": "Casa",
  "date": "2026-04-14",
  "description": "Conta de luz"
}

---

### Total de despesas

GET /expenses/summary/total

{
  "total": 249.9
}

---

### Total por categoria

GET /expenses/summary/category

{
  "Casa": 249.9,
  "Transporte": 80
}

---

## Regras de negócio

- O campo title é obrigatório
- O campo amount deve ser maior que zero
- Os campos category e date são obrigatórios
- A data não pode ser no futuro
- O ID é gerado automaticamente
- Caso a despesa não seja encontrada, a API retorna erro 404

---

## Como executar o projeto

1. npm install
2. npm start
3. http://localhost:3000

---

## Autor

Matheus