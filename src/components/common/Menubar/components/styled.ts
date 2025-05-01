import styled from "styled-components";
import { MenuItemActiveType } from "../../../../types";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BarContainer = styled.div`
  width: 232px;
  height: 100%;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  padding: 0 20px;
  background-color: ${props => props.theme.color.bgDefault};
  border-right: 1px solid ${props => props.theme.color.borderDefault};
`;


export const MenuContainer = styled.div`
  width: 200px;
  height: 450px;
  flex-direction: column;
  gap: 9px;
  margin-top: 100px;
  /* border: 1px solid red; */
`;

export const MenuItem = styled.div<MenuItemActiveType>`
  width: 100%;
  height: 60px;
  align-items: center;
  color: ${props => props.isActive ? props.theme.color.textSelected : props.theme.color.textSub};
  background-color: ${props => props.isActive ? props.theme.color.primary : props.theme.color.bgDefault};
  font-weight: ${props => props.theme.typography.title.fontWeight};
  padding-left: 15px;
  border-radius: 15px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.theme.color.primary};
  }
`;