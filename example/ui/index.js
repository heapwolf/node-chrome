
var ws = new WebSocket("ws://localhost:8080");

ws.onopen = function() {

  ws.send('test');
};

ws.onmessage = function (evt) { 

  var received_msg = evt.data;
};

ws.onclose = function() { 

};
