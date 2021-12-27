import express from "express";
const app = express();
import router from "./routes/routes";
let cors = require("cors");

app.use(cors());

app.use("/api/v1", router);

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`app running on port ${PORT}`);
});
