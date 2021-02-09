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
        } catch (ignore) {}
      } else {
        window.history.back();
      }
    }
  });
})();

function showLoader() {
  document.getElementById("overlay").style.display = "block";
}

function hideLoader() {
  document.getElementById("overlay").style.display = "none";
}


