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
app.get('/details/:id',(req,res) =>{
    let restId = mongo.ObjectId(req.params.id);
    db.collection('restaurants').find({_id:restId}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

/// menu wrt to restaurants
app.get('/menu/:id',(req,res) =>{
    let Id = Number(req.params.id);
    db.collection('menu').find({restaurant_id:Id}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

/// place order
app.post('/placeOrder',(req,res) => {
    db.collection('orders').insert(req.body,(err,result) => {
        if(err) throw err;
        res.send('order Placed')
    })
})

// menu on basis of ids
app.post('/menuItem',(req,res) => {
    if(Array.isArray(req.body)){
        db.collection('menu').find({menu_id:{$in:req.body}}).toArray((err,result) => {
            if(err) throw err;
            res.send(result);
        })
    }else{
        res.send('Please pass array only');
    }
})

/// menu wrt to restaurants
app.get('/viewOrders',(req,res) =>{
    let email = req.query.email
    let query = {}
    if(email){
        //query = {email:email}
        query = {email}
    }
    db.collection('orders').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//update order
app.put('/updateOrder',(req,res) => {
    db.collection('orders').updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                "status":req.body.status,
                "tax_status":req.body.tax_status,
                "bank_name":req.body.bank_name
            }
        },(err,result) => {
            if(err) throw err;
            res.status(200).send('Status updated')
        }
    )
})

// delete order
app.delete('/removeData',(req,res) => {
    let id = mongo.ObjectId(req.body._id);
    let col = 'orders'
    db.collection(col).find({_id:id}).toArray((err,result) => {
        if(result.length !== 0){
            db.collection(col).deleteOne({_id:id},(err,result) => {
                if(err) throw err;
                res.status(200).send('Order Deleted')
            })
        }else{
            res.send(`No Order Found in ${col} collection to remove`)
        }
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