import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv'
dotenv.config()


const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Madiso",
};

export {sender, mailtrapClient}