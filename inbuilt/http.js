let http = require('http');

// req > what we send to server through params, queryParams, body
// res > what we receive from server 

let server = http.createServer(function(req,res) {
    res.write('<h1>Created Node Js Server </h1>');
    res.end();
})

server.listen(7890)