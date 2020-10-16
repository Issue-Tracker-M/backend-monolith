import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
const { port, mongoURI } = require("../config/index");

const authRouter = require("../routes/authRouter");
const taskRouter = require("../routes/taskRouter");
const workspaceRouter = require("../routes/workspaceRouter");
const apiRouter = express.Router();
apiRouter.use("/auth", authRouter);
apiRouter.use("/tasks", taskRouter);
apiRouter.use("/workspaces", workspaceRouter);

const app = express();

app.set("port", port);
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use("/api", apiRouter);
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((conn) =>
    console.log(`MongoDB connection successful @: ${conn.connection.host}`)
  )
  .catch((err) => {
    console.log(process.env);
    console.error(err);
  });

app.get("/", (req, res) => {
  return res.status(200).json({ message: "API is up 🚀" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This URL can not be found" });
});

export default app;
