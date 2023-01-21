"use strict";

window.addEventListener("DOMContentLoaded", function () {
  var btns = document.getElementsByClassName("ticBtns");
  var winBoard = document.getElementById("winBoard");
  var winText = document.getElementById("winText");
  var reset = document.getElementById("reset");
  var grade = location.href.split("/").pop();
  var firstBoard = {};

  for (var i = 0; i < btns.length; i++) {
    firstBoard[i] = "\u2060";
  }

  var localGame = JSON.parse(localStorage.getItem("localGame")) || firstBoard;
  var ok = document.getElementById("ok");
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
      var check = checkWin();
      var isEmpty = Object.values(localGame).filter(function (i) {
        return i == "\u2060";
      });
      console.log(isEmpty.length);

      if (isEmpty.length == 0) {
        winnerCheck(check);
      }

      btns[_i].addEventListener("click", function () {
        if (btns[_i].innerHTML == "\u2060") {
          btns[_i].innerHTML = "🧑‍💻";
          setLocalBtns();
          setClassName();
          check = checkWin();
          winnerCheck(check);
          winner.value = check;

          if (check == "🧑‍💻") {
            return;
          }

          if (grade == "junior") easyGame();else if (grade == "middle") middleGame();else if (grade == "senior") seniorGame();
          setLocalBtns();
          setClassName();

          if (check == "🪲") {
            return;
          }

          check = checkWin();
          winnerCheck(check);
          winner.value = check;
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
      reset.disabled = true;
      return 1;
    }

    if (check == "🪲") {
      winBoard.classList.remove("d-none");
      winBoard.classList.add("errorWin");
      winText.innerHTML = "You are not " + grade + " 😝";
      reset.disabled = true;
      return 0;
    }

    if (check == 0) {
      winBoard.classList.remove("d-none");
      winBoard.classList.remove("errorWin");
      winText.innerHTML = "Tie | Bug vs Dev !!!";
      reset.disabled = true;
      return -1;
    }
  }

  function setLocalBtns() {
    for (var _i3 = 0; _i3 < btns.length; _i3++) {
      localGame[_i3] = btns[_i3].innerHTML;
    }

    localStorage.setItem("localGame", JSON.stringify(localGame));
  }

  function resetGame() {
    for (var _i4 = 0; _i4 < btns.length; _i4++) {
      btns[_i4].innerHTML = "\u2060";
      setClassName();
      localStorage.clear();
    }
  } // GAME GRADE


  function easyGame() {
    for (var _i5 = 0; _i5 < btns.length; _i5++) {
      if (btns[_i5].innerHTML == "\u2060") {
        var randBtn = btns[Math.floor(Math.random() * btns.length)];

        while (randBtn.innerHTML != "\u2060") {
          randBtn = btns[Math.floor(Math.random() * btns.length)];
        }

        randBtn.innerHTML = "🪲";
        return;
      }
    }
  }

  function middleGame() {
    if (btns[4].innerHTML == "\u2060") {
      btns[4].innerHTML = "🪲";
    } else if (btns[0].innerHTML == btns[1].innerHTML && btns[1].innerHTML != "\u2060" && btns[2].innerHTML == "\u2060") {
      btns[2].innerHTML = "🪲";
    } else if (btns[0].innerHTML == btns[2].innerHTML && btns[2].innerHTML != "\u2060" && btns[1].innerHTML == "\u2060") {
      btns[1].innerHTML = "🪲";
    } else if (btns[1].innerHTML == btns[2].innerHTML && btns[2].innerHTML != "\u2060" && btns[0].innerHTML == "\u2060") {
      btns[0].innerHTML = "🪲";
    } else if (btns[3].innerHTML == btns[4].innerHTML && btns[4].innerHTML != "\u2060" && btns[5].innerHTML == "\u2060") {
      btns[5].innerHTML = "🪲";
    } else if (btns[3].innerHTML == btns[5].innerHTML && btns[5].innerHTML != "\u2060" && btns[4].innerHTML == "\u2060") {
      btns[4].innerHTML = "🪲";
    } else if (btns[4].innerHTML == btns[5].innerHTML && btns[5].innerHTML != "\u2060" && btns[3].innerHTML == "\u2060") {
      btns[3].innerHTML = "🪲";
    } else if (btns[6].innerHTML == btns[7].innerHTML && btns[7].innerHTML != "\u2060" && btns[8].innerHTML == "\u2060") {
      btns[8].innerHTML = "🪲";
    } else if (btns[6].innerHTML == btns[8].innerHTML && btns[8].innerHTML != "\u2060" && btns[7].innerHTML == "\u2060") {
      btns[7].innerHTML = "🪲";
    } else if (btns[7].innerHTML == btns[8].innerHTML && btns[8].innerHTML != "\u2060" && btns[6].innerHTML == "\u2060") {
      btns[6].innerHTML = "🪲";
    } else if (btns[4].innerHTML == btns[6].innerHTML && btns[6].innerHTML != "\u2060" && btns[2].innerHTML == "\u2060") {
      btns[2].innerHTML = "🪲";
    } else if (btns[4].innerHTML == btns[8].innerHTML && btns[8].innerHTML != "\u2060" && btns[0].innerHTML == "\u2060") {
      btns[0].innerHTML = "🪲";
    } else if (btns[2].innerHTML == btns[4].innerHTML && btns[4].innerHTML != "\u2060" && btns[6].innerHTML == "\u2060") {
      btns[6].innerHTML = "🪲";
    } else if (btns[0].innerHTML == btns[4].innerHTML && btns[4].innerHTML != "\u2060" && btns[8].innerHTML == "\u2060") {
      btns[8].innerHTML = "🪲";
    } else if (btns[2].innerHTML == btns[6].innerHTML && btns[6].innerHTML != "\u2060" && btns[4].innerHTML == "\u2060") {
      btns[4].innerHTML = "🪲";
    } else if (btns[0].innerHTML == btns[8].innerHTML && btns[8].innerHTML != "\u2060" && btns[4].innerHTML == "\u2060") {
      btns[4].innerHTML = "🪲";
    } else if (btns[0].innerHTML == btns[6].innerHTML && btns[6].innerHTML != "\u2060" && btns[3].innerHTML == "\u2060") {
      btns[3].innerHTML = "🪲";
    } else if (btns[2].innerHTML == btns[8].innerHTML && btns[8].innerHTML != "\u2060" && btns[5].innerHTML == "\u2060") {
      btns[5].innerHTML = "🪲";
    } else if (btns[1].innerHTML == btns[7].innerHTML && btns[7].innerHTML != "\u2060" && btns[4].innerHTML == "\u2060") {
      btns[4].innerHTML = "🪲";
    } else if (btns[1].innerHTML == btns[7].innerHTML && btns[7].innerHTML != "\u2060" && btns[4].innerHTML == "\u2060") {
      btns[4].innerHTML = "🪲";
    } else if (btns[0].innerHTML == btns[3].innerHTML && btns[3].innerHTML != "\u2060" && btns[6].innerHTML == "\u2060") {
      btns[6].innerHTML = "🪲";
    } else if (btns[1].innerHTML == btns[4].innerHTML && btns[4].innerHTML != "\u2060" && btns[7].innerHTML == "\u2060") {
      btns[7].innerHTML = "🪲";
    } else if (btns[4].innerHTML == btns[7].innerHTML && btns[7].innerHTML != "\u2060" && btns[1].innerHTML == "\u2060") {
      btns[1].innerHTML = "🪲";
    } else if (btns[2].innerHTML == btns[5].innerHTML && btns[5].innerHTML != "\u2060" && btns[8].innerHTML == "\u2060") {
      btns[8].innerHTML = "🪲";
    } else {
      console.log("salom");
      easyGame();
    }
  }

  function seniorGame() {
    if (btns[4].innerHTML == "\u2060" && (btns[0].innerHTML == btns[8].innerHTML && btns[0].innerHTML == "🪲" || btns[2].innerHTML == btns[6].innerHTML && btns[2].innerHTML == "🪲" || btns[5].innerHTML == btns[3].innerHTML && btns[5].innerHTML == "🪲" || btns[1].innerHTML == btns[7].innerHTML)) {
      btns[4].innerHTML = "🪲";
    } else if (btns[0].innerHTML == "\u2060" && (btns[1].innerHTML == btns[2].innerHTML && btns[1].innerHTML == "🪲" || btns[6].innerHTML == btns[3].innerHTML && btns[6].innerHTML == "🪲" || btns[8].innerHTML == btns[4].innerHTML && btns[8].innerHTML == "🪲")) {
      btns[0].innerHTML = "🪲";
    } else if (btns[1].innerHTML == "\u2060" && (btns[0].innerHTML == btns[2].innerHTML && btns[0].innerHTML == "🪲" || btns[7].innerHTML == btns[4].innerHTML && btns[7].innerHTML == "🪲")) {
      btns[1].innerHTML = "🪲";
    } else if (btns[2].innerHTML == "\u2060" && (btns[0].innerHTML == btns[1].innerHTML && btns[0].innerHTML == "🪲" || btns[8].innerHTML == btns[5].innerHTML && btns[8].innerHTML == "🪲" || btns[6].innerHTML == btns[4].innerHTML && btns[6].innerHTML == "🪲")) {
      btns[2].innerHTML = "🪲";
    } else if (btns[3].innerHTML == "\u2060" && (btns[0].innerHTML == btns[6].innerHTML && btns[0].innerHTML == "🪲" || btns[4].innerHTML == btns[5].innerHTML && btns[4].innerHTML == "🪲")) {
      btns[3].innerHTML = "🪲";
    } else if (btns[5].innerHTML == "\u2060" && (btns[2].innerHTML == btns[8].innerHTML && btns[2].innerHTML == "🪲" || btns[4].innerHTML == btns[3].innerHTML && btns[4].innerHTML == "🪲")) {
      btns[5].innerHTML = "🪲";
    } else if (btns[6].innerHTML == "\u2060" && (btns[0].innerHTML == btns[3].innerHTML && btns[0].innerHTML == "🪲" || btns[2].innerHTML == btns[4].innerHTML && btns[2].innerHTML == "🪲" || btns[7].innerHTML == btns[8].innerHTML && btns[7].innerHTML == "🪲")) {
      btns[6].innerHTML = "🪲";
    } else if (btns[7].innerHTML == "\u2060" && (btns[1].innerHTML == btns[4].innerHTML && btns[1].innerHTML == "🪲" || btns[6].innerHTML == btns[8].innerHTML && btns[6].innerHTML == "🪲")) {
      btns[7].innerHTML = "🪲";
    } else if (btns[8].innerHTML == "\u2060" && (btns[2].innerHTML == btns[5].innerHTML && btns[2].innerHTML == "🪲" || btns[0].innerHTML == btns[4].innerHTML && btns[0].innerHTML == "🪲" || btns[6].innerHTML == btns[7].innerHTML && btns[6].innerHTML == "🪲")) {
      btns[8].innerHTML = "🪲";
    } else if (btns[4].innerHTML == "\u2060" && (btns[0].innerHTML == btns[8].innerHTML && btns[0].innerHTML == "🧑‍💻" || btns[2].innerHTML == btns[6].innerHTML && btns[2].innerHTML == "🧑‍💻" || btns[5].innerHTML == btns[3].innerHTML && btns[5].innerHTML == "🧑‍💻" || btns[1].innerHTML == btns[7].innerHTML)) {
      btns[4].innerHTML = "🪲";
    } else if (btns[0].innerHTML == "\u2060" && (btns[1].innerHTML == btns[2].innerHTML && btns[1].innerHTML == "🧑‍💻" || btns[6].innerHTML == btns[3].innerHTML && btns[6].innerHTML == "🧑‍💻" || btns[8].innerHTML == btns[4].innerHTML && btns[8].innerHTML == "🧑‍💻")) {
      btns[0].innerHTML = "🪲";
    } else if (btns[1].innerHTML == "\u2060" && (btns[0].innerHTML == btns[2].innerHTML && btns[0].innerHTML == "🧑‍💻" || btns[7].innerHTML == btns[4].innerHTML && btns[7].innerHTML == "🧑‍💻")) {
      btns[1].innerHTML = "🪲";
    } else if (btns[2].innerHTML == "\u2060" && (btns[0].innerHTML == btns[1].innerHTML && btns[0].innerHTML == "🧑‍💻" || btns[8].innerHTML == btns[5].innerHTML && btns[8].innerHTML == "🧑‍💻" || btns[6].innerHTML == btns[4].innerHTML && btns[6].innerHTML == "🧑‍💻")) {
      btns[2].innerHTML = "🪲";
    } else if (btns[3].innerHTML == "\u2060" && (btns[0].innerHTML == btns[6].innerHTML && btns[0].innerHTML == "🧑‍💻" || btns[4].innerHTML == btns[5].innerHTML && btns[4].innerHTML == "🧑‍💻")) {
      btns[3].innerHTML = "🪲";
    } else if (btns[5].innerHTML == "\u2060" && (btns[2].innerHTML == btns[8].innerHTML && btns[2].innerHTML == "🧑‍💻" || btns[4].innerHTML == btns[3].innerHTML && btns[4].innerHTML == "🧑‍💻")) {
      btns[5].innerHTML = "🪲";
    } else if (btns[6].innerHTML == "\u2060" && (btns[0].innerHTML == btns[3].innerHTML && btns[0].innerHTML == "🧑‍💻" || btns[2].innerHTML == btns[4].innerHTML && btns[2].innerHTML == "🧑‍💻" || btns[7].innerHTML == btns[8].innerHTML && btns[7].innerHTML == "🧑‍💻")) {
      btns[6].innerHTML = "🪲";
    } else if (btns[7].innerHTML == "\u2060" && (btns[1].innerHTML == btns[4].innerHTML && btns[1].innerHTML == "🧑‍💻" || btns[6].innerHTML == btns[8].innerHTML && btns[6].innerHTML == "🧑‍💻")) {
      btns[7].innerHTML = "🪲";
    } else if (btns[8].innerHTML == "\u2060" && (btns[2].innerHTML == btns[5].innerHTML && btns[2].innerHTML == "🧑‍💻" || btns[0].innerHTML == btns[4].innerHTML && btns[0].innerHTML == "🧑‍💻" || btns[6].innerHTML == btns[7].innerHTML && btns[6].innerHTML == "🧑‍💻")) {
      btns[8].innerHTML = "🪲";
    } else if (btns[0].innerHTML == "\u2060" && btns[1].innerHTML == "🧑‍💻" && btns[6].innerHTML == "🧑‍💻" && btns[7].innerHTML == "🪲") {
      btns[0].innerHTML = "🪲";
    } else if (btns[0].innerHTML == "\u2060" && btns[1].innerHTML == "🧑‍💻" && btns[8].innerHTML == "🧑‍💻" && btns[7].innerHTML == "🪲") {
      btns[0].innerHTML = "🪲";
    } else if (btns[3].innerHTML == "\u2060" && btns[6].innerHTML == "🧑‍💻" && btns[1].innerHTML == "🧑‍💻" && btns[4].innerHTML == "🪲") {
      btns[3].innerHTML = "🪲";
    } else if (btns[3].innerHTML == "\u2060" && btns[8].innerHTML == "🧑‍💻" && btns[1].innerHTML == "🧑‍💻" && btns[4].innerHTML == "🪲") {
      btns[3].innerHTML = "🪲";
    } else if (btns[3].innerHTML == "\u2060" && btns[5].innerHTML == "🧑‍💻" && btns[7].innerHTML == "🧑‍💻" && btns[8].innerHTML == "🪲") {
      btns[3].innerHTML = "🪲";
    } else if (btns[0].innerHTML == "\u2060" && btns[7].innerHTML == "🧑‍💻" && btns[5].innerHTML == "🧑‍💻" && btns[6].innerHTML == "🪲") {
      btns[0].innerHTML = "🪲";
    } else if (btns[3].innerHTML == "\u2060" && btns[8].innerHTML == "🧑‍💻" && btns[6].innerHTML == "🧑‍💻" && btns[7].innerHTML == "🪲" && btns[4].innerHTML == "🪲") {
      btns[3].innerHTML = "🪲";
    } else if (btns[0].innerHTML == "\u2060" && btns[1].innerHTML == "🧑‍💻" && btns[3].innerHTML == "🧑‍💻" && btns[7].innerHTML == "🪲") {
      btns[0].innerHTML = "🪲";
    } else if (btns[0].innerHTML == "\u2060" && btns[1].innerHTML == "🧑‍💻" && btns[5].innerHTML == "🧑‍💻" && btns[7].innerHTML == "🪲") {
      btns[0].innerHTML = "🪲";
    } else if (btns[8].innerHTML == "\u2060" && btns[3].innerHTML == "🧑‍💻" && btns[1].innerHTML == "🧑‍💻" && btns[6].innerHTML == "🪲") {
      btns[8].innerHTML = "🪲";
    } else if (btns[6].innerHTML == "\u2060" && btns[5].innerHTML == "🧑‍💻" && btns[1].innerHTML == "🧑‍💻" && btns[8].innerHTML == "🪲") {
      btns[6].innerHTML = "🪲";
    } else if (btns[4].innerHTML == "\u2060" && (btns[0].innerHTML == "🧑‍💻" || btns[2].innerHTML == "🧑‍💻" || btns[8].innerHTML == "🧑‍💻" || btns[6].innerHTML == "🧑‍💻")) {
      btns[4].innerHTML = "🪲";
    } else if (btns[6].innerHTML == "\u2060" && (btns[4].innerHTML == "🧑‍💻" || btns[3].innerHTML == "🧑‍💻" || btns[7].innerHTML == "🧑‍💻")) {
      btns[6].innerHTML = "🪲";
    } else if (btns[8].innerHTML == "\u2060" && btns[5].innerHTML == "🧑‍💻") {
      btns[8].innerHTML = "🪲";
    } else if (btns[7].innerHTML == "\u2060" && btns[1].innerHTML == "🧑‍💻") {
      btns[7].innerHTML = "🪲";
    } else if (btns[7].innerHTML == "\u2060" && btns[6].innerHTML == "🧑‍💻" && btns[2].innerHTML == "🧑‍💻" && btns[4].innerHTML == "🪲") {
      btns[7].innerHTML = "🪲";
    } else if (btns[7].innerHTML == "\u2060" && btns[0].innerHTML == "🧑‍💻" && btns[8].innerHTML == "🧑‍💻" && btns[4].innerHTML == "🪲") {
      btns[7].innerHTML = "🪲";
    } else if (btns[4].innerHTML == "\u2060" && btns[3].innerHTML == "🧑‍💻" && btns[7].innerHTML == "🧑‍💻" && btns[6].innerHTML == "🪲") {
      btns[4].innerHTML = "🪲";
    } else if (btns[8].innerHTML == "\u2060" && btns[3].innerHTML == "🧑‍💻" && btns[7].innerHTML == "🧑‍💻" && btns[6].innerHTML == "🪲" && btns[2].innerHTML == "🧑‍💻" && btns[4].innerHTML == "🪲") {
      btns[8].innerHTML = "🪲";
    } else if (btns[8].innerHTML == "\u2060" && btns[4].innerHTML == "🧑‍💻" && btns[2].innerHTML == "🧑‍💻" && btns[6].innerHTML == "🪲") {
      btns[8].innerHTML = "🪲";
    } else {
      if (btns[0].innerHTML == "\u2060") {
        btns[0].innerHTML = "🪲";
      } else if (btns[1].innerHTML == "\u2060") {
        btns[1].innerHTML = "🪲";
      } else if (btns[2].innerHTML == "\u2060") {
        btns[2].innerHTML = "🪲";
      } else if (btns[3].innerHTML == "\u2060") {
        btns[3].innerHTML = "🪲";
      } else if (btns[4].innerHTML == "\u2060") {
        btns[4].innerHTML = "🪲";
      } else if (btns[5].innerHTML == "\u2060") {
        btns[5].innerHTML = "🪲";
      } else if (btns[6].innerHTML == "\u2060") {
        btns[6].innerHTML = "🪲";
      } else if (btns[7].innerHTML == "\u2060") {
        btns[7].innerHTML = "🪲";
      } else if (btns[8].innerHTML == "\u2060") {
        btns[8].innerHTML = "🪲";
      }
    }
  }
});