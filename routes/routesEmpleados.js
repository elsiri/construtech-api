const express = require('express');
const {MongoClient, ObjectId}= require('mongodb');
const bodyParser = require('body-parser');
const router = express.Router();
const uri = "mongodb+srv://kevincastrillon31:admin123@clusterkevin.lmjqevf.mongodb.net/?retryWrites=true&w=majority";

//find all empleados
router.get('/', async (req, res) =>{
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db("construtech").collection("empleados").find({}).limit(5).toArray();
        res.status(200).send(result)
        if (result) {
            res.send(result);
        } else {
            res.status(404).send("No se encontraron empleados para mostrar")
        }
    } catch (error) {
        console.log(error)
    }finally{
        await client.close();
    }
})

module.exports = router;