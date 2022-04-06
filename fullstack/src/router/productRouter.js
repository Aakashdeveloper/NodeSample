let express = require('express');
let productRouter = express.Router();
const mongo = require('mongodb')
const mongodb = mongo.MongoClient;

const url = process.env.mongoUrl

function router(menu){
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
                            res.render('products',{title:'Products Page',products,menu })
                        }
                    })
                }
            })
        })

    productRouter.route('/category/:id')
        .get(function(req,res){
            console.log(req.params.id)
            let id = Number(req.params.id)
            mongodb.connect(url, function(err,dc){
                if(err){
                    res.status(500).send('Error While Connecting')
                }else{
                    let dbObj = dc.db('march7');
                    dbObj.collection('products').find({category_id:id}).toArray(function(err,products){
                        if(err){
                            res.status(500).send('Error While Fetching Data')
                        }else{
                            res.render('products',{title:'Products Page',products,menu })
                        }
                    })
                }
            })
        })

    productRouter.route('/details')
        .get(function(req,res){
            console.log(req.params.id)
            let id = mongo.ObjectId(req.query.id)
            mongodb.connect(url, function(err,dc){
                if(err){
                    res.status(500).send('Error While Connecting')
                }else{
                    let dbObj = dc.db('march7');
                    dbObj.collection('products').find({_id:id}).toArray(function(err,products){
                        if(err){
                            res.status(500).send('Error While Fetching Data')
                        }else{
                            console.log()
                            res.render('details',{title:'Details Page',products,menu })
                        }
                    })
                }
            })
        })
    
    return productRouter
}

module.exports = router