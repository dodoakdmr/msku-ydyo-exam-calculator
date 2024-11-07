"use client";
import { useState } from "react";

// Excel dosyasındaki verileri yansıtmak için sınav verileri
const exams = [
	{ name: "QUIZ 1", weight: 0.016 },
	{ name: "SPEAKING PROJECT 1", weight: 0.008 },
	{ name: "WRITING QUIZ 1", weight: 0.016 },
	{ name: "ACHIEVEMENT EXAM 1", weight: 0.036 },
	{ name: "SPEAKING EXAM 1", weight: 0.016 },
	{ name: "QUIZ 2", weight: 0.016 },
	{ name: "WRITING QUIZ 2", weight: 0.016 },
	{ name: "SPEAKING PROJECT 2", weight: 0.008 },
	{ name: "ONLINE QUIZ", weight: 0.024 },
	{ name: "ACHIEVEMENT EXAM 2", weight: 0.036 },
	{ name: "ONLINE HOMEWORK", weight: 0.024 },
	{ name: "STUDENT PERFORMANCE", weight: 0.012 },
	{ name: "QUIZ 3", weight: 0.016 },
	{ name: "SPEAKING EXAM 2", weight: 0.02 },
	{ name: "SPEAKING PROJECT 3", weight: 0.008 },
	{ name: "WRITING QUIZ 3", weight: 0.016 },
	{ name: "ACHIEVEMENT EXAM 3", weight: 0.036 },
	{ name: "WRITING QUIZ 4", weight: 0.016 },
	{ name: "SPEAKING PROJECT 4", weight: 0.008 },
	{ name: "QUIZ 4", weight: 0.016 },
	{ name: "ONLINE HOMEWORK", weight: 0.024 },
	{ name: "STUDENT PERFORMANCE", weight: 0.012 },
	{ name: "PROFICIENY (FINAL) EXAM", weight: 0.6 },
];

export default function Home() {
	const [scores, setScores] = useState(Array(exams.length).fill(""));
	const [finalScore, setFinalScore] = useState<number>();

	const handleScoreChange = (index: number, value: string) => {
		const newScores = [...scores];
		newScores[index] = value;
		setScores(newScores);
	};

	const calculateFinalScore = () => {
		let total = 0;
		let totalWeight = 0;
		scores.forEach((score, index) => {
			const numericScore = parseFloat(score);
			if (!isNaN(numericScore)) {
				total += numericScore * exams[index].weight;
				totalWeight += exams[index].weight;
			}
		});
		// Yıl sonu puanı toplam ağırlığa göre hesaplanıyor
		setFinalScore(total);
	};

	return (
		<div className="flex flex-col items-center justify-center w-full px-48 max-md:px-4 min-h-screen bg-gray-100 text-zinc-700 py-10 max-md:py-3">
			<h1 className="text-4xl max-md:text-lg font-bold mb-4 max-md:mb-2">
				Yıl Sonu Başarı Puanı Hesaplama Aracı
			</h1>
			<div className="bg-white p-6 rounded shadow-md w-full gap-x-4 grid grid-cols-2 max-md:grid-cols-1">
				{exams.map((exam, index) => (
					<div key={index} className="flex justify-between mb-2">
						<label className="font-medium max-md:text-xs">
							{exam.name}{" "}
							<span className="text-xs max-md:text-[0.55rem]">
								({(exam.weight * 100).toFixed(2)}%)
							</span>
						</label>
						<input
							type="number"
							inputMode="numeric"
							value={scores[index]}
							onChange={(e) => handleScoreChange(index, e.target.value)}
							className="border rounded p-1 w-16"
							min="0"
							max="100"
						/>
					</div>
				))}
			</div>
			<button
				onClick={calculateFinalScore}
				className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
			>
				Hesapla
			</button>
			{finalScore !== null && (
				<div className="mt-4 text-4xl">
					Yıl Sonu Notu:{" "}
					<span className="font-bold text-green-600">
						{finalScore?.toFixed(2)}
					</span>
				</div>
			)}
		</div>
	);
}
