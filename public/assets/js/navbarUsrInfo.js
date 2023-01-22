window.addEventListener("load", () => {
	let navUser = document.getElementById("navUser");
	let navbarUsrInfoClose = document.getElementById("navbarUsrInfoClose");

	navUser.addEventListener("click", () => {
		document.getElementById("aboutUser").classList.toggle("d-none");
	});
	navbarUsrInfoClose.addEventListener("click", () => {
		document.getElementById("aboutUser").classList.add("d-none");
	});
});
