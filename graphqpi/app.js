let express = require('express');
let app = express();
let port = 8600;
let {graphqlHTTP} = require('express-graphql')
let schema = require('./Schema/schema');

app.use(
    '/graphql',
    graphqlHTTP({
        schema:schema,
        graphiql:true
    })
)
app.listen(port,() => {
    console.log(`App Is Running on port ${port}`)
})