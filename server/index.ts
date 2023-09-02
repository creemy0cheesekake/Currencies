import express from "express";
const app = express();
import router from "./routes/routes";
let cors = require("cors");

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});
app.use(cors({origin: true, credentials: true}));

app.use("/api/v1", router);

app.use(express.static("../client/build/"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`app running on port ${PORT}`);
});
