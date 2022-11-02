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
        // services collection
      const serviceCollection=client.db('geniusCar').collection('services')
    //   order Collection
    const orderCollection =client.db('geniusCar').collection('orders')
      
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

    // Oprder APi
    app.get('/orders',async (req,res)=>{
        let quary={}
        if(req?.query?.email){
            quary={
                email: req?.query?.email
            }
        }
        const cursor =orderCollection.find(quary)
        const orders = await cursor.toArray()
        res.send(orders)
    })
   
    app.post('/orders',async(req,res)=>{
        const order =req.body
        const result= await orderCollection.insertOne(order)
        res.send(result);
    })
    app.patch('/orders/:id', async (req, res) => {
        const id = req.params.id;
        const status = req.body.status
        const query = { _id: ObjectId(id) }
        const updatedDoc = {
            $set:{
                status: status
            }
        }
        const result = await orderCollection.updateOne(query, updatedDoc);
        res.send(result);
    })

    app.delete('/orders/:id',async(req,res)=>{
        const id=req.params.id
        const quary={_id: ObjectId(id)}
        const result=await orderCollection.deleteOne(quary)
        res.send(result)
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