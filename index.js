require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qdiymxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri)
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
 
  try {
    const db = client.db('ElectronicGadget');
    const productsCollection = db.collection('ElectronicProducts');
     

   

    app.get('/products', async (req, res) => {
      
      const cursor = productsCollection.find();
      const donation = await cursor.toArray();
      res.send(donation);
    });
   
    app.get('/products/:id',async(req,res)=>{
      console.log(req.params)
      const id=req.params.id;
      const query={_id:new ObjectId(id)}
      const result=await productsCollection.findOne(query)
      res.send(result)
    })
    app.get('/categories',async(req,res)=>{
      const brandname=req.query.brand 
      console.log(brandname)
      const query={ brand:  brandname }
     
      const result=await productsCollection.find(query).toArray()
      console.log(result)
      res.send(result)
    })
   
    // app.post('/donation', async (req, res) => {
    //   const donation = req.body;
    //   const result = await donationCollection.insertOne(donation);
    //   res.send(result);
    // });
    

  } finally {
  }
};

run().catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
