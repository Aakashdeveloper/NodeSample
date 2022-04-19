const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); 
const port = process.env.PORT || 9870;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoUrl = process.env.mongoUrl


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

let authKey = "a9d1fb5748cbdcd7e9ec823a69cc4fa0";


//get heart beat 
app.get('/',(req,res) => {
    res.send('Welcome to Heart Beat')
})

function authFunction(key){
    if(key == authKey){
        return true
    }else{
        return false
    }
}

////list of city
app.get('/location',(req,res) => {
    // if(!authFunction(req.header('x-access-token'))){
    //     res.send('Unauthorised Request')
    // }
    db.collection('location').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    }) 
})

////list of restaurants
app.get('/restaurants',(req,res) => {
    db.collection('restaurants').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    }) 
})

////list of mealtype
app.get('/mealtype',(req,res) => {
    db.collection('mealType').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    }) 
})

app.get('/list/:item',(req,res) => {
    let colName = req.params.item
    db.collection(colName).find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    }) 
})


MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log('Error While connecting')
    db = client.db('augintern');
    app.listen(port, () => {
        console.log(`Listing to port ${port}`)
    })
})