// Esquema de Doctor
'use strict'

const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const DoctorSchema = Schema({
    name: String,
    last_name: String,
    Id: Number,
    email: {type: String, unique:true, lowercase: true} ,
    username: String,
    password: String,
})

/*DoctorSchema.pre('save',(next)=> {
    let doctor = this
    if(!user.isModified('password')) return next()


})*/

module.exports = mongoose.model('Doctor', DoctorSchema) 