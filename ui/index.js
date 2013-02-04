
var ws = new WebSocket("ws://localhost:8080");

ws.onopen = function() {

  ws.send("Message to send");
  alert("Message is sent...");
};

ws.onmessage = function (evt) { 

  var received_msg = evt.data;
  //alert("Message is received...");
};

ws.onclose = function() { 

  alert("Connection is closed..."); 
};
