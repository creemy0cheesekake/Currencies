"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const routes_1 = __importDefault(require("./routes/routes"));
let cors = require("cors");
const path_1 = __importDefault(require("path"));
app.use(cors());
app.use("/api/v1", routes_1.default);
if (!process.env.NODE_ENV) {
    // === "production") {
    app.use(express_1.default.static("../client/build/"));
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "..", "client", "build", "index.html"));
    });
}
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});
