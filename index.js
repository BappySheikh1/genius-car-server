const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app=express()
const port =process.env.PORT || 5000

// Midleware
app.use(cors())
app.use(express.json())
 
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);

// user name : geniusDBcar
// user password : Topl9GHrzrP9iIQj

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.frkx4db.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{

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