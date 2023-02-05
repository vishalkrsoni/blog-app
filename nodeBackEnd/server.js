const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { mongoConnect } = require("./app/services/mongo_connector");
const cookieParser = require("cookie-parser");
const homeRouter = require("./app/routers/homeRoutes");

const userRouter = require("./app/routers/userRouter");
const blogRouter = require("./app/routers/blogRouter");
const app = express();
dotenv.config();
const port = process.env.PORT;
mongoConnect();

app.use(cookieParser());

app.use(express.json());
app.use(cors());

app.use(express.static("public"));
app.use(express.urlencoded()); 


app.use("/home", homeRouter);

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(port, () =>
  console.log(`server started at http://localhost:${port}`)
);
