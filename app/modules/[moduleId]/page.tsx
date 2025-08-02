"use client";
import { useParams } from "next/navigation";
import { lessons } from "@/constants/data/lessons";
import { modules } from "@/constants/data/modules";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ModulePage() {
	const { moduleId } = useParams();
	const module = modules.find(m => m.id === moduleId);
	const moduleLessons = lessons.filter(l => l.moduleId === moduleId);

	const [completedLessons, setCompletedLessons] = useState<string[]>([]);

	useEffect(() => {
		const completed = moduleLessons
			.filter(lesson => localStorage.getItem(lesson.id) === "completed")
			.map(lesson => lesson.id);
		setCompletedLessons(completed);
	}, [moduleId]);

	if (!module) return <div className="p-6">Module not found</div>;

	return (
		<div className="p-6 bg-black text-white min-h-screen">
			<h1 className="text-2xl font-bold mb-4">{module.title}</h1>
			<p className="mb-4 text-gray-400">{module.description}</p>

			{moduleLessons.map(lesson => {
				const isCompleted = completedLessons.includes(lesson.id);
				return (
					<Link key={lesson.id} href={`/lessons/${lesson.id}`}>
						<div className="p-4 border border-gray-700 rounded mb-2 hover:bg-gray-800 transition cursor-pointer flex justify-between">
							<span>{lesson.title}</span>
							<span
								className={`text-sm ${
									isCompleted ? "text-green-400" : "text-red-400"
								}`}
							>
								{isCompleted ? "Completed" : "Incomplete"}
							</span>
						</div>
					</Link>
				);
			})}
		</div>
	);
}
