import { createGlobalStyle, DefaultTheme } from "styled-components";

const GlobalStyles = createGlobalStyle<{ theme: DefaultTheme }>`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  width: 100%;
  height: 100%;
  /* font-family: "Pretendard-Regular"; */
  box-sizing: border-box;
  overscroll-behavior-y: none;
  color: ${props => props.theme.color.textPrimary};
  background-color: ${props => props.theme.color.bgDefault};
}


div {
  display:flex;
}


`;

export default GlobalStyles;
