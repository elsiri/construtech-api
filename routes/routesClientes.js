const express = require('express')
const clienteService = require('../services/clienteService')
const router = express.Router()
const service = new clienteService


//find all clientes
router.get('/', async (req, res) =>{
    const clientes = await service.find()
    if (clientes) {
        res.status(200).send(clientes)
    } else {
        res.status(404).send("No se encontraron los clientes")
    }
})

router.get('/:id', async (req, res) =>{
    const id = req.params.id
    const cliente = await service.findOne(id)
    if (cliente) {
        res.status(200).send(cliente)
    } else {
        res.status(404).send(`No se encontro cliente con el id:${id}`)
    }
})

//insertOne cliente
router.post("/addCliente", async (req, res) =>{
    const result = await service.add(req.body)
    if (result) {
        res.status(200).json({
            message:"Se agrego un cliente en la base datos",result
        })
    } else {
        res.status(404).send("Error al insertar cliente")
    }
})

//inserMany
router.post("/addClientes", async (req, res) =>{
    const result = await service.addMany(req.body)
    if (result) {
        res.status(200).json({
            message:`Se agregaron clientes en la base datos`
        })
    } else {
        res.status(404).send("Error al intentar insertar clientes")
    }
})

//updateOne
router.patch('/:id', async (req, res) =>{
    const id = req.params.id
    const {nombres,apellidos} = req.body
    const result = await service.update(id,nombres,apellidos)
    if (result.modifiedCount > 0) {
        res.status(200).json({
            message:`Se actualizo el cliente con el id:${id} en la base de datos`
        })
    } else {
        res.status(404).send("Erorr al intentar actualizar cliente")
    }
})

//updateMany
router.patch('/updateClientes/:campoCond/:valorCond/', async (req, res) => {
    const {campoCond,valorCond} = req.params
    const {campoUpdate,valorUpdate} = req.body
    const condicion = `{"${campoCond}":"${valorCond}"}`
    const actualizacion = `{"${campoUpdate}":"${valorUpdate}"}`
    const result = await service.updateMany(condicion,actualizacion)
    if (result) {
        res.status(200).json({
            message:`Se actualizaron clientes con la condicion:${condicion} en la base de datos`
        })
    } else {
        res.status(404).send("Error al intentar actualizar clientes")
    }
})


//deleteOne
router.delete('/:id', async (req, res) =>{
    const id = req.params.id
    const result = await service.delete(id)
    if (result.acknowledged == true && result.deletedCount > 0) {
        res.status(200).json({
            message:`Se elimino el cliente con el id:${id} en la base de datos`
        })
    } else {
        res.status(404).send("Error al intentar eliminar cliente")
    }
})

//deleteMany
router.delete('/deleteClientes/:campo/:valor', async (req, res) =>{
    const {campo,valor} = req.params
    const condicion = campo+":"+valor
    const result = await service.deleteMany(condicion)
    console.dir(result)
    console.dir(condicion)
    if (result.acknowledged == true && result.deletedCount > 0) {
        res.status(200).json({
            message:`Se eliminaron clientes con la condicion: ${condicion} en la base de datos`
        })
    } else {
        res.status(404).send("Error al intentar eliminar clientes")
    }
    // console.log(condicion)
})

module.exports = router;