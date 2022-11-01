const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app=express()
const port =process.env.PORT || 5000

// Midleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.frkx4db.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
      const serviceCollection=client.db('geniusCar').collection('services')
      
      //get services data to mongodb    
      app.get('/services',async(req,res)=>{
        const quary={}
        const cursor=serviceCollection.find(quary)
        const services= await cursor.toArray();
        res.send(services)
      })

    //   get services singleData to mongodb
    app.get('/services/:id',async(req,res)=>{
        const id =req.params.id
        const quary ={_id: ObjectId(id)}
        const services= await serviceCollection.findOne(quary)
        res.send(services)
    })
   
    //   get products data to mongodb
    app.get('/products',async (req,res)=>{
        const quary ={}
        const cursor=serviceCollection.find(quary)
        const products=await cursor.toArray();
        res.send(products)
    })
    } 
    finally{

    }
}

run().catch(err => console.log(err))

app.get('/',(req,res)=>{
    res.send('genius car server is running')
})
app.listen(port,()=>{
    console.log(`genius car running in ${port}`);
})