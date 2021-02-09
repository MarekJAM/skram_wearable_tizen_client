const sessionTokenKey = 'sessionToken';
const loginEndpoint = '/auth/login/guest';

function getToken() {
    return localStorage.getItem(sessionTokenKey);
}

function setToken(token) {
    localStorage.setItem(sessionTokenKey, token);
}

function login(username, address) {
    showLoader();

    var data = JSON.stringify({
      username: username,
    });
  
    var req = new XMLHttpRequest();
  
    req.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        var res = JSON.parse(this.response);
        setToken(res.token);
        establishConnection(address);
      }
    });
  
    req.open("POST", "http://"+ address + loginEndpoint, true);
    req.setRequestHeader("Content-Type", "application/json");
  
    req.send(data);
  }