const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

const APP_NAME = 'RHC Library Web App';

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  const email = user.email; // The email of the user.
  const displayName = user.displayName; // The display name of the user.

  return sendWelcomeEmail(email, displayName);
});

function sendWelcomeEmail(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email,
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text =
    `Hey ${displayName || 'there'}!\n\nWelcome to the ${APP_NAME}. \n\nYou may now borrow up to 3 books (for up to 90 days each) before you are required to return it to the library. \n\nAnother email will be sent to you once any of your books are due in 14 days. \n\n If you have any comments, feedback, or suggestions, please send an email to tehcheeyang@gmail.com. \n\nThank you for using this service!`;
  return mailTransport.sendMail(mailOptions).then(() => {
    return console.log('New welcome email sent to:', email);
  });
}


exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});
