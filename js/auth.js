const sessionTokenKey = "sessionToken";
const addressKey = "address";
const loginEndpoint = "/auth/login/guest";

function getToken() {
  return localStorage.getItem(sessionTokenKey);
}

function setToken(token) {
  localStorage.setItem(sessionTokenKey, token);
}

function getAddress() {
  return localStorage.getItem(addressKey);
}

function setAddress(address) {
  localStorage.setItem(addressKey, address);
}

function login(username, address) {
  showLoader();

  var data = JSON.stringify({
    username: username,
  });

  setAddress(address);

  var req = new XMLHttpRequest();

  req.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      var res = JSON.parse(this.response);
      hideLoader();
      setToken(res.token);
      establishConnection(address);
    }
  });

  req.onerror = function (e) {
    console.error(e);
    hideLoader();
  };

  req.open("POST", "http://" + getAddress() + loginEndpoint, true);
  req.setRequestHeader("Content-Type", "application/json");

  req.send(data);
}
