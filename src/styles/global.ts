import { createGlobalStyle, type DefaultTheme } from "styled-components";

const GlobalStyles = createGlobalStyle<{ theme: DefaultTheme }>`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100vh;
}

#root {
  width: 100%;
  height: 100%;
}

body {
  /* font-family: "Pretendard-Regular"; */
  /* overscroll-behavior-y: none; */
  box-sizing: border-box;
  overscroll-behavior-y: none;
  color: ${(props) => props.theme.color.textPrimary};
  background-color: ${(props) => props.theme.color.bgDefault};
}

div {
  display: flex;
}

`;

export default GlobalStyles;
