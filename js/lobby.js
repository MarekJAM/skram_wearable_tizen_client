function populateLobbyList(rooms) {
  document.getElementById("room-list").innerHTML = "";
  rooms.forEach((el) => {
    var li = document.createElement("li");
    li.textContent = el;
    document.getElementById("room-list").appendChild(li);
  });
}
