import express from "express";

const app = express();
const PORTA = 3000;

app.use(express.json());

// prefira usar o array para guardar os dados em memória mesmo
let despesas = [];

// inicial
app.get("/", (req, res) => {
  res.json({ mensagem: "API de despesas funcionando" });
});

// Criar despesa
app.post("/expenses", (req, res) => {
  const { title, amount, category, date, description } = req.body;

  if (!title || amount <= 0) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  if (!category || !date) {
    return res.status(400).json({ error: "Category e date são obrigatórios" });
  }

  if (new Date(date) > new Date()) {
    return res.status(400).json({ error: "A data não pode ser no futuro" });
  }

  const novaDespesa = {
    id: Date.now(), // aqui usei o Date now pq ele sempre vai gerar um número unico
    title,
    amount: Number(amount), // amount é valor, entao usei o Number para garatir q ele seja um número mesmo
    category,
    date,
    description: description || "",
    createdAt: new Date().toISOString(), // aqui usei o new Date pq ele cria a data de criação em tempo real e o toISOString é para formatar a data de forma padrão
  };

  despesas.push(novaDespesa);

  res.status(201).json(novaDespesa);
});

// Listar todas
app.get("/expenses", (req, res) => {
  let resultado = despesas;

  // filter usei para filtrar as coisas, filtar por categoria ou data
  if (req.query.category) {
    resultado = resultado.filter(
      (item) => item.category === req.query.category
    );
  }

  if (req.query.date) {
    resultado = resultado.filter((item) => item.date === req.query.date);
  }

  res.json(resultado);
});

// Total de despesas
app.get("/expenses/summary/total", (req, res) => {
  let total = 0;

  for (let i = 0; i < despesas.length; i++) {
    total += despesas[i].amount;
  } // Aq ele só vai percorrer as linhas e somar o valor

  res.json({ total });
});

// Total por categoria
app.get("/expenses/summary/category", (req, res) => {
  const resumo = {};

  for (let i = 0; i < despesas.length; i++) {
    const item = despesas[i];

    if (!resumo[item.category]) {
      resumo[item.category] = 0;
    }

    resumo[item.category] += item.amount;
  } // aq ele vai fazer a mesma coisa de cima, só que separa por categoria

  res.json(resumo);
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
  const indice = despesas.findIndex((item) => item.id == req.params.id); // e o findIndex serve para achar o local do item no array

  if (indice === -1) {
    return res.status(404).json({ error: "Despesa não encontrada" });
  }

  // indice é onde fica o local do id
  const { title, amount, category, date, description } = req.body;

  if (!title || amount <= 0) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  if (!category || !date) {
    return res.status(400).json({ error: "Category e date são obrigatórios" });
  }

  if (new Date(date) > new Date()) {
    return res.status(400).json({ error: "A data não pode ser no futuro" });
  }

  despesas[indice] = {
    ...despesas[indice],
    title,
    amount: Number(amount),
    category,
    date,
    description: description || "",
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