const express = require("express")
const fs = require("fs")
const path = require("path")
const Despesa = require("./models/expense")

const app = express()
const PORTA = 3000

app.use(express.json())

const caminhoArquivo = path.join(__dirname, "data", "expenses.json")

// Função para ler as despesas do arquivo JSON
function lerDespesas() {
  try {
    const dados = fs.readFileSync(caminhoArquivo, "utf-8")
    return JSON.parse(dados)
  } catch (erro) {
    return []
  }
}

// Função para salvar as despesas no arquivo JSON
function salvarDespesas(despesas) {
  fs.writeFileSync(caminhoArquivo, JSON.stringify(despesas, null, 2), "utf-8")
}

// Função para gerar ID automático
function gerarId() {
  return "desp_" + Date.now()
}

// Função para validar os dados da despesa
function validarDespesa(dados, atualizacao = false) {
  const erros = []

  if (!atualizacao || dados.title !== undefined) {
    if (!dados.title || dados.title.trim() === "") {
      erros.push("O campo 'title' é obrigatório")
    }
  }

  if (!atualizacao || dados.amount !== undefined) {
    if (dados.amount === undefined || dados.amount === null || isNaN(dados.amount)) {
      erros.push("O campo 'amount' deve ser um número")
    } else if (Number(dados.amount) <= 0) {
      erros.push("O campo 'amount' deve ser maior que zero")
    }
  }

  if (!atualizacao || dados.date !== undefined) {
    if (!dados.date) {
      erros.push("O campo 'date' é obrigatório")
    } else {
      const dataInformada = new Date(dados.date)
      const hoje = new Date()

      hoje.setHours(0, 0, 0, 0)
      dataInformada.setHours(0, 0, 0, 0)

      if (isNaN(dataInformada.getTime())) {
        erros.push("O campo 'date' deve ser uma data válida")
      } else if (dataInformada > hoje) {
        erros.push("O campo 'date' não pode ser no futuro")
      }
    }
  }

  return erros
}

// Rota inicial
app.get("/", (req, res) => {
  res.json({
    mensagem: "API de despesas pessoais funcionando"
  })
})

// Criar despesa
app.post("/expenses", (req, res) => {
  const { title, amount, category, date, description } = req.body

  const erros = validarDespesa(req.body)

  if (erros.length > 0) {
    return res.status(400).json({ erros })
  }

  const despesas = lerDespesas()

  const novaDespesa = new Despesa(
    gerarId(),
    title,
    Number(amount),
    category || "",
    date,
    description || "",
    new Date().toISOString()
  )

  despesas.push(novaDespesa)
  salvarDespesas(despesas)

  res.status(201).json(novaDespesa)
})

// Listar despesas
app.get("/expenses", (req, res) => {
  let despesas = lerDespesas()

  const { category, date } = req.query

  if (category) {
    despesas = despesas.filter((despesa) => despesa.category.toLowerCase() === category.toLowerCase())
  }

  if (date) {
    despesas = despesas.filter((despesa) => despesa.date === date)
  }

  res.json(despesas)
})

// Total de despesas
app.get("/expenses/summary/total", (req, res) => {
  const despesas = lerDespesas()

  const total = despesas.reduce((soma, despesa) => soma + Number(despesa.amount), 0)

  res.json({
    total: Number(total.toFixed(2))
  })
})

// Total por categoria
app.get("/expenses/summary/category", (req, res) => {
  const despesas = lerDespesas()
  const totalPorCategoria = {}

  despesas.forEach((despesa) => {
    const categoria = despesa.category || "Sem categoria"

    if (!totalPorCategoria[categoria]) {
      totalPorCategoria[categoria] = 0
    }

    totalPorCategoria[categoria] += Number(despesa.amount)
  })

  for (let categoria in totalPorCategoria) {
    totalPorCategoria[categoria] = Number(totalPorCategoria[categoria].toFixed(2))
  }

  res.json(totalPorCategoria)
})

// Buscar despesa por ID
app.get("/expenses/:id", (req, res) => {
  const despesas = lerDespesas()
  const despesa = despesas.find((item) => item.id === req.params.id)

  if (!despesa) {
    return res.status(404).json({ error: "Despesa não encontrada" })
  }

  res.json(despesa)
})

// Atualizar despesa
app.put("/expenses/:id", (req, res) => {
  const despesas = lerDespesas()
  const indice = despesas.findIndex((item) => item.id === req.params.id)

  if (indice === -1) {
    return res.status(404).json({ error: "Despesa não encontrada" })
  }

  const erros = validarDespesa(req.body, true)

  if (erros.length > 0) {
    return res.status(400).json({ erros })
  }

  const despesaAtual = despesas[indice]

  despesas[indice] = {
    ...despesaAtual,
    title: req.body.title !== undefined ? req.body.title : despesaAtual.title,
    amount: req.body.amount !== undefined ? Number(req.body.amount) : despesaAtual.amount,
    category: req.body.category !== undefined ? req.body.category : despesaAtual.category,
    date: req.body.date !== undefined ? req.body.date : despesaAtual.date,
    description: req.body.description !== undefined ? req.body.description : despesaAtual.description
  }

  salvarDespesas(despesas)

  res.json(despesas[indice])
})

// Remover despesa
app.delete("/expenses/:id", (req, res) => {
  const despesas = lerDespesas()
  const indice = despesas.findIndex((item) => item.id === req.params.id)

  if (indice === -1) {
    return res.status(404).json({ error: "Despesa não encontrada" })
  }

  const despesaRemovida = despesas[indice]
  despesas.splice(indice, 1)
  salvarDespesas(despesas)

  res.json({
    mensagem: "Despesa removida com sucesso",
    despesa: despesaRemovida
  })
})

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`)
})
