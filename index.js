const express = require(`express`);
const { connectMongoDb } = require("./connection");
const { logReqRes } = require("./middelwares");

const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;


// connetion 
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-01").then(()=> console.log("MongoDb connected!"));

// Middelware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// ROUTES
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`server started at this PORT ${PORT}`));



