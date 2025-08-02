"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const Home = () => {
	const router = useRouter();

	const handleNavigate = () => {
		router.push("/courses");
	};

	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-900 to-black text-white">
			<h1 className="text-4xl md:text-6xl font-bold animate-pulse mb-10 text-center">
				Welcome to <span className="text-green-400">Crash Courses</span>
			</h1>
			<Button onClick={handleNavigate} title="Explore Courses" />
		</div>
	);
};

export default Home;
