const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');

const auth = require('./middleware/auth');
const errors = require('./middleware/errors');

const unless = require('express-unless');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db,{
    //userNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () =>{
        console.log('Database Connected');
    },
    (error) =>{
       console.log("Database not connected" +error)
    }
);

auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path:[
            {url : "/users/login",methods:["POST"]},
            {url : "/users/register",methods:["POST"]},
        ],
    })
);

app.use(express.json());

app.use("/users",require("./routes/users.route"));

app.use(errors.errorHandler);

app.listen(process.env.port || 4000,()=>{
    console.log("You are running on port 4000!");
});