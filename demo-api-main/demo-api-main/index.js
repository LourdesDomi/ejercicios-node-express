const express = require('express')
const productos = require('./data/productos.json')
const app = express()
const PORT = 3001

app.get('/productos', (req, res)=>{
   res.status(200).json(productos) 
})

app.get('/productos/categorias/find', (req, res)=>{
    const categorias = req.query.key
    const resultado = productos.filter(p=>p.categorias===categorias)
    res.status(200).json(resultado)
})

app.get('/productos/:idProducto', (req, res)=>{
    const  id = req.params.idProducto
    if(isNaN(id)) {
        res.status(400).json({
            message: "El id de producto debe ser numérico."
        })
        return 
    }

    const producto = productos.find(p=>p.id===Number(id))
    if(!producto) {
        res.status(404).json({
            message: `El producto con id ${id} no se encuentra registrado`
        })
        return
    }
    res.status(200).json(producto)
})

app.get('/categorias', (req, res)=>{
    const categorias = productos.map(p=>p.categorias)
    .reduce( (arr, ele)=>{
        if (!arr.includes(ele)) {
            arr.push(ele)
        }
        return arr
    }, [] )
    res.status(200).json(categorias)
})

app.listen(PORT, (err)=>{
    if(err) {
        console.error(err.message)
        process.exit(1)
    }
    console.log(`La apliacion esta escuchando en el puerto ${PORT}`)
})


