"use client";

import React from "react";

type ButtonProps = {
	onClick?: () => void;
	title: string;
};

const Button = ({ onClick, title }: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			className="bg-green-500 cursor-pointer hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
		>
			{title}
		</button>
	);
};

export default Button;
