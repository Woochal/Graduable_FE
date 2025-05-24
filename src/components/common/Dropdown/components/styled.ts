import styled from "styled-components";
import type { MenuItemActiveType } from "../../../../types";

export const Container = styled.div<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.bgCard};
  padding-left: 1.25vw;
  border-radius: 10px;
  cursor: pointer;
  /* border: 1px solid ${(props) => props.theme.color.borderDefault}; */
`;

export const DropdownList = styled.div<{ width: string; visible: boolean }>`
  display: ${(props) => (props.visible ? "flex" : "none")};
  width: ${(props) => props.width};
  height: auto;
  max-height: 15.625vw;
  position: absolute;
  left: 0;
  top: 110%;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  overflow-y: scroll;
  background-color: ${(props) => props.theme.color.bgDefault};
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.color.textSub};
`;

export const DropdownItem = styled.div<{ isSelected: boolean }>`
  width: 100%;
  min-height: 2.344vw;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.typography.caption.fontSize};
  font-weight: ${(props) => props.theme.typography.contentBold.fontWeight};
  color: ${(props) => props.theme.color.textPrimary};
  background-color: ${(props) => (props.isSelected ? props.theme.color.bgCard : props.theme.color.bgDefault)};
  border-bottom: 1px solid ${(props) => props.theme.color.borderDefault};
  &:hover {
    background-color: ${(props) => props.theme.color.bgCard};
  }
`;

export const SelectedItem = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  font-size: ${(props) => props.theme.typography.subtitleb.fontSize};
  font-weight: ${(props) => props.theme.typography.subtitleb.fontWeight};
  color: ${(props) => props.theme.color.textPrimary};
`;

export const Placeholder = styled.div`
  font-size: ${(props) => props.theme.typography.subtitleb.fontSize};
  font-weight: ${(props) => props.theme.typography.subtitleb.fontWeight};
  color: ${(props) => props.theme.color.textSub};
`;

export const DropdownIcon = styled.div<{ isOpen: boolean }>`
  width: 2.188vw;
  height: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
 
  img {
    transform: ${(props) => (props.isOpen ? "rotate(0deg)" : "rotate(180deg)")};
    transform-origin: center center;
    transition: transform 0.3s ease;
  }
`;

export const Item = styled.div<MenuItemActiveType>`
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
    background-color: ${(props) => props.theme.color.primary};
    color: ${(props) => props.theme.color.textSelected};
  }
`;
