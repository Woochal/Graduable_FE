import { useTable, type Column } from "react-table";
import { Containers, TableContainer } from "./styled";
import type { SugangCheck } from "src/types/sugangcheck/sugangcheck";
import { useMemo } from "react";

interface CourseBoxProps {
	courseList: SugangCheck[];
}

export function CourseList({ courseList }: CourseBoxProps) {
	// 컬럼 정의를 타입에 맞게 수정
	const columns = useMemo<Column<SugangCheck>[]>(
		() => [
			{
				Header: "구분",
				accessor: "section", // 키가 실제 SugangCheck 타입과 일치해야 함
			},
			{
				Header: "연도-학기",
				accessor: "sectionYear",
			},
			{
				Header: "과목코드",
				accessor: "sectioncode",
			},
			{
				Header: "과목명",
				accessor: "sectionName",
			},
			{
				Header: "학점(설계)",
				accessor: "sectionCredit",
			},
			{
				Header: "성적",
				accessor: "sectiongrade",
			},
			{
				Header: "비고",
				accessor: "remark",
				Cell: ({ value }: { value: string | null }) =>
					value ? String(value) : "-",
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
									<th {...column.getHeaderProps()} key={`header-${i}-${j}`}>
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
									key={`empty-${col.accessor || i}`}
									style={{
										border: "none",
										borderRight:
											i < columns.length - 1 ? "1px solid #ffff" : "none",
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
