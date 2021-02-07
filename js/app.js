(function () {
	window.addEventListener("tizenhwkey", function (ev) {
		var activePopup = null,
			page = null,
			pageId = "";

		if (ev.keyName === "back") {
			activePopup = document.querySelector(".ui-popup-active");
			page = document.getElementsByClassName("ui-page-active")[0];
			pageId = page ? page.id : "";

			if (pageId === "main" && !activePopup) {
				try {
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			} else {
				window.history.back();
			}
		}
	});
}());

function showLoader() {
	  document.getElementById("overlay").style.display = "block";
	}

function hideLoader() {
	  document.getElementById("overlay").style.display = "none";
	}

function call() {
	const data = JSON.stringify({
		  username: "Eeee"
		});
			
		var xhr = new XMLHttpRequest();
		
		xhr.addEventListener('readystatechange', function() {
		  if (this.readyState === this.DONE) {
		    alert(this.responseText);
		  }
		});

		xhr.open('POST', 'http://192.168.0.25:8080/auth/login/guest', true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		
		xhr.send(data);
}
