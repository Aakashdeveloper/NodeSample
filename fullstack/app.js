let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 8900;
let categoryRouter = require('./src/router/categoryRouter')
let productRouter = require('./src/router/productRouter');
let morgan = require('morgan');
let fs = require('fs');
//app.use(morgan('combined'))

app.use(morgan('short',{stream:fs.createWriteStream('./app.logs')}))

// for template
app.use(express.static(__dirname+'/public'))
// html file path
app.set('views','./src/views')
//view engine
app.set('view engine','ejs')

///default route
app.get('/', function(req,res){
    //res.send("<h1>Welcome To Express</h1>")
    res.render('index',{title:'Home Page'})
});

app.use('/category', categoryRouter)
app.use('/products', productRouter)

app.listen(port,function(err){
    if(err) throw err;
   // console.log("Server is running on port "+port)
   console.log(`Server is running on port ${port}`)
});