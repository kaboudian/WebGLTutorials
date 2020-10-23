#!/usr/local/bin/python3.8
import zmq
import time

context = zmq.Context()

#  Socket to talk to server
print("Connecting to hello world server…")
socket = context.socket(zmq.REQ)
socket.connect("tcp://localhost:5555")

#  Do 10 requests, waiting each time for a response
for request in range(10):
    print("Sending request %s …" % request)
    socket.send(b"Signal")

    # Get the reply.
    message = socket.recv()
    print("Message from node server %s!" % message) ;

    time.sleep(2.) ;
