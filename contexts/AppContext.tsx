"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { lessons } from "@/constants/data/lessons";

type CompletionMap = { [key: string]: boolean };

interface AppContextType {
	completedLessons: CompletionMap;
	markLessonComplete: (lessonId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [completedLessons, setCompletedLessons] = useState<CompletionMap>({});

	useEffect(() => {
		const loaded: CompletionMap = {};
		lessons.forEach(lesson => {
			if (localStorage.getItem(lesson.id) === "completed") {
				loaded[lesson.id] = true;
			}
		});
		setCompletedLessons(loaded);
	}, []);

	const markLessonComplete = (lessonId: string) => {
		localStorage.setItem(lessonId, "completed");
		setCompletedLessons(prev => ({ ...prev, [lessonId]: true }));
	};

	return (
		<AppContext.Provider value={{ completedLessons, markLessonComplete }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext must be used within AppProvider");
	}
	return context;
};
