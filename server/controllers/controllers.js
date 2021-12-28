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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataFromSearch = exports.getCurrentData = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const axios_1 = __importDefault(require("axios"));
const IDS = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77";
const api_key = `&access_key=${process.env.API_KEY}`;
const getCurrentData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = [];
    try {
        const data = yield (yield axios_1.default.get("https://fcsapi.com/api-v3/forex/latest?id=" + IDS + api_key)).data.response;
        for (let currencyPair of data) {
            response.push({
                ticker: currencyPair.s,
                open: currencyPair.o,
                high: currencyPair.h,
                low: currencyPair.l,
                close: currencyPair.c,
                change: currencyPair.cp,
            });
        }
        res.send(response);
    }
    catch (error) {
        res.status(500).send({
            msg: "Probably run out of API calls, sorry!",
            error,
        });
    }
});
exports.getCurrentData = getCurrentData;
const getDataFromSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchQuery = req.query.q.toUpperCase();
        let response = [];
        const data1 = yield (yield axios_1.default.get("https://fcsapi.com/api-v3/forex/latest?id=" + IDS + api_key)).data.response;
        for (let currencyPair of data1) {
            response.push({
                ticker: currencyPair.s,
                open: currencyPair.o,
                high: currencyPair.h,
                low: currencyPair.l,
                close: currencyPair.c,
                change: currencyPair.cp,
            });
        }
        res.send(response.filter(el => el.ticker.includes(searchQuery)));
    }
    catch (error) {
        res.status(400).send({
            msg: "Bad Request",
            error,
        });
    }
});
exports.getDataFromSearch = getDataFromSearch;
