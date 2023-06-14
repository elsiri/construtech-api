require("dotenv").config()
const {MongoClient, ObjectId} = require("mongodb")
const uri = process.env.URI;

class clienteService{
    constructor(){}

    async find(){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const clientes = client.db("construtech").collection("clientes").find({}).limit(5).sort({_id:-1}).toArray()
            if(clientes){
                return clientes                
            }
        } catch (error) {
            console.log(error)
        }
    }

    async findOne(id){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const cliente = client.db("construtech").collection("clientes").findOne({_id: new ObjectId(id)}).toArray()
            if(cliente){
                return cliente                
            }
        } catch (error) {
            console.log(error)
        }
    }

    async add(body){
        const client = new MongoClient(uri)
        try {
            await client.connect();
            const result = await client.db("construtech").collection("clientes").insertOne(body)
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

    async addMany(arrayClientes){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result = await client.db("construtech").collection("clientes").insertMany(arrayClientes)
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
            const result = await client.db("construtech").collection("clientes").updateOne({_id: new ObjectId(id)},{$set:{nombres:nombres,apellidos:apellidos}})
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
            const result = await client.db("construtech").collection("clientes").updateMany({condicion},{$set:{actualizacion}})
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
            const result = await client.db("construtech").collection("clientes").deleteOne({_id: new ObjectId(id)})
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
            const result = await client.db("construtech").collection("clientes").deleteMany({condicion})
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }

}


module.exports = clienteService;