import "./App.css";
import { RecoilRoot } from "recoil";
import { Routing } from "./router";

function App() {
	return (
		<>
			<RecoilRoot>
				<Routing />
			</RecoilRoot>
		</>
	);
}

export default App;
