const express = require("express");
const mongoose = require("mongoose");
const router = require("./Server/Routes/index");
const cors = require("cors");
const app = express();
const PORT = 6969;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//API Routes
require("./Server/Routes")(app);

app.get("/home", (req, res) => {
  res.send("Hello World");
});

//Mongoose

async function main() {
  const uri =
    "mongodb+srv://pratik_talreja:<password>@cluster0.cxhwh.mongodb.net/Test2NotesDatabase?retryWrites=true&w=majority";
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .catch((error) => {
      console.log(error);
    });

  try {
    //Connecting to DB
    await mongoose.connection.once("open", function () {
      console.log("connected");
    });

    await mongoose.connection.on("error", (err) => {
      console.log(err);
    });
  } finally {
  }
}

main();

//create a server object:
app.listen(PORT, function () {
  console.log(`Connected : ${PORT}`);
});
