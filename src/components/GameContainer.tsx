import React, { useCallback, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import words from "../data/word-list.json";
import Keyboard from "./Keyboard";
import { Row, RowHandler } from "./Row";

const TOTAL_ROWS = 6;
const ROW_COLS = 5;
const WORD_SET = new Set(words);

export default function GameContainer() {
	const [focusedRowIndex, setFocusedRowIndex] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const [rowTexts, setRowTexts] = useState<string[]>(
		Array(TOTAL_ROWS).fill("")
	);
	const [WORD] = useState(
		words[Math.floor(Math.random() * (words.length + 1))].toUpperCase()
	);
	const rowHandler = useRef<RowHandler>(null);

	const onRowTextChange = useCallback((rowIndex: number, text: string) => {
		if (rowIndex < TOTAL_ROWS) {
			setRowTexts((prev) => {
				if (text.length <= ROW_COLS) {
					const newRows = [...prev];
					newRows[rowIndex] = text.toUpperCase();
					return newRows;
				}
				return prev;
			});
		}
		return;
	}, []);

	const onRowSubmit = useCallback(
		(rowIndex: number) => {
			if (rowIndex < TOTAL_ROWS) {
				const submittedText = rowTexts[rowIndex];

				if (rowTexts[rowIndex].length < ROW_COLS) {
					toast.warn("Not enough letters");
					return;
				}

				if (!WORD_SET.has(submittedText)) {
					toast.error("Invalid word!");
					rowHandler.current?.toggleRowClass("invalid-shake");

					setTimeout(() => {
						rowHandler.current?.toggleRowClass("invalid-shake");
					}, 350);
					return;
				}

				if (submittedText === WORD) {
					handleWin();
				} else if (focusedRowIndex + 1 >= TOTAL_ROWS) {
					handleLoss();
				}
				setFocusedRowIndex((prev) => prev + 1);
			}
			return;
		},
		[WORD, focusedRowIndex, rowTexts]
	);

	const handleWin = () => {
		toast.success("🎉🎉🎉 Congratulations! You've guessed correctly!", {
			autoClose: false,
			closeOnClick: false,
		});
		setGameOver(true);
	};

	const handleLoss = () => {
		toast("Better luck next  time", {
			autoClose: false,
			closeOnClick: false,
		});
		setGameOver(true);
	};

	const onKeyClick = useCallback(
		(char: string) => {
			if (char >= "A" && char <= "Z") {
				onRowTextChange(
					focusedRowIndex,
					rowTexts[focusedRowIndex] + char
				);
			} else if (char === "back") {
				onRowTextChange(
					focusedRowIndex,
					rowTexts[focusedRowIndex].slice(
						0,
						rowTexts[focusedRowIndex].length - 1
					)
				);
			} else if (char === "enter") {
				onRowSubmit(focusedRowIndex);
			}
		},
		[focusedRowIndex, onRowSubmit, onRowTextChange, rowTexts]
	);

	return (
		<div className="game-container">
			{rowTexts.map((_, rowIndex) => (
				<Row
					ref={focusedRowIndex === rowIndex ? rowHandler : null}
					key={rowIndex}
					rowText={rowTexts[rowIndex] ?? ""}
					rowIndex={rowIndex}
					submitted={rowIndex < focusedRowIndex}
					focusedRow={focusedRowIndex === rowIndex}
					onRowChange={onRowTextChange}
					originalWord={WORD}
					onRowSubmit={onRowSubmit}
					gameOver={gameOver}
				/>
			))}
			<Keyboard onKeyClick={onKeyClick} />
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar
				closeOnClick
				pauseOnHover={false}
				draggable
				theme="colored"
			/>
		</div>
	);
}
