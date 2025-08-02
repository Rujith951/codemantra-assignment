import { courses } from "@/constants/data/courses";
import CourseCard from "@/components/CourseCard";

export default function CoursesPage() {
	return (
		<div className="min-h-screen bg-black text-white px-6 py-10">
			<h1 className="text-3xl font-bold mb-8 text-center">Available Courses</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{courses.map(course => (
					<CourseCard key={course.id} {...course} />
				))}
			</div>
		</div>
	);
}
