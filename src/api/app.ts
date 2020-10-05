import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

export default app;
