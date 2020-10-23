var express = require('express');
var app = express() ;
var http = require('http').Server(app);

app.get('/', function(req, res){
  res.sendFile(__dirname+'/www/index.html');
});

app.use(express.static('www')) ;

http.listen(3000, function(){
  console.log('listening on *:3000');
});

/*========================================================================
 * bi-directional communication with the HTML page and the node server:
 *
 * This achieved using the socket io application
 *========================================================================
 */ 
var io = require('socket.io')(http) ;
var ioConnectionEstablished = false ;
io.on('connection', function(socket){
        console.log('a user connection is established') ;
        ioConnectionEstablished = true ;
        socket.on('disconnect', function(){
                console.log('a user disconnected') ;
                ioConnectionEstablished  =false ;
        } ) ;
        // The following function handles the messages received from the
        // HTML page
        socket.on('msg', function(msg){
            console.log("Messag '" + msg +"' was received!" ) ;
            io.emit("A" ,"Cick signal received!") ;
            responder.send("Click signal received!" ); 
        });
} ) ;

/*========================================================================
 * zeromq bidirectional communication between the server and the python
 * code
 *========================================================================
 */ 
var zmq = require('zeromq') ;
var responder = zmq.socket('rep') ;
responder.on('message', function(request){
        console.log('Message from python: '+request) ;

        if (ioConnectionEstablished){
            // the message is relayed to the HTML client through socket.io
            io.emit("A", ""+request) ;
        }

        responder.send("Received!") ;
}, 1000 ) ;

responder.bind('tcp://*:5555', function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Listening on 5555…");
        }

});

process.on('SIGINT', function() {
  responder.close();
});

