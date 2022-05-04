const express = require('express');
const app = express();
const port = process.env.PORT || 9700;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require("helmet");
const swaggerUi = require('swagger-ui-express');
const package = require('./package.json');
const swaggerDocument = require('./swagger.json');
const mongoUrl = "mongodb://localhost:27017";
let db;
let colName = "dashboard";

swaggerDocument.info.version = package.version;
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
//app.use(helmet());
app.use(express.static(__dirname+'/public'));
app.set('views','./src/views');
app.set('view engine','ejs')


app.get('/',(req,res) => {
    db.collection(colName).find({}).toArray((err,result) => {
        if(err) throw err;
        res.status(200).render('index',{data:result})
    })
})

app.get('/new',(req,res) => {
    res.render('forms')
})

app.get('/health',(req,res) => {
    res.status(200).send('Health Ok')
})

app.get('/users',(req,res) => {
    let query = {isActive:true};
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
    const  data = {
        name:req.body.name,
        city:req.body.city,
        phone:req.body.phone,
        role:req.body.role?req.body.role:'User',
        isActive:true,
    }
    db.collection(colName).insert(data,(err,result) => {
        if(err) throw err;
        res.send('Data Added')
    })
})

///hard delete
app.delete('/deleteUser', (req, res) => {
    db.collection(colName).remove(
        {_id:mongo.ObjectId(req.body._id)},(err,result) => {
            if(err) throw err;
            res.send('User Removed')
        }
    )
})

// update users
app.put('/updateUser',(req,res) => {
    db.collection(colName).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                name:req.body.name,
                city:req.body.city,
                phone:req.body.phone,
                role:req.body.role,
                isActive:true,

            }
        },(err,result) => {
            if(err) throw err;
            res.send('User Updated')
        }
    )
})

//soft delete (deactivate user)
app.put('/deactivateUser',(req,res) => {
    db.collection(colName).update(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                isActive:false
            }
        },(err,result) => {
            if(err) throw err;
            res.send('User Deactivated')
        }
    )
})

app.put('/activateUser',(req,res) => {
    db.collection(colName).update(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                isActive:true
            }
        },(err,result) => {
            if(err) throw err;
            res.send('User Activated')
        }
    )
})



MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log('Error while connecting');
    db = client.db('march7');
    app.listen(port,(err) => {
        console.log(`App is running on port ${port}`)
    })
})