"use strict";

window.addEventListener("DOMContentLoaded", function () {
  var XorO = document.getElementById("win");
  var Result = document.getElementById("winner");
  var btns = document.getElementsByClassName("ticBtns");
  var winBoard = document.getElementById("winBoard");
  var winText = document.getElementById("winText");
  var reset = document.getElementById("reset");
  var grade = location.href.split("/").pop();
  playGame();

  function playGame() {
    reset.addEventListener("click", function () {
      for (var i = 0; i < btns.length; i++) {
        btns[i].innerHTML = "\u2060";
        setClassName();
      }
    });
    setClassName();

    var _loop = function _loop(i) {
      btns[i].innerHTML = "\u2060";
      btns[i].addEventListener("click", function () {
        if (btns[i].innerHTML == "\u2060") {
          btns[i].innerHTML = "🧑‍💻";

          if (grade == "easy") {
            easyGame();
          }

          setClassName();
          var check = checkWin();

          if (check == "🧑‍💻") {
            winBoard.classList.remove("d-none");
            winText.innerHTML = "You are very good coder 💻";
            return;
          }
        }
      });
    };

    for (var i = 0; i < btns.length; i++) {
      _loop(i);
    }
  }

  function setClassName() {
    for (var i = 0; i < btns.length; i++) {
      if (btns[i].innerHTML == "🧑‍💻") {
        btns[i].classList.remove("bot");
        btns[i].classList.add("player");
      } else if (btns[i].innerHTML == "🪲") {
        btns[i].classList.remove("player");
        btns[i].classList.add("bot");
      } else {
        btns[i].classList.remove("player");
        btns[i].classList.remove("bot");
      }
    }
  }

  function easyGame() {
    for (var i = 0; i < btns.length; i++) {
      if (btns[i].innerHTML == "\u2060") {
        var randBtn = btns[Math.floor(Math.random() * btns.length)];

        while (randBtn.innerHTML != "\u2060") {
          randBtn = btns[Math.floor(Math.random() * btns.length)];
        }

        randBtn.innerHTML = "🪲";
        return;
      }
    }
  }

  function checkWin() {
    if (btns[0].innerHTML == btns[1].innerHTML && btns[1].innerHTML == btns[2].innerHTML && btns[2].innerHTML != "\u2060") {
      return btns[2].innerHTML;
    } else if (btns[3].innerHTML == btns[4].innerHTML && btns[4].innerHTML == btns[5].innerHTML && btns[5].innerHTML != "\u2060") {
      return btns[5].innerHTML;
    } else if (btns[6].innerHTML == btns[7].innerHTML && btns[7].innerHTML == btns[8].innerHTML && btns[8].innerHTML != "\u2060") {
      return btns[8].innerHTML;
    } else if (btns[0].innerHTML == btns[3].innerHTML && btns[3].innerHTML == btns[6].innerHTML && btns[6].innerHTML != "\u2060") {
      return btns[6].innerHTML;
    } else if (btns[1].innerHTML == btns[4].innerHTML && btns[4].innerHTML == btns[7].innerHTML && btns[7].innerHTML != "\u2060") {
      return btns[7].innerHTML;
    } else if (btns[2].innerHTML == btns[5].innerHTML && btns[5].innerHTML == btns[8].innerHTML && btns[8].innerHTML != "\u2060") {
      return btns[8].innerHTML;
    } else if (btns[0].innerHTML == btns[4].innerHTML && btns[4].innerHTML == btns[8].innerHTML && btns[8].innerHTML != "\u2060") {
      return btns[8].innerHTML;
    } else if (btns[2].innerHTML == btns[4].innerHTML && btns[4].innerHTML == btns[6].innerHTML && btns[6].innerHTML != "\u2060") {
      return btns[6].innerHTML;
    } else if (btns[0].innerHTML != "\u2060" && btns[1].innerHTML != "\u2060" && btns[2].innerHTML != "\u2060" && btns[3].innerHTML != "\u2060" && btns[4].innerHTML != "\u2060" && btns[5].innerHTML != "\u2060" && btns[6].innerHTML != "\u2060" && btns[7].innerHTML != "\u2060" && btns[8].innerHTML != "\u2060") {
      return 0;
    } else {
      return -1;
    }
  }
});