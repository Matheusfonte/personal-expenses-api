# API de Despesas Pessoais

## Descrição do projeto

Este projeto é uma API REST desenvolvida em Node.js para gerenciamento de despesas pessoais.

A aplicação permite:

- cadastrar despesas
- listar despesas
- buscar despesa por ID
- atualizar despesa
- remover despesa

A API não utiliza banco de dados. Os dados são armazenados em arquivo JSON, conforme solicitado na atividade.

---

## Tecnologias usadas

- Node.js
- Express.js
- JSON para persistência de dados

---

## Estrutura do projeto

```bash
personal-expenses-api
│
├── src
│   ├── data
│   │   └── expenses.json
│   │
│   └── app.js
│
├── package.json
├── package-lock.json
└── README.md
```

---

## Modelo de dados

### Entidade: Expense

| Campo     | Tipo   | Descrição           |
|-----------|--------|---------------------|
| id        | number | Identificador único |
| title     | string | Nome da despesa     |
| amount    | number | Valor da despesa    |
| createdAt | string | Data de criação     |

---

## Rotas da API

### Rota inicial

**GET /**

Retorna uma mensagem informando que a API está funcionando.

### Criar despesa

**POST /expenses**

Exemplo de corpo da requisição:

```json
{
  "title": "Internet",
  "amount": 99.90
}
```

### Listar despesas

**GET /expenses**

Retorna todas as despesas cadastradas.

### Buscar despesa por ID

**GET /expenses/:id**

Retorna uma despesa específica pelo ID.

### Atualizar despesa

**PUT /expenses/:id**

Exemplo de corpo da requisição:

```json
{
  "title": "Energia",
  "amount": 150
}
```

### Remover despesa

**DELETE /expenses/:id**

Remove uma despesa pelo ID.

---

## Como executar o projeto

1. Instale as dependências:

```bash
npm install
```

2. Inicie a aplicação:

```bash
npm start
```

3. A API estará disponível em:

```bash
http://localhost:3000
```

---

## Observação

O arquivo `expenses.json` é usado para armazenar as despesas da aplicação.
