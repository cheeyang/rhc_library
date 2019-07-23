const functions = require("firebase-functions");

//initialize firestore with Admin SDK
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

const nodemailer = require("nodemailer");
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
// To view config, type firebase functions:config:get in the console.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

const APP_NAME = "RHC Library Web App";

exports.sendWelcomeEmail = functions.auth.user().onCreate(user => {
  const { email, displayName } = user;
  if (!email) {
    //if guest user
    return null;
  }
  console.log("Auth User Object Data :: ", user);
  return db
    .collection("users")
    .doc(user.uid)
    .get()
    .then(doc => {
      console.log("docSnapshot :: ", doc);
      console.log("docSnapshot.exists :: ", doc.exists);
      return doc.exists;
    })
    .then(userFound => {
      console.log("user found? :: ", userFound ? "yes" : "no");
      if (userFound) {
        //do nothing
        console.log("user found. doing nothing");
        return "";
      } else {
        db.collection("users")
          .doc(user.uid)
          .set({
            displayName,
            email,
            isAdmin: false,
            booksBorrowed: []
          });
        return sendWelcomeEmail(email, displayName);
      }
    });
});

function sendWelcomeEmail(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Hey ${displayName ||
    "there"}!\n\nWelcome to the ${APP_NAME}. \n\nYou may now borrow up to 3 books (for up to 90 days each) before you are required to return it to the library. \n\nAnother email will be sent to you once any of your books are due in 14 days. \n\n If you have any comments, feedback, or suggestions, please send an email to tehcheeyang@gmail.com. \n\nThank you for using this service!\n\nRegards,\nAdmin@RhcLibrary`;
  return mailTransport.sendMail(mailOptions).then(() => {
    return console.log("New welcome email sent to:", email);
  });
}

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
