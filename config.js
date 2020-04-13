//en formato de obj js, contiene conficguraciones de conexion 
module.exports = {

port: process.env.PORT || 3333,
db: process.env.MONGODB || 'mongodb://localhost:27017/MedicitasDB'
}