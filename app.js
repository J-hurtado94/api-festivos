const express = require('express');
const mongoose = require('mongoose');
const festivosRouter = require('./routes/festivos');
const app = express();
const port = 3000;

mongoose.connect('mongodb://apifestivosdb:27017/festivosDB', {

});

app.use(express.json());


app.use('/festivos', festivosRouter);



module.exports=app 