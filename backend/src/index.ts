import express from "express";
import cors from "cors";
import search from "./routes/Search";
import relation from "./routes/Related";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.SERVER_PORT) {
  console.log(" SERVER_PORT is not defined in .env file");
  process.exit(1);
}

const SERVER_PORT: number = parseInt(process.env.SERVER_PORT as string, 10);
const app = express();

app.use(cors());
app.use(express.json());

app.use("/search", search);
app.use("/relation", relation);

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}`);
});
