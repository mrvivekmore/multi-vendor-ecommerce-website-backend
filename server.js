const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT;

app.use("/api", require("./routes/authRoutes"));

app.get("/", (req, res) => res.send("My backend"));

app.listen(port, () => console.log(`Server is running on port ${port}`));
