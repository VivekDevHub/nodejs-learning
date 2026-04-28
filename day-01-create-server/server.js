let http = require('http');
let server = http.createServer((req, res) => {
 res.end("Hey are love Apple ...")
 console.log('=*=*=**==*=* after hit request on browser');
 
})

server.listen(3000,() => {
    console.log("server is running on port 3000");
    
})