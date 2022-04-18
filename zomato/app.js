const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); 
const port = process.env.PORT || 9870;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoUrl = process.env.mongoUrl


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());