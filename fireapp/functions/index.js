const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

admin.initializeApp(functions.config().firebase);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const db = admin.firestore();

exports.addCiti = functions.https.onRequest(async(req,res) => {
    const citisRef = db.collection('marchnode');
    await citisRef.doc('Delhi').set({
        "name":"Delhi","Country":"India","Population":876566
    })
    res.send('Data Added')
})

exports.getMessage = functions.https.onRequest(async (req,res) => {
    const citisRef = db.collection('marchnode');
    const snapshot = await citisRef.get();
    let out = []
    snapshot.forEach(doc => {
        out.push(doc.data())
    })
    res.send(out)
})