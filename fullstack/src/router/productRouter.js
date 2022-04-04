let express = require('express');
let productRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
const url = process.env.mongoUrl

productRouter.route('/')
    .get(function(req,res){
        mongodb.connect(url, function(err,dc){
            if(err){
                res.status(500).send('Error While Connecting')
            }else{
                let dbObj = dc.db('march7');
                dbObj.collection('products').find().toArray(function(err,products){
                    if(err){
                        res.status(500).send('Error While Fetching Data')
                    }else{
                        res.render('products',{title:'Products Page',products })
                    }
                })
            }
        })
    })

productRouter.route('/details')
    .get(function(req,res){
        res.send('products details')
    })

module.exports = productRouter