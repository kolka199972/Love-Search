const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const initDatabase = require('./startUp/initDatabase')
const routes = require('./routes')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use('/api', routes)

const PORT = config.get('port') ?? 8080

async function start() {
  try {
    mongoose.connection.once('open', () => {
      initDatabase()
    })
    await mongoose.connect(config.get('mongoUri'))
    app.listen(PORT, () => {
      console.log(chalk.green(`Port has been started on port ${PORT}...`))
    })
  } catch (e) {
    console.log(chalk.red(e.message))
  }
}

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client')))

  const indexPath = path.join(__dirname, 'client', 'index.html')

  app.get('*', (req, res) => {
    res.sendFile(indexPath)
  })
}

start()
