const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORTA = 3000;

app.use(express.json());

const caminhoArquivo = path.join(__dirname, "data", "expenses.json");

// Função para ler despesas do arquivo JSON
function lerDespesas() {
  try {
    const dados = fs.readFileSync(caminhoArquivo, "utf-8");
    return JSON.parse(dados);
  } catch (erro) {
    return []; // Se houver erro, retorna um array vazio
  }
}

// Função para salvar despesas no arquivo JSON
function salvarDespesas(despesas) {
  fs.writeFileSync(caminhoArquivo, JSON.stringify(despesas, null, 2), "utf-8");
}

// Rota inicial
app.get("/", (req, res) => {
  res.json({ mensagem: "API de despesas pessoais funcionando" });
});

// Criar despesa
app.post("/expenses", (req, res) => {
  const { title, amount } = req.body;

  if (!title || amount <= 0) {
    return res.status(400).json({ error: "Dados inválidos." });
  }

  const despesas = lerDespesas();
  const novaDespesa = {
    id: Date.now(),
    title,
    amount: Number(amount),
    createdAt: new Date().toISOString(),
  };

  despesas.push(novaDespesa);
  salvarDespesas(despesas);
  res.status(201).json(novaDespesa);
});

// Listar despesas
app.get("/expenses", (req, res) => {
  const despesas = lerDespesas();
  res.json(despesas);
});

// Buscar despesa por ID
app.get("/expenses/:id", (req, res) => {
  const despesas = lerDespesas();
  const despesa = despesas.find((item) => item.id == req.params.id);

  if (!despesa) {
    return res.status(404).json({ error: "Despesa não encontrada" });
  }

  res.json(despesa);
});

// Atualizar despesa
app.put("/expenses/:id", (req, res) => {
  const despesas = lerDespesas();
  const indice = despesas.findIndex((item) => item.id == req.params.id);

  if (indice === -1) {
    return res.status(404).json({ error: "Despesa não encontrada" });
  }

  const { title, amount } = req.body;

  if (!title || amount <= 0) {
    return res.status(400).json({ error: "Dados inválidos." });
  }

  despesas[indice] = { id: req.params.id, title, amount: Number(amount) };
  salvarDespesas(despesas);
  res.json(despesas[indice]);
});

// Remover despesa
app.delete("/expenses/:id", (req, res) => {
  const despesas = lerDespesas();
  const indice = despesas.findIndex((item) => item.id == req.params.id);

  if (indice === -1) {
    return res.status(404).json({ error: "Despesa não encontrada" });
  }

  despesas.splice(indice, 1);
  salvarDespesas(despesas);
  res.json({ mensagem: "Despesa removida com sucesso" });
});

// Iniciar o servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
