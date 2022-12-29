const express = require('express');
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("simple node server running.")
})

async function run() {
  try {
    const uri = "mongodb+srv://mediaswag:mediaswag@cluster0.wk12kvv.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    const data = client.db("mediaswag");
    const postCollection = data.collection("posts");
    const commentCollection = data.collection("comment");

    app.get("/posts", async (req, res) => {
      const query = {};
      const data=postCollection.find(query)
      const post = await data.toArray();
      res.send(post)
    })
    app.get("/comment", async (req, res) => {
      const query = {};
      const data=commentCollection.find(query)
      const post = await data.toArray();
      res.send(post)
    })
    app.post('/posts', async(req, res) => {
      const data = req.body;
      const result = await postCollection.insertOne(data);
      res.send(result)
    })
    app.post('/comment', async(req, res) => {
      const data = req.body;
      const result = await commentCollection.insertOne(data);
      res.send(result)
    })

  }finally{
    
  }
}
run().catch((err) => console.log(err));


app.listen(port, () => {
  console.log('server running',port);
})