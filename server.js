// const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = require("./app");

mongoose
  .connect(
    "mongodb+srv://probirsarkar:xOEKveIFDK8fLpdX@cluster0.a3fbelw.mongodb.net/crypto?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB connection successful!");
  });
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
