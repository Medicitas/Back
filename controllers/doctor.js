// controles que se comunican con la base de datos
'use strict'

const Doctor = require('../models/doctor') 

function getDoctor(req, res){
    let doctorDBId = req.params.doctorDBId

    Doctor.findById(doctorDBId,(err, doctor) => {
        if (err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`}) // error de la base de datos
        if (!doctor) return res.status(404).send({message:`El doctor no existe`})               // el doctor no existe

        res.status(200).send({ doctor })
    }) 
}

function getDoctors(req, res){
    Doctor.find({},(err, doctors)=> {

        if (err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`}) // error de la base de datos
        if (!doctors) return res.status(404).send({message:`El doctor no existe`})               // no hay ningun doctor
        
        res.status(200).send({doctors})  
        })
}

function saveDoctor(req, res){
    console.log('POST/admin/doctors')
    console.log(req.body)

    let doctor = new Doctor()
    doctor.name = req.body.name
    doctor.last_name = req.body.last_name
    doctor.Id = req.body.Id
    doctor.email = req.body.email
    doctor.username = req.body.username
    doctor.password = req.body.password

    doctor.save((err, doctorStored)=>{      // guarda el nuevo doctor en la base de datos
        if(err) res.status(500).send({message:`error al guardar en la base de datos: ${err}`})

        res.status(200).send({doctor: doctorStored})
    })
}

function updateDoctor(req, res){
    let doctorDBId = req.params.doctorDBId
    let update = req.body

    Doctor.findByIdAndUpdate(doctorDBId, update, (err, doctorUpdated) => {
        if (err) return res.status(500).send({message:`Error al actualizar el doctor: ${err}`})
        if (!doctorUpdated) return res.status(404).send({message:`El doctor no existe`})
        res.status(200).send({ doctor: doctorUpdated })
    })
}

function deleteDoctor(req, res){
    let doctorDBId = req.params.doctorDBId

    Doctor.findById(doctorDBId, (err, doctor)=> {
        if (err) return res.status(500).send({message:`Error al encontrar el doctor: ${err}`}) // error de la base de datos
        if (!doctor) return res.status(404).send({message:`El doctor no existe`})               // el doctor no existe

        doctor.remove(err => {
            if (err) return res.status(500).send({message:`Error al borrar el doctor: ${err}`})
            res.status(200).send({message:'El Doctor ha sido eliminado'})
        })
    })
}

module.exports = {
    getDoctor,
    getDoctors,
    saveDoctor,
    updateDoctor,
    deleteDoctor
}