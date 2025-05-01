import React from "react";
import Layout from "../Layout";
import DashboardPage from "../pages/Dashboard";
import RoadmapPage from "../pages/Roadmap";
import CourseHistoryPage from "../pages/CourseHistory";
import SimulatorPage from "../pages/Simulator";
import CourseHandbookPage from "../pages/CourseHandbook";
import CurriculumPage from "../pages/Curriculum";
import MyPage from "../pages/MyPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export const Routing = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />} >
					<Route index element={<DashboardPage />} />
					<Route path="/roadmap" element={<RoadmapPage />} />
					<Route path="/history" element={<CourseHistoryPage />} />
					<Route path="/simulator" element={<SimulatorPage />} />
					<Route path="/handbook" element={<CourseHandbookPage />} />
					<Route path="/curriculum" element={<CurriculumPage />} />
					<Route path="/mypage" element={<MyPage />} />
				</Route>
			</Routes>
		</Router>
	);
};
