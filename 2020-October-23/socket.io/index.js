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
io.on('connection', function(socket){
        console.log('a user connection is established') ;
        socket.on('disconnect', function(){
                console.log('a user disconnected') ;
        } ) ;
        // The following function handles the messages received from the
        // HTML page
        socket.on('msg', function(msg){
            console.log("Messag '" + msg +"' was received!" ) ;
            io.emit("A" ,"Cick signal received!") ;
        });
} ) ;

