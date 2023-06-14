const express = require('express');
const {MongoClient, ObjectId}= require('mongodb');
// const uri = "mongodb+srv://kevincastrillon31:admin123@clusterkevin.lmjqevf.mongodb.net/?retryWrites=true&w=majority";

const router = express.Router();

//add movie
router.post("/add", async (req, res) =>{
    const body = req.body;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db("sample_mflix").collection("movies").insertOne(body);
        if (result) {
            res.json({
                message:"Se inserto la pelicula en la base de datos",result,data:body
            })           
        } else {
            res.send("No se pudo insertar la pelicula")
        }
    } catch (error) {
        res.status(409).send(error)
    }finally{
        await client.close();
    }
})
//find all movies
router.get('/', async (req, res) =>{
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db("sample_mflix").collection("movies").find({}).limit(5).toArray();
        res.status(200).send(result)
        if (result) {
            res.send(result);
        } else {
            res.status(404).send("No se encontraron peliculas para mostrar")
        }
    } catch (error) {
        console.log(error)
    }finally{
        await client.close();
    }
})

//find movie
router.get("/:id", async (req, res) =>{
    const id = req.params.id;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db("sample_mflix").collection("movies").findOne({_id: new ObjectId(id)});
        if (result) {
            res.status(200).send(result)            
        } else {
            res.status(404).send("No se encontro pelicula con el id ingresado")
        }
    } catch (error) {
        res.send(error)
    }finally{
        await client.close();
    }
})

//1. CREATE
//1.1 insertOne()
// app.post('/movies', async (req, res)=>{
//     const body = req.body;
//     const client = new MongoClient(uri);
//     try {
//         await client.connect();
//         const result = await client.db("sample_mflix").collection("movies").insertOne(body);
//         if(result){
//             res.json({
//                 message: 'Se creo la pelicula en la Base de Datos',
//                 result,
//                 //data: body
//             });
//         }else{
//             res.send("No se creo la pelicula");
//         }
//     }catch(e){
//         console.log(e);
//     }finally{
//         await client.close();
//     }
// })

//1.2 insertMany()
router.post('/', async (req, res)=>{
    const body = req.body;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db("sample_mflix").collection("movies").insertMany(body);
        if(result){
            res.status(201).json({
                message: 'Se crearon las pelicula en la Base de Datos',
                result,
                //data: body
            });
        }else{
            res.status(400).send("No se creo la pelicula");
        }
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
})

//3. UPDATE
// updateOne() Actualizamos solo un campo
router.patch('/:id', async (req, res)=>{
    const id = req.params.id;
    const body = req.body;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db("sample_mflix").collection("movies").updateOne({_id: new ObjectId(id)},{$set:{title:body, year:body.year}});
        if(result){
            res.status(201).json({
                message: 'Se actualizo la pelicula',
                result,
                //data: body
            });
        }else{
            res.status(400).send("No se actualizo la pelicula");
        }
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
})

// DELETE
// deleteOne() Actualizamos solo un documento
router.delete('/:id', async (req, res)=>{
    const id = req.params.id;
    const body = req.body;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const result = await client.db("sample_mflix").collection("movies").deleteOne({_id: new ObjectId(id)});
        if(result){
            res.status(201).json({
                message: 'Se borro la pelicula',
                result,
                //data: body
            });
        }else{
            res.status(400).send("No se actualizo la pelicula");
        }
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
})

module.exports = router;