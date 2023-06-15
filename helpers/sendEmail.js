const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, SEND_EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: SEND_EMAIL_FROM };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
