import React, { useState, useEffect } from "react";
import "../styles/Main.scss";
import { Logo } from "./Logo";
import { v4 as uuid } from "uuid";
import Select from "react-select";
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

interface CurrencyDropdownOption {
	value: string;
	label: string;
}

const Main: React.FC<Props> = (props: Props) => {
	const [searchForCurrencyVal, setSearchForCurrencyVal] = useState("");
	const [selectedOption, setSelectedOption] =
		useState<CurrencyDropdownOption | null>();
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

	const currencyDropdownOptions: CurrencyDropdownOption[] = [
		{ value: "USD", label: "USD" },
		{ value: "CAD", label: "CAD" },
		{ value: "JPY", label: "JPY" },
	];
	return (
		<div className="Main">
			<Logo />
			<div className="search-for-currencies-row">
				<input
					type="text"
					value={searchForCurrencyVal}
					onChange={e => setSearchForCurrencyVal(e.target.value)}
				/>
				<button>Search</button>
				<Select
					isSearchable
					value={selectedOption}
					options={currencyDropdownOptions}
					onChange={(newOption: CurrencyDropdownOption | null) => {
						setSelectedOption(newOption);
					}}
				/>
			</div>
			{currencyData.length && (
				<div className="currencies-container">
					<div className="currencies">
						{currencyData.map((data: Data) => (
							<div key={uuid()} className="currency-row">
								{Object.keys(data).map((key: string) => (
									<div key={uuid()}>
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
