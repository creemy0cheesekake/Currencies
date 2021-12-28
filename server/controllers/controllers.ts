import dotenv from "dotenv";
dotenv.config();
import express from "express";
import axios from "axios";

const IDS =
	"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77";

interface Data {
	ticker: string;
	open: string;
	high: string;
	low: string;
	close: string;
	change: string;
}

const api_key = `&access_key=${process.env.API_KEY}`;

const getCurrentData = async (req: express.Request, res: express.Response) => {
	let response: Data[] = [];
	try {
		const data = await (
			await axios.get(
				"https://fcsapi.com/api-v3/forex/latest?id=" + IDS + api_key
			)
		).data.response;
		for (let currencyPair of data) {
			response.push(<Data>{
				ticker: currencyPair.s,
				open: currencyPair.o,
				high: currencyPair.h,
				low: currencyPair.l,
				close: currencyPair.c,
				change: currencyPair.cp,
			});
		}

		res.send(response);
	} catch (error: any) {
		res.status(500).send({
			msg: "Probably run out of API calls, sorry!",
			error,
		});
	}
};

const getDataFromSearch = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const searchQuery = (<string>req.query.q).toUpperCase();
		let response: Data[] = [];
		const data1 = await (
			await axios.get(
				"https://fcsapi.com/api-v3/forex/latest?id=" + IDS + api_key
			)
		).data.response;
		for (let currencyPair of data1) {
			response.push(<Data>{
				ticker: currencyPair.s,
				open: currencyPair.o,
				high: currencyPair.h,
				low: currencyPair.l,
				close: currencyPair.c,
				change: currencyPair.cp,
			});
		}
		res.send(response.filter(el => el.ticker.includes(searchQuery)));
	} catch (error: any) {
		res.status(400).send({
			msg: "Bad Request" + error.message,
			error,
		});
	}
};

export { getCurrentData };
export { getDataFromSearch };
