const express = require('express');
const bodyParser = require('body-parser');
const PostsRoutes = require('./Routes/Posts');  
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://marnarsay-cosomo:w7voq67w8mXwceKO21EZZz2eOSJVucwOFzygdiHw6wIrz4ypPcqYJasaWfKVRX1KPKcL73AgRyudHa0AaXN5gg%3D%3D@marnarsay-cosomo.documents.azure.com:10255/Posts-test?ssl=true')
.then(() =>{
    console.log('Connected to BD');
})
.catch(() => {
    console.log('Connection failed');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.use('/api/posts', PostsRoutes);


module.exports = app;