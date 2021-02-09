var webSocketUrl = "wss://html5labs-interop.cloudapp.net:443/echo";

var webSocket;

function establishConnection(address) {
  webSocket = new WebSocket("ws://" + address);

  webSocket.onopen = function (e) {
    console.log("connection open, readyState: " + e.target.readyState);
    sendMessage(JSON.stringify({ token: getToken() }));
  };
  
  webSocket.onerror = function (e) {
    hideLoader();
    console.log("connection error" + e.message);
    document.getElementById("lobby-content").style.display = 'none';
    document.getElementById("login-content").style.display = 'block';
  };

  webSocket.onclose = function (e) {
    hideLoader();
    document.getElementById("lobby-content").style.display = 'none';
    document.getElementById("login-content").style.display = 'block';
  }

  webSocket.onmessage = function (msg) {
    hideLoader();
    var resp = JSON.parse(msg.data);
    if (resp.lobby_status !== null) {
      document.getElementById("lobby-content").style.display = 'block';
    }
    // alert(resp.lobby_status.rooms[0]);
  }
}

function sendMessage(message) {
  if (webSocket.readyState === 1) {
    webSocket.send(message);
  }
}

function closeConnection() {
  if (webSocket.readyState === 1) {
      webSocket.close();
  }
}


