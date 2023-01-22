"use strict";

window.addEventListener("load", function () {
  var navUser = document.getElementById("navUser");
  var navbarUsrInfoClose = document.getElementById("navbarUsrInfoClose");
  navUser.addEventListener("click", function () {
    document.getElementById("aboutUser").classList.toggle("d-none");
  });
  navbarUsrInfoClose.addEventListener("click", function () {
    document.getElementById("aboutUser").classList.add("d-none");
  });
});