# API de Despesas Pessoais

## Descrição do projeto

Este projeto é uma API REST desenvolvida em Node.js para gerenciamento de despesas pessoais.

A aplicação permite:

- cadastrar despesas
- listar despesas
- buscar despesa por ID
- atualizar despesa
- remover despesa
- calcular o total de despesas
- calcular o total por categoria

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
│   ├── models
│   │   └── expense.js
│   │
│   ├── data
│   │   └── expenses.json
│   │
│   └── app.js
│
├── package.json
└── README.md
```

---

## Modelo de dados

### Entidade: Expense

| Campo        | Tipo   | Descrição             |
|-------------|--------|-----------------------|
| id          | string | Identificador único   |
| title       | string | Nome da despesa       |
| amount      | number | Valor da despesa      |
| category    | string | Categoria da despesa  |
| date        | date   | Data da despesa       |
| description | string | Descrição opcional    |
| createdAt   | date   | Data de criação       |

---

## MER (Modelo Entidade Relacionamento)

```text
+------------------+
|     EXPENSE      |
+------------------+
| id (PK)          |
| title            |
| amount           |
| category         |
| date             |
| description      |
| createdAt        |
+------------------+
```

---

## Regras de negócio

- O campo `title` é obrigatório
- O campo `amount` deve ser maior que zero
- O campo `date` não pode ser no futuro
- O `id` é gerado automaticamente
- Caso a despesa não exista, a API retorna `404`

---

## Como executar o projeto

### 1. Instalar as dependências

```bash
npm install
```

### 2. Iniciar o servidor

```bash
npm start
```

Servidor rodando em:

```bash
http://localhost:3000
```

---

## Rotas da API

| Método | Rota                       | Descrição                     |
|--------|----------------------------|-------------------------------|
| GET    | /                          | Mensagem inicial da API       |
| POST   | /expenses                  | Cria uma nova despesa         |
| GET    | /expenses                  | Lista todas as despesas       |
| GET    | /expenses/:id              | Busca uma despesa por ID      |
| PUT    | /expenses/:id              | Atualiza uma despesa          |
| DELETE | /expenses/:id              | Remove uma despesa            |
| GET    | /expenses/summary/total    | Retorna o total de despesas   |
| GET    | /expenses/summary/category | Retorna o total por categoria |

---

## Exemplos de requisições

### Criar despesa

**POST** `/expenses`

```json
{
  "title": "Supermercado",
  "amount": 150.50,
  "category": "Alimentação",
  "date": "2026-03-10",
  "description": "Compra semanal"
}
```

### Listar despesas

**GET** `/expenses`

### Filtrar por categoria

**GET** `/expenses?category=Alimentação`

### Filtrar por data

**GET** `/expenses?date=2026-03-10`

### Buscar por ID

**GET** `/expenses/desp_123`

### Atualizar despesa

**PUT** `/expenses/desp_123`

```json
{
  "title": "Supermercado",
  "amount": 200
}
```

### Remover despesa

**DELETE** `/expenses/desp_123`

### Total de despesas

**GET** `/expenses/summary/total`

Resposta:

```json
{
  "total": 2450.9
}
```

### Total por categoria

**GET** `/expenses/summary/category`

Resposta:

```json
{
  "Alimentação": 800,
  "Transporte": 200,
  "Lazer": 350
}
```

---

## Exemplo de resposta de sucesso

```json
{
  "id": "desp_123",
  "title": "Supermercado",
  "amount": 150.50,
  "category": "Alimentação",
  "date": "2026-03-10",
  "description": "Compra semanal",
  "createdAt": "2026-03-11T12:00:00.000Z"
}
```

---

## Exemplo de resposta de erro

```json
{
  "error": "Despesa não encontrada"
}
```

---

## Testes no Postman ou curl

A API pode ser testada com:

- Postman
- Insomnia
- curl

Exemplo com curl:

```bash
curl -X POST http://localhost:3000/expenses \
-H "Content-Type: application/json" \
-d '{
  "title": "Supermercado",
  "amount": 150.50,
  "category": "Alimentação",
  "date": "2026-03-10",
  "description": "Compra semanal"
}'
```
