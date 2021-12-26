import React, { useState } from "react";
import "../styles/Main.scss";
import { Logo } from "./Logo";
import { v4 as uuid } from "uuid";
import Select from "react-select";

interface Props {}

interface Data {
	ticker: string;
	price: number;
	change: number;
}

interface CurrencyDropdownOption {
	value: string;
	label: string;
}

const Main: React.FC<Props> = (props: Props) => {
	const [searchForCurrencyVal, setSearchForCurrencyVal] = useState("");
	const [selectedOption, setSelectedOption] =
		useState<CurrencyDropdownOption | null>();

	const mockData: Data[] = [
		{ ticker: "gbp", price: 123, change: 10 },
		{ ticker: "jpy", price: 834, change: 8 },
		{ ticker: "inr", price: 907, change: 253 },
		{ ticker: "jmd", price: 259, change: 234132 },
	];

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
			<div className="currencies-container">
				<div className="currencies">
					{mockData.map((data: Data) => (
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
		</div>
	);
};

export default Main;
