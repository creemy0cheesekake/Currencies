import React from "react";
import "../styles/Logo.scss";

interface Props {}

export const Logo = (props: Props) => {
	return (
		<div className="Logo">
			<h1>
				Forex<span>Aide</span>
			</h1>
		</div>
	);
};
