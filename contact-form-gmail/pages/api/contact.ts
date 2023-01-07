import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

//  Next.jsでAPIを定義する際には、req、resは既に定義済みでありNextモジュールからNextApiRequest、NextApiResponseとして参照できる
export default function sendGamil(req: NextApiRequest, res: NextApiResponse) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.GMAILUSER,
      pass: process.env.GMAILPASSWORD,
    },
  });

  //管理人が受け取るメールの設定
  const toHostMailData = {
    from: req.body.email,
    to: "nakamura71@gmail.com",
    subject: `[お問合せ]${req.body.name}様より`,
    text: `${req.body.message} Sent from ${req.body.email}`,
    html: `
    <p>【名前】</p>
    <p>${req.body.name}</p>
    <p>【メールアドレス】</p>
    <p>${req.body.email}</p>
    <p>【内容】</p>
    <p>${req.body.message}</p>
    `
  };

  transporter.sendMail(toHostMailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}

