// require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, SEND_EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

// const email = {
//   to: "momeca8567@bodeem.com",
//   from: "yaroslavyu801@gmail.com",
//   subject: "test",
//   html: "<b>test sending</b>",
// };

// sgMail
//   .send(email)
//   .then(() => console.log("email send"))
//   .catch((e) => console.log(e.message));

const sendEmail = async (data) => {
  const email = { ...data, from: SEND_EMAIL_FROM };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
