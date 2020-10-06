import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "API is up 🚀" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This URL can not be found" });
});

export default app;
