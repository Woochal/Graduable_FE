import React from "react";
import * as S from "./components/styled";
import CourseHistory from "./components/course-history/CourseHistory";
import Roadmap from "./components/roadmap/Roadmap";
import RemainingCredit from "./components/remaining-credit/RemainingCredit";
import { RemainingCreditType } from "../../types";


const DashboardPage = () => {
	
	return (
		<S.Container>
			<S.UpperContainer>
				<Roadmap />
				<RemainingCredit />
			</S.UpperContainer>
			<CourseHistory />
		</S.Container>
	);
}

export default DashboardPage;
