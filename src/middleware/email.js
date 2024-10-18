const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
function sendMail (){
    return new Promise((resolve,reject)=>{
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'bejaouiam25@gmail.com',
              pass: "deze ixwh pyng qmfx"

            }
          });
          
          var mailOptions = {
            from: 'bejaouiam25@gmail.com',
            to: 'gorelaahmed@gmail.com',
            subject: 'Your Destination has approved',
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <div style="width: 100%; color: white;background-color: black; hight:100px">
        <h4 style="text-align: center;">congratulation, your demand has approved, feel free to manage your restaurant
  </h4>
  <h4 style="text-align: center;">and thank you</h4>
        
        <button style="width: 200px;height: 50;background-color: orange;">Go BACK</button>
    </div>
    
</body>
</html>`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              return reject({message:"an error has occurd "})
            } else {
              console.log('Email sent: ' + info.response);
              return resolve({message:"Email sent correctly"})
            }
          });
    })
}
module.exports = sendMail