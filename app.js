const express = require("express")
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.text({ type: 'text/plain' }))
    // use the express-static middleware
app.use(express.static("public"))
const fs = require('fs');

var nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


const oauth2Client = new OAuth2(
    "735065219663-2uusr2db4rl1vgtpvk5osg6jt2s4485f.apps.googleusercontent.com", // ClientID
    "KtuMbld6f1GNgFaz2-QxsK0y", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
    refresh_token: "Your Refresh Token Here"
});
// const accessToken = oauth2Client.getAccessToken()

const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: "sinhviennamcuoivnua@gmail.com",
        clientId: "735065219663-2uusr2db4rl1vgtpvk5osg6jt2s4485f.apps.googleusercontent.com",
        clientSecret: "KtuMbld6f1GNgFaz2-QxsK0y",
        refreshToken: "1//04_vhrcMdf1dMCgYIARAAGAQSNwF-L9IrJCaTQFkZt-sBAvSi6OtUL_tKc_elgnCO0cp8AKAJdRnCAtc0B_AC17FKIrmJu5ypal0",
        accessToken: "ya29.a0Ae4lvC0RnOUltAW4_xJbWf_sS4EnqmzisxksnCMDfZyhNsYKPKthtzOdtl872OaybSresaopKY2Zuuaepkbw1CZlzke9K7KBt1y_b0fyWpQ2QA1oBJzENrgapWmI202x2hIEWyJ6wFJOQLx6gw3rYw2u8oVPulVsunY"
    }
});

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'sinhviennamcuoivnua@gmail.com',
//         pass: '97af321e11d6bebd3be1018bf050dc7def027a6952ba748ba1bb8e49b0037f7a '
//     }
// });

var mailOptions = {
    from: 'sinhviennamcuoivnua@gmail.com',
    to: 'soicodoc16101996@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};



// define the first route
app.get("/webhook", function(req, res) {
    smtpTransport.sendMail({
        from: 'sinhviennamcuoivnua@gmail.com',
        to: 'soicodoc16101996@gmail.com',
        subject: 'Sending Email using Node.js',
        text: req.body
    }, () => {
        console.log("haha");
    });
    res.send("<h1>Hello World!</h1>")
})




// start the server listening for requests
app.listen(process.env.PORT || 3001,
    () => console.log("Server is running..."));
