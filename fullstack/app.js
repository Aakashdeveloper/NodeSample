let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 8900;


///default route
app.get('/', function(req,res){
    res.send("<h1>Welcome To Express</h1>")
});

app.get('/city', function(req,res){
    res.send("<h1>Welcome To City</h1>")
})

app.listen(port,function(err){
    if(err) throw err;
   // console.log("Server is running on port "+port)
   console.log(`Server is running on port ${port}`)
});