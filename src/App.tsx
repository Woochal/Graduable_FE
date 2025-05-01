import "./App.css";
import { RecoilRoot } from "recoil";
import { Routing } from "./router";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import GlobalStyles from "./styles/global";

function App() {
	return (
		<>
			<RecoilRoot>
				<ThemeProvider theme={theme}>
					<GlobalStyles />
					<Routing />
				</ThemeProvider>
			</RecoilRoot>
		</>
	);
}

export default App;
