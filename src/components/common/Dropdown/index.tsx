import React, { useState, useRef, useEffect } from "react";
import * as S from "./components/styled";
import DropdownIcon from "../../../assets/DropdownArrow.png";

export default function Dropdown<T>({
	data,
	selectedData,
	setSelectedData,
	valueKey, // 데이터가 객체인 경우, 요소 중 값으로 사용할 키
	labelKey, // 데이터가 객체인 경우, 요소 중 표시할 레이블로 사용할 키
	placeholder = "선택",
	width = "7.813vw",
	height = "4.688vw",
}: {
	data: T[];
	selectedData: T | null;
	setSelectedData: (data: T) => void;
	valueKey?: keyof T;
	labelKey?: keyof T;
	placeholder?: string;
	width?: string;
	height?: string;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// 외부 클릭 감지를 위한 이벤트 리스너
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		// 이벤트 리스너 등록
		document.addEventListener("mousedown", handleClickOutside);

		// 컴포넌트 언마운트 시 이벤트 리스너 제거
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// 객체에서 value로 사용할 키를 지정
	const getValue = (item: T): string => {
		if (valueKey && typeof item === "object" && item !== null) {
			return String(item[valueKey]);
		}
		return String(item);
	};

	// 객체에서 표시할 레이블로 사용할 키를 지정
	const getLabel = (item: T): string => {
		if (labelKey && typeof item === "object" && item !== null) {
			return String(item[labelKey]);
		}
		return String(item);
	};

	return (
		<S.Container
			width={width}
			height={height}
			onClick={() => setIsOpen(!isOpen)}
			ref={dropdownRef}
		>
			<S.SelectedItem>
				{selectedData ? (
					getLabel(selectedData)
				) : (
					<S.Placeholder>{placeholder}</S.Placeholder>
				)}
				<S.DropdownIcon isOpen={isOpen}>
					<img src={DropdownIcon} alt="DropdownIcon" />
				</S.DropdownIcon>
			</S.SelectedItem>
			<S.DropdownList width={width} visible={isOpen}>
				{data.map((item) => (
					<S.DropdownItem
						key={getValue(item)}
						isSelected={selectedData === item}
						onClick={(e) => {
							e.stopPropagation(); // 이벤트 버블링 방지
							setSelectedData(item);
							setIsOpen(false);
						}}
					>
						{getLabel(item)}
					</S.DropdownItem>
				))}
			</S.DropdownList>
		</S.Container>
	);
}