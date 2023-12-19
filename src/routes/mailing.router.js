import { Router } from "express";
import { transporter } from "../nodemailer.js";

const router = Router();

router.get("/", async (req, res) => {
  const message = {
    from: "gonzagalin777@gmail.com",
    to: "mikagonchi12@gmail.com",
    subject: "Thank you for shopping in our store",
    text: "Shortly, you will receive more information about your order!",
  };
  try {
    await transporter.sendMail(message);
    res.send("Mail sent correctly");
  } catch (error) {
    res.send("Error sending email");
  }
});

export default router;
