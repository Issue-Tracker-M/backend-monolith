require("dotenv").config();

export const port = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET || "bloop";
const NODE_ENV = process.env.NODE_ENV || "dev";
const { DB_CONNECTION, DB_CONNECTION_TEST } = process.env;
export let mongoURI = "";

if (NODE_ENV === "test" && DB_CONNECTION_TEST) {
  mongoURI = DB_CONNECTION_TEST;
} else if (DB_CONNECTION) {
  mongoURI = DB_CONNECTION;
}
