// rutas de los doctores con router api 
'use strict'

const express = require('express')
const doctorCtrl = require('../controllers/doctor')
const api = express.Router()

api.get('/doctors',doctorCtrl.getDoctors)
api.get('/doctors/:doctorDBId',doctorCtrl.getDoctor)
api.post('/doctors',doctorCtrl.saveDoctor)
api.put('/doctors/:doctorDBId',doctorCtrl.updateDoctor)
api.delete('/doctors/:doctorDBId',doctorCtrl.deleteDoctor)

module.exports = api