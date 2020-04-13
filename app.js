// contiene la configuracion de express, el body parser y usa el router /api de routes
'use strict'


const express = require('express')              //importa express
const bodyParser = require('body-parser')       //importa body-parser
const app = express()                   // variable app llama a express
const api = require('./routes')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())          // para poder admitir peticiones en formato json y poder "parsear" el cuerpo del mensaje para tratarlo como json
app.use('/api', api)

module.exports = app