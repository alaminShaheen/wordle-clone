import React from "react";
import GameContainer from "./components/GameContainer";
import "./App.css";

function App() {
	return (
		<div className="App">
			<header className="header">
				<p>Wordle</p>
			</header>
			<GameContainer />
		</div>
	);
}

export default App;
