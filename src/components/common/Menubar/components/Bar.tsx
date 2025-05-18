import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./styled";
import MenuItem from "./MenuItem";
import type { MenuItemType } from "../../../../types";
import logo from "../../../../assets/Logo.png";
import axios from "axios";
import { get } from "http";
const Bar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [name, setName] = React.useState<string>("");

	const menuItems: MenuItemType[] = [
		{ name: "대시보드", path: "/" },
		{ name: "학기별 로드맵", path: "/roadmap" },
		{ name: "수강내역 확인", path: "/history" },
		{ name: "졸업심사 시뮬레이터", path: "/simulator" },
		{ name: "현 학기 수강편람", path: "/handbook" },
		{ name: "이수체계도", path: "/curriculum" },
		{ name: "마이페이지", path: "/mypage" },
	];
	useEffect(() => {
		const getUsername = async () => {
			const response = await axios.get("/api/courseList");
			setName(response.data.userName);
		};
		getUsername();
	}, []);

	return (
		<S.BarContainer>
			<S.MenuContainer>
				{menuItems.map((menu) => (
					<MenuItem
						key={menu.path}
						isActive={location.pathname === menu.path}
						onClick={() => navigate(menu.path)}
					>
						{menu.name}
					</MenuItem>
				))}
			</S.MenuContainer>
			<S.UserInfo>
				<S.Logo>
					<S.LogoImage src={logo} alt="logo" />
				</S.Logo>
				<S.UserName>{name}</S.UserName>
			</S.UserInfo>
		</S.BarContainer>
	);
};

export default Bar;
