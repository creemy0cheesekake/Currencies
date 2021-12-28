import express from "express";
const app = express();
import router from "./routes/routes";
let cors = require("cors");

app.use(cors());

app.use("/api/v1", router);

if (process.env.NODE_ENV === "production")
	app.use(express.static("../client/build/"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`app running on port ${PORT}`);
});
