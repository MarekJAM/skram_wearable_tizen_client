function populateUsersList(status) {
  if (status.task.id != null && status.task.id !== "") {
    document.getElementById("task-info").innerHTML = status.task.id;
  }

  var userlist = document.getElementById("users-list");

  userlist.innerHTML = "";

  status.users.admins.forEach((admin) => {
    var li = document.createElement("li");
    li.textContent = admin;
    li.style.color = "orange";
    userlist.appendChild(li);
  });

  status.users.estimators.forEach((es) => {
    var li = document.createElement("li");
    li.textContent = es;
    userlist.appendChild(li);
  });

  status.users.spectators.forEach((es) => {
    var li = document.createElement("li");
    li.textContent = es;
    li.style.color = "lightblue";
    userlist.appendChild(li);
  });

  status.task.estimates.forEach((es) => {
    if (es.estimate != null && es.estimate != -1) {
      userlist.childNodes.forEach((node) => {
        if (node.textContent == es.name) {
          node.textContent = es.estimate + " " + node.textContent;
        }
      });
    }
  });
}

function rotaryEventHandler(e) {
  var value = parseInt(document.getElementById("estimate").innerHTML);

  if (e.detail.direction === "CW") {
    ++value;
  } else if (e.detail.direction === "CCW") {
    --value;
  }
  
  document.getElementById("estimate").innerHTML = value;
}
l;
