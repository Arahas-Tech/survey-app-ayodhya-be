const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes");
const touristFeedbackRouter = require("./routes/outsideFeedbackRoutes");
const residentFeedbackRouter = require("./routes/residentRouters/residentFeedbackRouters");
const adminRouter = require("./routes/adminRoutes");
const { gisSurvey } = require("./controller/gisSurveyController");


const app = express();
const PORT = process.env.port || 5000;
dotenv.config();
app.use(cookieParser());

try {
	// mongoose.connect("mongodb://localhost:27017/mydb");
	mongoose.connect(process.env.URI);
	console.log("connected");
} catch (err) {
	console.log("error connecting to db: ", err);
}

app.use(cors());
app.use(express.json());

app.use((_, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/surveyor", touristFeedbackRouter); //! surveyorRouter
app.use("/api/residents", residentFeedbackRouter);

app.listen(PORT, () => {
	console.log("Server is running");
});
