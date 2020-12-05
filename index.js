//dependences
const morgan =  require("morgan");
const express = require('express');
const app = express();

//routes
const humanResources = require('./routes/humanResources');
const user = require('./routes/user');

//middleware
const index = require("./middleware/index");
const notFound = require("./middleware/notFound");

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.get("/", index);

app.use("/user", user);
app.use("/humanresources", humanResources);
app.use(notFound);

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is running...");
}); 