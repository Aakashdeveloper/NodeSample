let express = require('express');
let categoryRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
const url = process.env.mongoUrl


categoryRouter.route('/')
    .get(function(req,res){
        mongodb.connect(url, function(err,dc){
            if(err){
                res.status(500).send('Error While Connecting')
            }else{
                let dbObj = dc.db('march7');
                dbObj.collection('category').find().toArray(function(err,response){
                    if(err){
                        res.status(500).send('Error While Fetching Data')
                    }else{
                        res.render('category',{title:'Category Page',data:response})
                    }
                })
            }
        })
        
    })

categoryRouter.route('/details')
    .get(function(req,res){
        res.send('category details')
    })

module.exports = categoryRouter