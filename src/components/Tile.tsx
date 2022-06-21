import React from "react";

type TileProps = {
	letter: string;
	className?: string;
};

export default function Tile(props: TileProps) {
	const { letter, className } = props;
	return <div className={`tile ${className && className}`}>{letter}</div>;
}
