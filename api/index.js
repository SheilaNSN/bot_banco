const express = require('express')
const app = express()
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
  console.log('oi')
  console.log(res)
  res.send('Hello bot!')
})

app.get('/pegar_nome/:nome', function (req, res) {
  console.log('Serviço pegar nome ativado')
  nome = req.params.nome
  res.send('Serviço pegar nome. Pegar nome É: ' + nome)
})

app.get('/pegar_dados', function (req, res) {
  console.log(req)
  nome = req.query.nome
  idade = req.query.idade
  res.send('Serviço de pegar dados do usuário. Seu dados - Nome: ' + nome + ', idade: ' + idade)
})

app.post('/deposito', function (req, res) {
  console.log(req.body)
  valor = req.body.valor

  if (valor > 0) {
    valor_ajustado = valor + 0.5

    console.log('Serviço de depósito. Valor:' + valor_ajustado)
    res.status(200).send('Serviço de depósito.  Valor:' + valor_ajustado)
  } else {
    console.log('Serviço de depósito.Erro: O valor é incompativel')
    res.status(400).send('Serviço de depósito. Erro: O valor é incompativel')
  }
})

app.post('/bot_banco', function (req, res) {
  console.log(req.body)
  action = req.body.queryResult.action
  console.log(action)

  if (action == "deposito") {
    valor = req.body.queryResult.parameters.valor
    console.log(valor)
  }
  if (valor > 0) {
    valor_ajustado = valor + 0.5

    response = {
      "fulfillmentText": "Conseguimos receber seu depósito. Como prêmio, te demos um incremento. Seu patrimônio é de: " + valor_ajustado,
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              "Conseguimos receber seu depósito. Como prêmio, te demos um incremento. Seu patrimônio é de: " + valor_ajustado
            ]
          }
        }
      ]
    }
    console.log('Webhook bot_banco ativado. Valor:' + valor_ajustado)
    res.status(200).send(response)
  } else {
    console.log('Webhook bot_banco ativado. Erro: O valor é incompativel')
    response = {
      "fulfillmentText": "Infelizmente não deu. Esse valor não conseguimos depositar. Tente um valor maior que zero",
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              "Infelizmente não deu. Esse valor não conseguimos depositar. Tente um valor maior que zero"
            ]
          }
        }
      ]
    }
    res.status(200).send(response)
  }
})
app.listen(3000)