const express = require('express')
const personajes = require('../data/personajes.json')
const validacion = require('./validaciones.js')
const {makeFiltro, op} = require('./filtros/filtros.js')
const PORT = 3002

const app = express()
app.use(express.json())  //Recibir en los body forma json

app.get('/personajes', ( _ , res)=>{
    res.status(200).json(personajes)
})

app.post('/personajes/filtros', (req, res)=> {
    try {
        const fns = req.body.map( e=> makeFiltro(e.attribute, e.operator, e.value))
        const data = personajes.filter( 
            p=> fns.every( f=> f(p))
        )
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json({mensaje: err.message})
    }
})


app.post('/personajes', ( req, res)=>{
    const data = req.body
    if (! validacion(data)) {
        return res.status(400).json("Los datos enviados no son correctos.")
    } 

    const ids = personajes.map( p => p.id )
    const id = Math.max(0,...ids) + 1
    const personaje = {id, ...data, activo: true}
    personajes.push(personaje)
    res.status(201).json(personaje)
})

                 //funcion de callback 
app.listen(PORT, (err)=>{
    if(err){
        console.error("Hubo un error: " + err.message)
        process.exit(1)
    }
    console.log(`🚀 Aplicacion iniciada con exito en el puerto ${PORT}.`)
})
