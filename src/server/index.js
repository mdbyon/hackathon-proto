const express = require('express');

const bodyParser = require('body-parser')
const app = express();

const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname +'./../../'));



app.get('/users', (req, res) => {
  mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true},
    (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    const db = client.db("hackathon")
    db.collection("users").find().toArray((err, items) => {
      console.log(items)
    })
  })
})


app.post('/users', (req, res) => {
  mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true},
    (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(req)
    const db = client.db("hackathon")
    console.log(db.collection("users").insertOne(req.body))
  })
})


app.listen(process.env.PORT || 8080);
