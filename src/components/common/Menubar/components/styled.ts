import styled from "styled-components";
import type { MenuItemActiveType } from "../../../../types";

export const Container = styled.div`
  width: 18.125vw;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.color.borderDefault};
`;

export const BarContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.563vw 3.125vw 1.563vw;
  background-color: ${(props) => props.theme.color.bgDefault};
  border-right: 1px solid ${(props) => props.theme.color.borderDefault};
`;

export const MenuContainer = styled.div`
  width: 200px;
  height: 520px;
  flex-direction: column;
  gap: 1.563vw;
  margin-top: 100px;

  /* border: 1px solid red; */
`;

export const MenuItem = styled.div<MenuItemActiveType>`
  width: 100%;
  height: 60px;
  align-items: center;
  color: ${(props) => (props.isActive ? props.theme.color.textSelected : props.theme.color.textSub)};
  background-color: ${(props) => (props.isActive ? props.theme.color.primary : props.theme.color.bgDefault)};
  font-size: ${(props) => props.theme.typography.title.fontSize};
  font-weight: ${(props) => props.theme.typography.title.fontWeight};
  padding-left: 15px;
  border-radius: 15px;
  cursor: pointer;
  
  &:hover {
    background-color: ${(props) => props.isActive ? props.theme.color.primary : props.theme.color.bgCard};
    color: ${(props) => props.isActive ? props.theme.color.textSelected : props.theme.color.textSub};
  }
`;

export const UserInfo = styled.div`
  width: 100%;
  height: 3.125vw;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.div`
  width: 4.375vw;
  height: 100%;
  align-items: center;
  margin-right: 1.875vw;
  /* border: 1px solid red; */
`;

export const LogoImage = styled.img`
  width: 4.375vw;
  /* height: 100%; */
  object-fit: cover;
`;

export const UserName = styled.div`
  width: 4.375vw;
  height: 100%;
  align-items: center;
  font-size: ${(props) => props.theme.typography.title.fontSize};
  font-weight: ${(props) => props.theme.typography.title.fontWeight};
`;

