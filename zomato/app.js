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
    let stateId = Number(req.query.stateId)
    let mealId = Number(req.query.mealId)
    let query = {}
    if(stateId && mealId){
        query={state_id:stateId,"mealTypes.mealtype_id":mealId}
    }
    else if(stateId){
        query={state_id:stateId}
    }else if(mealId){
        query={"mealTypes.mealtype_id":mealId}
    }
    db.collection('restaurants').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    }) 
})

////filters
app.get(`/filters/:mealId`,(req,res) => {
    let sort = {cost:1};
    let skip = 0;
    let limit = 1000000000
    let mealId = Number(req.params.mealId);
    let cuisineId = Number(req.query.cuisineId);
    let lcost = Number(req.query.lcost)
    let hcost = Number(req.query.hcost)
    let query  = {}
    if(req.query.sort){
        sort = {cost:req.query.sort}
    }

    if(req.query.skip && req.query.limit){
        skip = Number(req.query.skip)
        limit = Number(req.query.limit)
    }

    if(cuisineId && lcost && hcost){
        query={
            "mealTypes.mealtype_id":mealId,
            "cuisines.cuisine_id":cuisineId,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }
    else if(cuisineId){
        query={"mealTypes.mealtype_id":mealId,"cuisines.cuisine_id":cuisineId}
    }else if(lcost && hcost){
        query={
            "mealTypes.mealtype_id":mealId,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }
    db.collection('restaurants').find(query).sort(sort).skip(skip).limit(limit).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

/// restaurants details


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