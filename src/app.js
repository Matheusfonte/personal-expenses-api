import express from "express";

const app = express();
const PORTA = 3000;

app.use(express.json());

// prefira usar o array para gaurdar os dados em memória mesmo
let despesas = [];

// inicial
app.get("/", (req, res) => {
  res.json({ mensagem: "API de despesas funcionando" });
});

// Criar despesa
app.post("/expenses", (req, res) => {
  const { title, amount } = req.body;

  if (!title || amount <= 0) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  const novaDespesa = {
    id: Date.now(), // aqui usei o Date now pq ele sempre vai gerar um número unico
    title,
    amount: Number(amount), //amount é quantia, então ele converte para número
    createdAt: new Date().toISOString(), // aqui também usei o new date pq ele cria em tempo real e o toISOString é para formatar a data de forma padrão
  };

  despesas.push(novaDespesa);

  res.status(201).json(novaDespesa);
});

// Listar todas
app.get("/expenses", (req, res) => {
  res.json(despesas);
});

// Buscar por ID
app.get("/expenses/:id", (req, res) => {
  const despesa = despesas.find((item) => item.id == req.params.id); // esse find serve para buscar o item

  if (!despesa) {
    return res.status(404).json({ error: "Despesa não encontrada" });
  }

  res.json(despesa);
});

// Atualizar
app.put("/expenses/:id", (req, res) => {
  const indice = despesas.findIndex((item) => item.id == req.params.id); // e o findIndex serve para achar o local do item no banco, sendo o array

  if (indice === -1) {
    return res.status(404).json({ error: "Despesa não encontrada" });
  }
// indice é aonde fica o local exato do id
  const { title, amount } = req.body;

  if (!title || amount <= 0) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  despesas[indice] = {
    ...despesas[indice],
    title,
    amount: Number(amount),
  };

  res.json(despesas[indice]);
});

// Remover
app.delete("/expenses/:id", (req, res) => {
  const indice = despesas.findIndex((item) => item.id == req.params.id);

  if (indice === -1) {
    return res.status(404).json({ error: "Despesa não encontrada" });
  }

  despesas.splice(indice, 1);

  res.json({ mensagem: "Despesa removida com sucesso" });
});

// Iniciar servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});