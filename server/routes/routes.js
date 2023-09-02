"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers/controllers");
var router = express_1["default"].Router();
router.route("/").get(controllers_1.getCurrentData);
router.route("/:query").get(controllers_1.getDataFromSearch);
exports["default"] = router;
