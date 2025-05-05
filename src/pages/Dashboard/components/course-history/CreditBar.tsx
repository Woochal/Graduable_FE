import React from "react";
import * as S from "../styled";
import type { CategoryHistoryType } from "../../../../types";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	type ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTheme } from "styled-components";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const CreditBar = ({ categoryData }: { categoryData: CategoryHistoryType }) => {
	const theme = useTheme();

	const { credit, maxCredit, isFinished, name } = categoryData;

	const options: ChartOptions<"bar"> = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
			// tooltip: {
			//   callbacks: {
			//     title: () => '남은 학점', // 제목 비우기
			//     label: () => `${maxCredit - credit} 학점`,
			//   },
			//   displayColors: false, // 색상 박스 숨기기
			// },
		},
		scales: {
			x: {
				display: false,
			},
			y: {
				display: false,
				min: 0,
				max: 1,
			},
		},
		maintainAspectRatio: false,
	};

	const data = {
		labels: [name],
		datasets: [
			{
				data: [credit / maxCredit],
				backgroundColor: `${isFinished ? theme.color.primary : theme.color.highlightGray}`,
				barThickness: 1000,
			},
		],
	};

	return (
		<S.CreditBarContainer>
			<Bar options={options} data={data} />
		</S.CreditBarContainer>
	);
};

export default CreditBar;
