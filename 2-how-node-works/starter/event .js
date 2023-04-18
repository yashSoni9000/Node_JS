const EventEmitter = require('events');
const http = require('http');

const myEmitter = new EventEmitter();

myEmitter.on('newSale', () => {console.log("there was a new sale");});
myEmitter.on('newSale', () => {console.log("Customer name :Yash");});

myEmitter.on('newSale', stock => {console.log(`There are now ${stock} left in stock`);});

myEmitter.emit('newSale',9);

const server=http.createServer();
server.on('request', (req, res) => {console.log('request receiver');
console.log(req.url);
    res.end('request received');})

server.on('request', (req, res) => {
    console.log('another request');
});

server.on('close', (req, res) => {
    console.log('server closed');
});

server.listen(8000,'127.0.0.1',() => {console.log("waiting for request");});