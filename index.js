'use strict'
// maneja informacion de config y se conecta a la Base de datos para escuchar el servidor de express

const mongoose = require('mongoose')           // importa moongose (herramienta para mongoDB)
const app = require('./app')
const config = require('./config')


mongoose.connect(config.db,{useNewUrlParser: true, useUnifiedTopology: true},(err,res) => {
    if(err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    console.log('Conexion a la base de datos correcta........')

    app.listen(config.port, function() {
        console.log(`API REST corriendo en http://localhost:${config.port}`)  // devuelve mensaje si conecta el "servidor"
    })  
})
/*/ pruebas
app.get('/login/:name',(req,res)=> {
    res.send({ message:`Hola ${req.params.name}`})  // se usa (`) para el mensaje con variables incluidas(template string)
})/*/

