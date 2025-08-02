type Props = {
	progress: number;
};

export default function ProgressBar({ progress }: Props) {
	return (
		<div className="w-full bg-gray-300 rounded h-2 overflow-hidden">
			<div
				className="bg-green-500 h-full transition-all duration-300 ease-in-out"
				style={{ width: `${progress * 100}%` }}
			></div>
		</div>
	);
}
