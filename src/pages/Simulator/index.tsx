import React from "react";
import * as S from "./components/styled";
import AddSemester from "./components/add-semester/AddSemester";
import GraduationSimulator from "./components/graduation-simulator/GraduationSimulator";

export default function Simulator() {
	return (
		<S.Container>
			<AddSemester />
			<GraduationSimulator />
		</S.Container>
	);
}
