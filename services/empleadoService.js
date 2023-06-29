require("dotenv").config()
const {MongoClient, ObjectId} = require("mongodb")
const uri = process.env.URI;

class empleadoService{
    constructor(){}

    async find(){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const empleados = client.db("construtech").collection("empleados").find({}).limit(5).sort({_id:-1}).toArray()
            if(empleados){
                return empleados                
            }
        } catch (error) {
            console.log(error)
        }
    }

    async findOne(id){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const empleado = client.db("construtech").collection("empleados").findOne({_id: new ObjectId(id)}).toArray()
            if(empleado){
                return empleado                
            }
        } catch (error) {
            console.log(error)
        }
    }

    async add(body){
        const client = new MongoClient(uri)
        try {
            await client.connect();
            const result = await client.db("construtech").collection("empleados").insertOne(body)
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
        // finally{
        //     await client.close();
        // }
    }

    async addMany(arrayempleados){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result = await client.db("construtech").collection("empleados").insertMany(arrayempleados)
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }

    async update(id,nombres,apellidos){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result = await client.db("construtech").collection("empleados").updateOne({_id: new ObjectId(id)},{$set:{nombres:nombres,apellidos:apellidos}})
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }

    async updateMany(condicion, actualizacion){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result = await client.db("construtech").collection("empleados").updateMany({condicion},{$set:{actualizacion}})
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }

    async delete(id){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result = await client.db("construtech").collection("empleados").deleteOne({_id: new ObjectId(id)})
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    async deleteMany(condicion){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result = await client.db("construtech").collection("empleados").deleteMany({condicion})
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }

}


module.exports = empleadoService;