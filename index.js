const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
require('dotenv').config()


app.get('/', (req, res)=>{
    res.send('online delivery service server is running');
});


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.og8pjeq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    const servicesCollection = client.db('onlineDelivery').collection('services');
    try{
        app.get('/services', async(req, res)=>{
            const query = {};
            const cursor = servicesCollection.find(query);
            const services = await cursor.toArray();
            res.send(services)
        });

        app.get('/services/:id', async(req, res)=>{
            const id = req.params.id;
            const  query = {_id : ObjectId(id)};
            const result = await servicesCollection.findOne(query);
            res.send(result);
        })
    }
    finally{

    }
}
run().catch((err)=> console.log(err));




app.listen(port, ()=>{
    console.log(`online delivery service server is running in port ${port}`)
})
