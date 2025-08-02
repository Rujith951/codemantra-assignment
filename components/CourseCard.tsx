"use client";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
	id: string;
	title: string;
	description: string;
	thumbnail: string;
};

export default function CourseCard({
	id,
	title,
	description,
	thumbnail,
}: Props) {
	const router = useRouter();

	return (
		<div
			onClick={() => router.push(`/courses/${id}`)}
			className="cursor-pointer bg-gray-900 hover:bg-gray-800 border border-gray-700 p-4 rounded-lg transition-shadow shadow hover:shadow-xl"
		>
			<img
				src={thumbnail}
				className="w-full h-40 object-cover rounded-md mb-4"
				alt={title}
			/>
			<h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
			<p className="text-gray-400 text-sm">{description}</p>
		</div>
	);
}
