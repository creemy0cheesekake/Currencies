import React, { useState, useEffect, createRef } from "react";
import "../styles/Main.scss";
import { Logo } from "./Logo";
import { v4 as uuid } from "uuid";
import axios from "axios";

interface Data {
	ticker: string;
	open: string;
	high: string;
	low: string;
	close: string;
	change: string;
}

const Main: React.FC = () => {
	const [searchForCurrencyVal, setSearchForCurrencyVal] = useState("");
	const [currencyData, setCurrencyData] = useState<Data[]>([]);
	const [loading, setLoading] = useState(true);

	const searchBoxRef = createRef<HTMLInputElement>();

	const handleSubmitSearch = async () => {
		try {
			setLoading(true);
			const searchQuery = searchBoxRef.current!.value;
			const response = await axios.get(
				"http://localhost:3000/api/v1/search?q=" + searchQuery
			);
			setCurrencyData(response.data);
		} catch (err) {
			alert("error: " + err);
		}
		setLoading(false);
	};

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					"http://localhost:3000/api/v1"
				);
				setCurrencyData(response.data);
			} catch (err) {
				alert(
					"Sorry, I'm broke and thus, I can't afford the paid version of this API, and so I've run out of calls to this API for the month. Try refreshing the page, if that doesn't work, please check again next month 😜"
				);
			}
			setLoading(false);
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
					ref={searchBoxRef}
					onKeyPress={e => e.key === "Enter" && handleSubmitSearch()}
					onFocus={() => {
						// used 'setSelectionRange()' instead of '.select()' due to compatibility issues on Safari Mobile
						searchBoxRef.current!.setSelectionRange(0, 20);
					}}
					onChange={e =>
						setSearchForCurrencyVal(e.target.value.toUpperCase())
					}
				/>
				<button onClick={handleSubmitSearch}>Search</button>
			</div>
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
					{!!currencyData.length && (
						<>
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
						</>
					)}
				</div>
			</div>
			{!(currencyData.length || loading) && (
				<div className="search-status-messages err">
					<p>No Results Found</p>
				</div>
			)}
			{loading && (
				<div className="search-status-messages neutral">
					<p>Loading...</p>
				</div>
			)}
		</div>
	);
};

export default Main;
