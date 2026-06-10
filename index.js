const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// instance
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.89rnkti.mongodb.net/?appName=Cluster0`;
console.log(uri);

// ${process.env.DB_USER}
// ${process.env.DB_PASS}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    console.log(`Connect the client to the server`);

    const productCollection = client.db('emaJohnDB').collection('products');

    app.get('/products', async (req, res) => {
      const result = await productCollection.find().toArray();
      res.send(result);
    });

    // await client.db('admin').command({ ping: 1 });
    console.log('Send a ping to confirm a successful connection');
  } finally {
    // await client.close();
    console.log(`Ensures that the client will close when you finish/error`);
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('welcome to browser api homepage');
});

app.listen(port, () => {
  console.log(`ema john server is running on port: ${port}`);
});
