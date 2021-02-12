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
    changePage("login-content");
  };

  webSocket.onclose = function (e) {
    hideLoader();
    changePage("login-content");
  }

  webSocket.onmessage = function (msg) {
    hideLoader();

    var resp = JSON.parse(msg.data);

    if (resp.lobby_status != null) {
      changePage("lobby-content");
      populateLobbyList(resp.lobby_status.rooms);
    } else if (resp.room_status != null) {
      changePage("room-content");
      populateUsersList(resp.room_status);
      document.addEventListener('rotarydetent', rotaryEventHandler, false);
    }
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


