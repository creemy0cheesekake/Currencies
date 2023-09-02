"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getDataFromSearch = exports.getCurrentData = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var axios_1 = __importDefault(require("axios"));
var IDS = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77";
var api_key = "&access_key=".concat(process.env.API_KEY);
var getCurrentData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, data, _i, data_1, currencyPair, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                response = [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, axios_1["default"].get("https://fcsapi.com/api-v3/forex/latest?id=" + IDS + api_key)];
            case 2: return [4 /*yield*/, (_a.sent()).data.response];
            case 3:
                data = _a.sent();
                for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                    currencyPair = data_1[_i];
                    response.push({
                        ticker: currencyPair.s,
                        open: currencyPair.o,
                        high: currencyPair.h,
                        low: currencyPair.l,
                        close: currencyPair.c,
                        change: currencyPair.cp
                    });
                }
                res.send(response);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                res.status(500).send({
                    msg: "Probably run out of API calls, sorry!",
                    error: error_1
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getCurrentData = getCurrentData;
var getDataFromSearch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var searchQuery_1, response, data1, _i, data1_1, currencyPair, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                searchQuery_1 = req.query.q.toUpperCase();
                response = [];
                return [4 /*yield*/, axios_1["default"].get("https://fcsapi.com/api-v3/forex/latest?id=" + IDS + api_key)];
            case 1: return [4 /*yield*/, (_a.sent()).data.response];
            case 2:
                data1 = _a.sent();
                for (_i = 0, data1_1 = data1; _i < data1_1.length; _i++) {
                    currencyPair = data1_1[_i];
                    response.push({
                        ticker: currencyPair.s,
                        open: currencyPair.o,
                        high: currencyPair.h,
                        low: currencyPair.l,
                        close: currencyPair.c,
                        change: currencyPair.cp
                    });
                }
                res.send(response.filter(function (el) { return el.ticker.includes(searchQuery_1); }));
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(400).send({
                    msg: "Bad Request" + error_2.message,
                    error: error_2
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getDataFromSearch = getDataFromSearch;
