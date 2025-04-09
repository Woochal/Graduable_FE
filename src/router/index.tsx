import React from "react";
import Home from "../components/First";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export const Routing = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</Router>
	);
};
