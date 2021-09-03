const express = require('express')
const app = express()

app.get('/', (request, response) => {
  response.json(`pong ${counter++}`)
})

let counter = 0
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})