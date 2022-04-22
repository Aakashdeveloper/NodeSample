const express = require('express');
const app = express();
const port = process.env.PORT || 9700;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoUrl = "mongodb://localhost:27017";
let db;
let colName = "dashboard";

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/health',(req,res) => {
    res.status(200).send('Health Ok')
})

app.get('/users',(req,res) => {
    let query = {};
    if(req.query.city && req.query.role){
        query = {city:req.query.city,role:req.query.role,isActive:true}
    }else if(req.query.city){
        query = {city:req.query.city,isActive:true}
    }else if(req.query.role){
        query = {role:req.query.role,isActive:true}
    }
    else if(req.query.isActive){
        let isActive = req.query.isActive
        if(isActive == "false"){
            isActive = false
        }else{
            isActive = true
        }
        query={isActive}
    }
    db.collection(colName).find(query).toArray((err,result) => {
        if(err) throw err;
        res.status(200).send(result)
    });
})

//find PARTICULAR user
app.get('/user/:id',(req,res) => {
    let id = mongo.ObjectId(req.params.id);
    db.collection(colName).find({_id:id}).toArray((err,result) => {
        if(err) throw err;
        res.status(200).send(result)
    });
})

/////post user
app.post('/addUser',(req,res) => {
    db.collection(colName).insert(req.body,(err,result) => {
        if(err) throw err;
        res.send('Data Added')
    })
})


MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log('Error while connecting');
    db = client.db('march7');
    app.listen(port,(err) => {
        console.log(`App is running on port ${port}`)
    })
})