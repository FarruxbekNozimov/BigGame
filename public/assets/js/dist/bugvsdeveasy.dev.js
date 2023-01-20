"use strict";

window.addEventListener("DOMContentLoaded", function () {
  var XorO = document.getElementById("win");
  var Result = document.getElementById("winner");
  var btns = document.getElementsByClassName("ticBtns");
  var winBoard = document.getElementById("winBoard");
  var winText = document.getElementById("winText");
  var reset = document.getElementById("reset");
  var grade = location.href.split("/").pop();
  var sanoq = 0;
  var firstBoard = {};

  for (var i = 0; i < btns.length; i++) {
    firstBoard[i] = "\u2060";
  }

  var localGame = JSON.parse(localStorage.getItem("localGame")) || firstBoard;
  playGame();
  ok.addEventListener("click", function () {
    resetGame();
    winBoard.classList.add("d-none");
  });

  function playGame() {
    reset.addEventListener("click", function () {
      resetGame();
    });
    setClassName();

    var _loop = function _loop(_i) {
      btns[_i].innerHTML = localGame[_i];
      setClassName();
      console.log(Object.values(localGame).filter(Boolean));

      if (localGame) {
        console.log("sa");

        var _check = checkWin();

        winnerCheck(_check);
      }

      btns[_i].addEventListener("click", function () {
        if (btns[_i].innerHTML == "\u2060") {
          btns[_i].innerHTML = "🧑‍💻";
          setLocalBtns();
          setClassName();
          check = checkWin();
          winnerCheck(check);
          if (grade == "junior") easyGame();
          setLocalBtns();
          setClassName();
          check = checkWin();
          winnerCheck(check);
          winner.value = check;

          if (checkWin != -1) {
            return;
          }
        }
      });
    };

    for (var _i = 0; _i < btns.length; _i++) {
      _loop(_i);
    }
  }

  function setClassName() {
    for (var _i2 = 0; _i2 < btns.length; _i2++) {
      if (btns[_i2].innerHTML == "🧑‍💻") {
        btns[_i2].classList.remove("bot");

        btns[_i2].classList.add("player");
      } else if (btns[_i2].innerHTML == "🪲") {
        btns[_i2].classList.remove("player");

        btns[_i2].classList.add("bot");
      } else {
        btns[_i2].classList.remove("player");

        btns[_i2].classList.remove("bot");
      }
    }
  }

  function easyGame() {
    for (var _i3 = 0; _i3 < btns.length; _i3++) {
      if (btns[_i3].innerHTML == "\u2060") {
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

  function winnerCheck(check) {
    if (check == "🧑‍💻") {
      winBoard.classList.remove("d-none");
      winBoard.classList.remove("errorWin");
      winText.innerHTML = "You are very good Junior 💻 👍";
      return;
    }

    if (check == "🪲") {
      winBoard.classList.remove("d-none");
      winBoard.classList.add("errorWin");
      winText.innerHTML = "You are not " + grade + " 😝";
      return;
    }

    if (check == 0) {
      winBoard.classList.remove("d-none");
      winBoard.classList.remove("errorWin");
      winText.innerHTML = "Tie | Bug vs Dev !!!";
      return;
    }
  }

  function setLocalBtns() {
    for (var _i4 = 0; _i4 < btns.length; _i4++) {
      localGame[_i4] = btns[_i4].innerHTML;
    }

    localStorage.setItem("localGame", JSON.stringify(localGame));
  }

  function resetGame() {
    for (var _i5 = 0; _i5 < btns.length; _i5++) {
      btns[_i5].innerHTML = "\u2060";
      setClassName();
      localStorage.clear();
      location.reload();
    }
  }
});