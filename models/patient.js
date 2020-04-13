// Esquema de Paciente
'use strict'

const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const PatientSchema = Schema({
    name: String,
    last_name: String,
    Id: Number,
    phone_number: Number,
    birthdate: Date,
    age: Number,
    email: {type: String, unique:true, lowercase: true} ,
    insurance: String,
    username: String,
    password: String
})

module.exports = mongoose.model('Patient', PatientSchema) 