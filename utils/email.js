import nodemailer from "nodemailer";

function randomCode(min = 1000, max = 9999) {
	return Math.floor(Math.random() * (max - min)) + min;
}
function sendCodeToGmail(emailName, code, username) {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "biggame1707@gmail.com",
			pass: "qegcgkkbaqtyfejh",
		},
	});

	const mailOptions = {
		from: "biggame170@gmail.com",
		to: emailName,
		subject: "Confirmation Code",
		html: `<h1>Hello ${username} !!!<br>Confirmation code : ${code}</h1>`,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
}

export { sendCodeToGmail, randomCode };
