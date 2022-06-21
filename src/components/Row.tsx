import {
	ChangeEvent,
	FormEvent,
	forwardRef,
	Ref,
	useEffect,
	useImperativeHandle,
	useRef,
} from "react";
import Tile from "./Tile";

type RowProps = {
	rowText: string;
	onRowChange: (rowIndex: number, text: string) => void;
	rowIndex: number;
	focusedRow: boolean;
	submitted: boolean;
	originalWord: string;
	onRowSubmit: (rowIndex: number) => void;
	gameOver: boolean;
	focussedRowClass: string;
};

export type RowHandler = {
	toggleRowClass: (className: string) => void;
};

export const Row = forwardRef((props: RowProps, ref: Ref<RowHandler>) => {
	const {
		rowText,
		onRowChange,
		rowIndex,
		focusedRow,
		originalWord,
		onRowSubmit,
		submitted,
		gameOver,
	} = props;

	const inputRef = useRef<HTMLInputElement>(null);
	const rowRef = useRef<HTMLDivElement>(null);

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		onRowChange(rowIndex, event.target.value);
	};

	const onBlur = () => {
		setTimeout(() => {
			if (inputRef.current && focusedRow) {
				inputRef.current.focus();
			}
		}, 0);
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onRowSubmit(rowIndex);
	};

	const getClassName = (textIndex: number) => {
		if (submitted) {
			if (originalWord[textIndex] === rowText[textIndex]) {
				return "correct";
			} else if (originalWord.includes(rowText[textIndex])) {
				return "present";
			} else if (!originalWord.includes(rowText[textIndex])) {
				return "absent";
			}
		}
		return "";
	};

	useImperativeHandle(
		ref,
		() => ({
			toggleRowClass: (className: string) => {
				if (focusedRow && rowRef.current) {
					console.log(className);
					rowRef.current.classList.toggle(className);
				}
			},
		}),
		[focusedRow]
	);

	useEffect(() => {
		if (focusedRow && inputRef.current) {
			inputRef.current.focus();
		}
	}, [focusedRow]);

	return (
		<div className="row" ref={rowRef}>
			{Array(5)
				.fill(0)
				.map((_, colIndex) => (
					<Tile
						key={colIndex}
						className={getClassName(colIndex)}
						letter={rowText?.[colIndex] ?? ""}
					/>
				))}
			{!gameOver && (
				<form onSubmit={onSubmit}>
					<input
						disabled={gameOver}
						className={`row-input`}
						onBlur={onBlur}
						ref={inputRef}
						autoFocus={focusedRow}
						value={rowText}
						onChange={onChange}
					/>
				</form>
			)}
		</div>
	);
});
