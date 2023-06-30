const express = require('express');
const {MongoClient, ObjectId}= require('mongodb');
const empleadoService = require('../services/empleadoService')
// const bodyParser = require('body-parser');
const router = express.Router();
// const uri = "mongodb+srv://kevincastrillon31:admin123@clusterkevin.lmjqevf.mongodb.net/?retryWrites=true&w=majority";
const service = new empleadoService

//find all empleados
router.get('/', async (req, res) =>{
    const empleados = await service.find()
    if (empleados) {
        res.status(200).send(empleados)
    } else {
        res.status(404).send("No se encontraron los empleados")
    }
})

router.get('/:id', async (req, res) =>{
    const id = req.params.id
    const empleado = await service.findOne(id)
    if (empleado) {
        res.status(200).send(empleado)
    } else {
        res.status(404).send(`No se encontro empleado con el id:${id}`)
    }
})

//insertOne Empleado
router.post("/addEmpleado", async (req, res) =>{
    const result = await service.add(req.body)
    if (result) {
        res.status(200).json({
            message:"Se agrego un Empleado en la base datos",result
        })
    } else {
        res.status(404).send("Error al insertar Empleado")
    }
})

//inserMany
router.post("/addEmpleados", async (req, res) =>{
    const result = await service.addMany(req.body)
    if (result) {
        res.status(200).json({
            message:`Se agregaron Empleados en la base datos`
        })
    } else {
        res.status(404).send("Error al intentar insertar Empleados")
    }
})

//updateOne
router.patch('/:id', async (req, res) =>{
    const id = req.params.id
    const {nombres,apellidos} = req.body
    const result = await service.update(id,nombres,apellidos)
    if (result.modifiedCount > 0) {
        res.status(200).json({
            message:`Se actualizo el empleado con el id:${id} en la base de datos`
        })
    } else {
        res.status(404).send("Erorr al intentar actualizar empleado")
    }
})

//updateMany
router.patch('/updateEmpleados/:campoCond/:valorCond/', async (req, res) => {
    const {campoCond,valorCond} = req.params
    const {campoUpdate,valorUpdate} = req.body
    const condicion = `{"${campoCond}":"${valorCond}"}`
    const actualizacion = `{"${campoUpdate}":"${valorUpdate}"}`
    const result = await service.updateMany(condicion,actualizacion)
    if (result) {
        res.status(200).json({
            message:`Se actualizaron Empleados con la condicion:${condicion} en la base de datos`
        })
    } else {
        res.status(404).send("Error al intentar actualizar empleados")
    }
})


//deleteOne
router.delete('/:id', async (req, res) =>{
    const id = req.params.id
    const result = await service.delete(id)
    if (result.acknowledged == true && result.deletedCount > 0) {
        res.status(200).json({
            message:`Se elimino el empleado con el id:${id} en la base de datos`
        })
    } else {
        res.status(404).send("Error al intentar eliminar empleado")
    }
})

//deleteMany
router.delete('/deleteEmpleados/:campo/:valor', async (req, res) =>{
    const {campo,valor} = req.params
    const condicion = campo+":"+valor
    const result = await service.deleteMany(condicion)
    console.dir(result)
    console.dir(condicion)
    if (result.acknowledged == true && result.deletedCount > 0) {
        res.status(200).json({
            message:`Se eliminaron Empleados con la condicion: ${condicion} en la base de datos`
        })
    } else {
        res.status(404).send("Error al intentar eliminar Empleados")
    }
    // console.log(condicion)
})




module.exports = router;