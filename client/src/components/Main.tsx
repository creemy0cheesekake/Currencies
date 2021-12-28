import React, { useState, useEffect } from "react";
import "../styles/Main.scss";
import { Logo } from "./Logo";
import { v4 as uuid } from "uuid";
import axios from "axios";

interface Props {}

interface Data {
	ticker: string;
	open: string;
	high: string;
	low: string;
	close: string;
	change: string;
}

const Main: React.FC<Props> = (props: Props) => {
	const [searchForCurrencyVal, setSearchForCurrencyVal] = useState("");
	const [currencyData, setCurrencyData] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					"http://localhost:3000/api/v1"
				);
				setCurrencyData(response.data);
			} catch (err) {
				alert(
					"Sorry, I'm broke and thus, I can't afford the paid version of this API, and so I've run out of calls to this API for the month. Please check again next month 😜"
				);
			}
		})();
	}, []);

	return (
		<div className="Main">
			<Logo />
			<div className="search-for-currencies-row">
				<input
					type="text"
					value={searchForCurrencyVal}
					maxLength={10}
					onChange={e =>
						setSearchForCurrencyVal(e.target.value.toUpperCase())
					}
				/>
				<button>Search</button>
			</div>
			{currencyData.length && (
				<div className="currencies-container">
					<div className="currencies">
						<div className="currency-row labels">
							<div>Ticker</div>
							<div>Open</div>
							<div>High</div>
							<div>Low</div>
							<div>Close</div>
							<div>Change</div>
						</div>
						{currencyData.map((data: Data) => (
							<div key={uuid()} className="currency-row">
								{Object.keys(data).map((key: string) => (
									<div
										className={
											key === "change"
												? data[
														key as keyof Data
												  ].charAt(0) === "+"
													? "positive-change"
													: data[
															key as keyof Data
													  ].charAt(0) === "0"
													? "zero-change"
													: "negative-change"
												: ""
										}
										key={uuid()}
									>
										{data[key as keyof Data]}
									</div>
								))}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Main;
