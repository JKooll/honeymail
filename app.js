"use strict";
const words = require("./words.json")
const nodemailer = require("nodemailer");

let idx = 0
let startDate = new Date("2022-4-4")

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.163.com",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'jkooll@163.com', // generated ethereal user
      pass: 'BWMALTECYOLIDDWT', // generated ethereal password
    },
  });

  let now = new Date().getTime()
  let days = Math.ceil((now - startDate) / (1000 * 3600 * 24))

  idx = idx % words.length

  let sentence = words[idx]
  let sentenceHtml = ""
  for (let word of sentence.split("|")) {
    sentenceHtml += "<div>" + word + "</div>"
  }

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"❤️" <jkooll@163.com>', // sender address
    to: "2870825294@qq.com", // list of receivers
    subject: "一封暖暖的小邮件", // Subject line
    text: "", // plain text body
    html: "今天是我们在一起的第" + days + "天" + sentenceHtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);