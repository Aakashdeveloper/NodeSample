const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();
const port = 9870;

//middleware
app.use(bodyParser.json());
app.use(fileUpload())

//view
app.use(express.static(__dirname+'/public'))
app.set('view engine', 'ejs');


app.get('/',(req,res) => {
    res.render('index')
})

app.post('/profile',(req,res) => {
    console.log(req.files);
    console.log(req.body)
    const imageFile = req.files.yourImage;
    imageFile.mv(`${__dirname}/public/images/${imageFile.name}`,(err,data) => {
        if(err) throw err;
        res.render('display',{title:req.body.uname, image:imageFile.name})
    })
})


app.listen(port, (err) => {
    console.log(`Server is running on port ${port}`)
})