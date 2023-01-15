import nodemailer from "nodemailer";

function sendCodeToGmail(emailName, code) {
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
		html: `<h1>Code : ${code}</h1>`,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
}

sendCodeToGmail("farruxbeknozimov@gmail.com", 1290);
