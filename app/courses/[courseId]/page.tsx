"use client";
import { useParams } from "next/navigation";
import { courses } from "@/constants/data/courses";
import { modules } from "@/constants/data/modules";
import { lessons } from "@/constants/data/lessons";
import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import { useAppContext } from "@/contexts/AppContext";

export default function CourseDetailPage() {
	const { courseId } = useParams();
	const course = courses.find(c => c.id === courseId);
	const courseModules = modules.filter(m => m.courseId === courseId);

	const { completedLessons } = useAppContext();

	const getCompletedCountForModule = (moduleId: string) => {
		const moduleLessons = lessons.filter(l => l.moduleId === moduleId);
		return moduleLessons.filter(l => completedLessons[l.id]).length;
	};

	const getTotalLessonsForModule = (moduleId: string) =>
		lessons.filter(l => l.moduleId === moduleId).length;

	const totalCourseLessons = lessons.filter(l =>
		courseModules.some(m => m.id === l.moduleId)
	);

	const completedCourseLessons = totalCourseLessons.filter(
		l => completedLessons[l.id]
	);

	return (
		<div className="min-h-screen bg-black text-white px-6 py-10">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold mb-4">{course?.title}</h1>
				<p className="text-gray-400 mb-6">{course?.description}</p>

				<p className="mb-6 text-green-400 font-medium">
					{completedCourseLessons.length} of {totalCourseLessons.length} lessons
					completed
				</p>

				<div className="space-y-6">
					{courseModules.map(mod => {
						const completed = getCompletedCountForModule(mod.id);
						const total = getTotalLessonsForModule(mod.id);
						const progress = total ? completed / total : 0;

						return (
							<Link
								key={mod.id}
								href={`/modules/${mod.id}`}
								className="block p-4 bg-gray-800 hover:border-gray-400 border border-gray-600 rounded-md transition"
							>
								<h2 className="text-xl font-semibold">{mod.title}</h2>
								<div className="mt-2 text-sm text-gray-400">
									{completed} of {total} lessons completed
								</div>
								<div className="w-full bg-gray-700 h-2 mt-2 rounded overflow-hidden">
									<ProgressBar progress={progress} />
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}
