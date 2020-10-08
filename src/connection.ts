import mongoose from "mongoose";

const username = "admin";
const password = "bqAYSekLTQeWlMtr";

mongoose
  .connect(
    `mongodb+srv://${username}:${password}@cluster0.4rzgj.mongodb.net/<dbname>?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch(console.error);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(err);
});
db.once("open", function () {
  // we're connected!
  console.log("Connected");
});
