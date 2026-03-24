class Despesa {
  constructor(id, title, amount, category, date, description, createdAt) {
    this.id = id
    this.title = title
    this.amount = amount
    this.category = category
    this.date = date
    this.description = description
    this.createdAt = createdAt
  }
}

module.exports = Despesa
