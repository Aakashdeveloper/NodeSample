const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const config = require('../config');
const User = require('../model/userSchema');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//get all user
router.get('/users',(req,res) => {
    User.find({},(err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

//register users
router.post('/register',(req,res) =>{
    //encrypt password
    let hashpassword = bcrypt.hashSync(req.body.password,8);
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashpassword,
        phone:req.body.phone,
        role:req.body.role?req.body.role:'User',
    },(err,data) => {
        if(err) return res.status(200).send('Error while register')
        res.status(200).send('Registration successful')
    })
})

//loginUser
router.post('/login',(req,res) => {
    User.findOne({email:req.body.email},(err,user) => {
        if(err) return res.status(200).send('Error while Login')
        if(!user) return res.send({auth:false,token:'No User Found'})
        else{
            const passIsValid = bcrypt.compareSync(req.body.password,user.password)
            if(!passIsValid) return res.send({auth:false,token:'Invalid Password'})
            /// in case password match generate token
            let token = jwt.sign({id:user._id}, config.secret, {expiresIn:86400}) //24 hour
            return res.send({auth:true,token:token})
        }
    })
})

//user info
router.get('/userinfo',(req,res) => {
    let token = req.headers['x-access-token'];
    if(!token) res.send({auth:false,token:'No Token Provided'})
    //verify token
    jwt.verify(token,config.secret,(err,result) => {
        if(err) res.send({auth:false,token:'Invalid token'})
        User.findById(result.id,(err,user) => {
            res.send(user)
        })
    })
})


module.exports = router