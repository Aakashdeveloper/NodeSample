const express = require('express');
const app = express();
const superagent = require('superagent');
const request = require('request');
const port = 8700;
const cors = require('cors');

app.use(cors());

app.get('/',(req,res) => {
   res.send('<a href="https://github.com/login/oauth/authorize?client_id=e288d498cac3770b567f">Login With Github</a>')
    //res.send('<h1>Hiii</h1>')
})

app.get('/userInfo',(req,res) => {
    const code = req.query.code;
    if(!code){
        res.send({
            success:false,
            message:'Error While Logging'
        })
    }
    superagent
        .post('https://github.com/login/oauth/access_token')
        .send({
            client_id:'e288d498cac3770b567f',
            client_secret:'c8db9859fbe2c32d975034a9c7f39e45d6b493ca',
            code:code
        })
        .set('Accept','application/json')
        .end((err,result) => {
            if(err) throw err;
            let token = result.body.access_token
            const option = {
                url:'https://api.github.com/user',
                method:'GET',
                headers:{
                    'Accept': 'application/json',
                    'Authorization':`token ${token}`,
                    'User-Agent':'mycode'
                }
            }
            request(option,(err,response,body) => {
                res.send(body)
            })
        })
})


app.listen(port,() => {
    console.log(`Running on port ${port}`)
})