const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const schema = require("./schema/schema");
const mongoose = require("mongoose");



const app = express();

// CONNECT TO MONGODB DATABASE
// const url = "mongodb+srv://dwi:theBRIV057@cluster0.ev1dmmn.mongodb.net/graphql?retryWrites=true&w=majority";
const url = "mongodb://dwi:theBRIV057@ac-cumjwk9-shard-00-00.ev1dmmn.mongodb.net:27017,ac-cumjwk9-shard-00-01.ev1dmmn.mongodb.net:27017,ac-cumjwk9-shard-00-02.ev1dmmn.mongodb.net:27017/graphql?ssl=true&replicaSet=atlas-8zdq9h-shard-0&authSource=admin&retryWrites=true&w=majority";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

console.log(mongoose.connect(url, connectionParams));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('Now listening for request on port 4000');
})