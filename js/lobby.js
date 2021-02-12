const joinRoomEndpoint = '/rooms/connect'

function populateLobbyList(rooms) {
  document.getElementById("room-list").innerHTML = "";
  rooms.forEach((el) => {
    var li = document.createElement("li");
    li.textContent = el;
    li.onclick = () => joinRoom(el);
    document.getElementById("room-list").appendChild(li);
  });
}

function joinRoom(roomname) {
    showLoader();

    var data = JSON.stringify({
      roomname: roomname,
      role: "estimator"
    });
  
    var req = new XMLHttpRequest();

    req.onerror = function(e) {
      console.error(e);
      hideLoader();
    };
  
    req.open("PATCH", "http://"+ getAddress() + joinRoomEndpoint, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Authorization", "Bearer " + getToken());
  
    req.send(data);
  
}