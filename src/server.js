const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');
const IO = require('socket.io');


const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app)
const io = IO.listen(server);

io.on("connection", socket => {

});
app.io = io;
app.use(function(req,res,next){
    req.io = io;
    next();
});
app.use(routes);


server.listen(3000,()=> console.log('server running')); 