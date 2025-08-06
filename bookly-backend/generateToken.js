// generate-token.js
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" // or your redirect URL
);

// Replace with your real account email
const SCOPE = ["binarytechs0011@gmail.com"];

const url = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPE,
});

console.log("Authorize this app by visiting this url:", url);
