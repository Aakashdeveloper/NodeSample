let express = require('express');
let redis = require('redis');
let mongodb = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017";
let app = express();
let port = 3455;

const client = redis.createClient({
    host:'localhost',
    port:6379
})

app.get('/data',(req,res) =>{
    const userInput = (req.query.color).trim();
    //check data in redis;
    client.get(`${userInput}`,(err,result) => {
        //if redis have data
        if(result) {
            const output = JSON.parse(result);
            res.send(output)
        }else{
            //get data from mongo
            mongodb.connect(url, (err,dc) => {
                if(err){
                    res.send('Error while connecting')
                }else{
                    let dbObj = dc.db('march7');
                    dbObj.collection('products').find({'Color':userInput}).toArray((err,data) => {
                        if(err){
                            res.status(501).send('Error While fetching')
                        }else{
                            //save in redis
                            client.setex(`${userInput}`,3600,JSON.stringify({source:'Redis',data}))
                            // first time return from mongo
                            res.send({source:'Mongodb',data})
                        }
                    })
                }
            })
        }
    })
})


app.listen(port,(err)=>{
    console.log(`Server is running on port ${port}`)
})