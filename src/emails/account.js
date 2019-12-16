const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: "alireza.vahidi1@gmail.com",
		subject: "Thanks for joining!",
		text: `Welcome to the app, ${name}. Let me know about the app.`
	});
};

const sendCancelationEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: "alireza.vahidi1@gmail.com",
		subject: "Cancelation Email from Task manager App",
		text: `We are sorry for losing you, ${name}.`
	});
};

module.exports = {
	sendWelcomeEmail,
	sendCancelationEmail
};
