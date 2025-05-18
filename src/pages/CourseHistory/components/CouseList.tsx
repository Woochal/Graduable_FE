// CourseList.tsx 수정
import { useTable, type Column } from "react-table";
import { Containers, TableContainer } from "./styled";
import type { SugangCheck } from "../../../types/sugangcheck/sugangcheck";
import { useMemo } from "react";

interface CourseBoxProps {
	courseList: SugangCheck[];
}

// 분류명 매핑 함수
// CourseList.tsx의 매핑 함수 수정
// 분류명 매핑 함수
const getDisplayClassification = (classification: string): string => {
	// 교양 관련 분류
	if (
		[
			"자유선택(교양)",
			"전문교양",
			"실무영어",
			"신앙및세계관",
			"인성및리더십",
			"BSM",
			"ICT융합기초",
		].includes(classification)
	) {
		return "교양";
	}
	// 전공 관련 분류
	if (["전공주제(AI컴퓨터심화)"].includes(classification)) {
		return "전공";
	}
	// 그 외의 경우 원래 분류명 반환
	return classification;
};

// 이수구분 매핑 함수
const getDisplayCategory = (category: string): string => {
	// 이수구분도 간결하게 표시하고 싶다면 여기에 매핑 로직 추가
	return category;
};

export function CourseList({ courseList }: CourseBoxProps) {
	// 컬럼 정의를 새로운 SugangCheck 타입에 맞게 수정
	const columns = useMemo<Column<SugangCheck>[]>(
		() => [
			{
				Header: "구분",
				accessor: "classification",
				width: "13%",
				Cell: ({ value }: { value: string }) => {
					// 화면에 표시할 때는 간결한 이름으로 변환
					return getDisplayClassification(value);
				},
			},
			{
				Header: "연도-학기",
				accessor: "yearAndSemesterCourseTaken",
				width: "10%",
			},
			{
				Header: "과목명",
				accessor: "courseName",
				width: "28%",
			},
			{
				Header: "이수구분",
				accessor: "category",
				width: "10%",
				Cell: ({ value }: { value: string }) => {
					// 필요하다면 이수구분도 간결하게 표시
					return getDisplayCategory(value);
				},
			},
			{
				Header: "학점(설계)",
				accessor: "credit",
				width: "10%",
				Cell: ({ value, row }: { value: number; row: any }) => {
					const designCredit = row.original.designCredit;

					// 설계학점이 있는 경우 "학점(설계학점)" 형태로 표시
					if (designCredit && designCredit > 0) {
						return `${value}(${designCredit})`;
					}

					// 설계학점이 없는 경우 학점만 표시
					return `${value}`;
				},
			},
			{
				Header: "성적",
				accessor: "grade",
				width: "7%",
			},
			{
				Header: "비고",
				accessor: "subjectNote",
				width: "13%",
				Cell: ({ value, row }: { value: string | null; row: any }) => {
					if (!value) return "-";

					// 설계학점과 재이수 표시 제거 (이미 별도 컬럼으로 표시함)
					let noteText = value;
					noteText = noteText.replace(/\(설계\)\(?(\d+)\)?/, "").trim();

					return noteText || "-";
				},
			},
		],
		[],
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data: courseList });

	return (
		<Containers>
			<TableContainer>
				<table {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup, i) => (
							<tr
								{...headerGroup.getHeaderGroupProps()}
								key={`header-group-${i}`}
							>
								{headerGroup.headers.map((column, j) => (
									<th
										{...column.getHeaderProps()}
										key={`header-${i}-${j}`}
										style={{ width: column.width }}
									>
										{column.render("Header")}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map((row, i) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()} key={`row-${i}`}>
									{row.cells.map((cell, j) => (
										<td {...cell.getCellProps()} key={`cell-${i}-${j}`}>
											{cell.render("Cell")}
										</td>
									))}
								</tr>
							);
						})}
						{/* 가상 행 추가 - 항상 있지만 보이지 않음 */}
						<tr className="empty-row" style={{ height: "100%" }}>
							{columns.map((col, i) => (
								<td
									key={`empty-${col.accessor?.toString() || i}`}
									style={{
										border: "none",
										borderRight:
											i < columns.length - 1 ? "1px solid #6C6C72" : "none",
									}}
								/>
							))}
						</tr>
					</tbody>
				</table>
			</TableContainer>
		</Containers>
	);
}
