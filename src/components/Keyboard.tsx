import React, { MouseEvent } from "react";
import { FaBackspace } from "react-icons/fa";

type KeyboardProps = {
	onKeyClick: (char: string) => void;
};

export default function Keyboard(props: KeyboardProps) {
	const { onKeyClick } = props;

	const mouseClick = (event: MouseEvent) => {
		const char = event.currentTarget.textContent;
		if (char && char >= "A" && char <= "Z") {
			onKeyClick(char);
		} else if (char === "Enter") {
			onKeyClick(char.toLowerCase());
		} else onKeyClick("back");
	};

	return (
		<div className="keyboard">
			<div className="key-row-1">
				{"QWERTYUIOP".split("").map((char) => (
					<button key={char} onClick={mouseClick} className="key">
						{char}
					</button>
				))}
			</div>
			<div className="key-row-2">
				{"ASDFGHJKL".split("").map((char) => (
					<button key={char} onClick={mouseClick} className="key">
						{char}
					</button>
				))}
			</div>
			<div className="key-row-1">
				<button
					onClick={() => onKeyClick("enter")}
					className="key enter">
					Enter
				</button>
				{"ZXCVBNM".split("").map((char) => (
					<button key={char} onClick={mouseClick} className="key">
						{char}
					</button>
				))}
				<button
					onClick={() => onKeyClick("back")}
					className="key backspace">
					<FaBackspace height={"50px"} width={"50px"} />
				</button>
			</div>
		</div>
	);
}
