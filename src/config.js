import dotenv from "dotenv";

dotenv.config();
export default {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  sessionSecret: process.env.SESSIONSECRET,
  client_id_github: process.env.CLIENT_ID_GITHUB,
  client_secret_github: process.env.CLIENT_SECRET_GITHUB,
  gmail_user: process.env.GMAIL_USER,
  gmail_password: process.env.GMAIL_PASSWORD,
  environment: process.env.ENVIRONMENT,
};
