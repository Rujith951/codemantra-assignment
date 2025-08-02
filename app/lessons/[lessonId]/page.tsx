"use client";

import { useEffect, useRef } from "react";
import YouTube from "react-youtube";
import ReactMarkdown from "react-markdown";
import { useParams } from "next/navigation";
import { lessons } from "@/constants/data/lessons";
import { useAppContext } from "@/contexts/AppContext";
import Button from "@/components/Button";

export default function LessonPage() {
	const { lessonId } = useParams();
	const lesson = lessons.find(l => l.id === lessonId);

	const { markLessonComplete } = useAppContext();
	const markedRef = useRef(false);

	useEffect(() => {
		if (!lesson || lesson.type === "VIDEO") return;

		if (!markedRef.current) {
			markLessonComplete(lesson.id);
			markedRef.current = true;
		}
	}, [lesson]);

	const handleVideoEnd = () => {
		if (lesson && !markedRef.current) {
			markLessonComplete(lesson.id);
			markedRef.current = true;
		}
	};

	const markAsCompleted = () => {
		if (lesson) {
			markLessonComplete(lesson.id);
			alert("Marked as completed!");
		}
	};

	if (!lesson) {
		return (
			<div className="p-6 text-white bg-black min-h-screen">
				<p>Lesson not found.</p>
			</div>
		);
	}

	return (
		<div className="p-6 text-white bg-black min-h-screen">
			<h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>

			{lesson.type === "TEXT" && (
				<div className="prose prose-invert max-w-none">
					<ReactMarkdown>{lesson.content}</ReactMarkdown>
				</div>
			)}

			{lesson.type === "IMAGE" && (
				<img
					src={lesson.content}
					alt={lesson.title}
					className="rounded max-w-full h-auto mb-4"
				/>
			)}

			{lesson.type === "PDF" && (
				<iframe
					src={`https://docs.google.com/gview?url=${encodeURIComponent(
						lesson.content
					)}&embedded=true`}
					className="w-full h-[80vh] rounded"
				/>
			)}

			{lesson.type === "VIDEO" && (
				<div className="h-[80%] w-full">
					<YouTube
						videoId={extractVideoId(lesson.content)}
						onEnd={handleVideoEnd}
						opts={{
							width: "100%",
							playerVars: {
								autoplay: 1,
							},
						}}
					/>
				</div>
			)}

			{lesson.type !== "VIDEO" && (
				<div className="mt-3">
					<Button title="Mark as Completed" onClick={markAsCompleted} />
				</div>
			)}
		</div>
	);
}

function extractVideoId(url: string): string {
	const regExp =
		/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&]+)/;
	const match = url.match(regExp);
	return match && match[1] ? match[1] : "";
}
