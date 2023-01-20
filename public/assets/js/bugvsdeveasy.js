window.addEventListener("DOMContentLoaded", function () {
	let XorO = document.getElementById("win");
	let Result = document.getElementById("winner");
	let btns = document.getElementsByClassName("ticBtns");
	let winBoard = document.getElementById("winBoard");
	let winText = document.getElementById("winText");
	let reset = document.getElementById("reset");
	let grade = location.href.split("/").pop();
	let sanoq = 0;
	let firstBoard = {};
	for (let i = 0; i < btns.length; i++) firstBoard[i] = "\u2060";
	let localGame = JSON.parse(localStorage.getItem("localGame")) || firstBoard;

	playGame();
	ok.addEventListener("click", () => {
		resetGame();
		winBoard.classList.add("d-none");
	});
	function playGame() {
		reset.addEventListener("click", () => {
			resetGame();
		});
		setClassName();
		for (let i = 0; i < btns.length; i++) {
			btns[i].innerHTML = localGame[i];
			setClassName();
			console.log(Object.values(localGame).filter(Boolean));
			if (localGame) {
				console.log("sa");
				let check = checkWin();
				winnerCheck(check);
			}
			btns[i].addEventListener("click", () => {
				if (btns[i].innerHTML == "\u2060") {
					btns[i].innerHTML = "🧑‍💻";
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
		}
	}
	function setClassName() {
		for (let i = 0; i < btns.length; i++) {
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
		for (let i = 0; i < btns.length; i++) {
			if (btns[i].innerHTML == "\u2060") {
				let randBtn = btns[Math.floor(Math.random() * btns.length)];
				while (randBtn.innerHTML != "\u2060") {
					randBtn = btns[Math.floor(Math.random() * btns.length)];
				}
				randBtn.innerHTML = "🪲";
				return;
			}
		}
	}
	function checkWin() {
		if (
			btns[0].innerHTML == btns[1].innerHTML &&
			btns[1].innerHTML == btns[2].innerHTML &&
			btns[2].innerHTML != "\u2060"
		) {
			return btns[2].innerHTML;
		} else if (
			btns[3].innerHTML == btns[4].innerHTML &&
			btns[4].innerHTML == btns[5].innerHTML &&
			btns[5].innerHTML != "\u2060"
		) {
			return btns[5].innerHTML;
		} else if (
			btns[6].innerHTML == btns[7].innerHTML &&
			btns[7].innerHTML == btns[8].innerHTML &&
			btns[8].innerHTML != "\u2060"
		) {
			return btns[8].innerHTML;
		} else if (
			btns[0].innerHTML == btns[3].innerHTML &&
			btns[3].innerHTML == btns[6].innerHTML &&
			btns[6].innerHTML != "\u2060"
		) {
			return btns[6].innerHTML;
		} else if (
			btns[1].innerHTML == btns[4].innerHTML &&
			btns[4].innerHTML == btns[7].innerHTML &&
			btns[7].innerHTML != "\u2060"
		) {
			return btns[7].innerHTML;
		} else if (
			btns[2].innerHTML == btns[5].innerHTML &&
			btns[5].innerHTML == btns[8].innerHTML &&
			btns[8].innerHTML != "\u2060"
		) {
			return btns[8].innerHTML;
		} else if (
			btns[0].innerHTML == btns[4].innerHTML &&
			btns[4].innerHTML == btns[8].innerHTML &&
			btns[8].innerHTML != "\u2060"
		) {
			return btns[8].innerHTML;
		} else if (
			btns[2].innerHTML == btns[4].innerHTML &&
			btns[4].innerHTML == btns[6].innerHTML &&
			btns[6].innerHTML != "\u2060"
		) {
			return btns[6].innerHTML;
		} else if (
			btns[0].innerHTML != "\u2060" &&
			btns[1].innerHTML != "\u2060" &&
			btns[2].innerHTML != "\u2060" &&
			btns[3].innerHTML != "\u2060" &&
			btns[4].innerHTML != "\u2060" &&
			btns[5].innerHTML != "\u2060" &&
			btns[6].innerHTML != "\u2060" &&
			btns[7].innerHTML != "\u2060" &&
			btns[8].innerHTML != "\u2060"
		) {
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
		for (let i = 0; i < btns.length; i++) {
			localGame[i] = btns[i].innerHTML;
		}
		localStorage.setItem("localGame", JSON.stringify(localGame));
	}
	function resetGame() {
		for (let i = 0; i < btns.length; i++) {
			btns[i].innerHTML = "\u2060";
			setClassName();
			localStorage.clear();
			location.reload();
		}
	}
});
