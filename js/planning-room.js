var taskId;
var availableEstimates = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  20,
];
var estimateIndex = 0;

function processRoomStatus(status) {
  if (
    status.task.id != null &&
    status.task.id !== "" &&
    status.task.id !== taskId
  ) {
    taskId = status.task.id;
    document.getElementById("task-info").innerHTML = status.task.id;
    var estimateBtn = document.getElementById("estimate");
    estimateBtn.style.display = "table-cell";
    estimateBtn.innerHTML = availableEstimates[estimateIndex];
    estimateBtn.onclick = () => {
      sendMessage(
        JSON.stringify({ estimate: availableEstimates[estimateIndex] })
      );
      estimateBtn.style.display = "none";
    };
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
  if (e.detail.direction === "CW") {
    if (estimateIndex < availableEstimates.length - 1) {
      estimateIndex += 1;
    }
  } else if (e.detail.direction === "CCW") {
    if (estimateIndex > 0) {
      estimateIndex -= 1;
    }
  }

  document.getElementById("estimate").innerHTML =
    availableEstimates[estimateIndex];
}
