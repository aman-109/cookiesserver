const express = require("express");

const cors=require("cors")
const connect = require("./config/db");
const cookieParser=require("cookie-parser")
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin:true,credentials:true}))
app.use(require("./routes"))

app.listen(8080, async () => {
  await connect();
  console.log("Listening to http://localhost:8080");
});
