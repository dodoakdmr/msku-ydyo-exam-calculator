"use client";
import { useState, useEffect } from "react";
import AiAnimation from "./_components/AiAnimation";
import { Bot } from "lucide-react";

const exams = [
  { name: "QUIZ 1", weight: 0.016, class: "q" },
  { name: "SPEAKING PROJECT 1", weight: 0.008, class: "sp" },
  { name: "WRITING QUIZ 1", weight: 0.016, class: "w" },
  { name: "ACHIEVEMENT EXAM 1", weight: 0.036, class: "a" },
  { name: "SPEAKING EXAM 1", weight: 0.016, class: "sp" },
  { name: "QUIZ 2", weight: 0.016, class: "q" },
  { name: "WRITING QUIZ 2", weight: 0.016, class: "w" },
  { name: "SPEAKING PROJECT 2", weight: 0.008, class: "sp" },
  { name: "ONLINE QUIZ", weight: 0.024, class: "q" },
  { name: "ACHIEVEMENT EXAM 2", weight: 0.036, class: "a" },
  { name: "ONLINE HOMEWORK", weight: 0.024, class: "h" },
  { name: "STUDENT PERFORMANCE", weight: 0.012, class: "h" },
  { name: "QUIZ 3", weight: 0.016, class: "q" },
  { name: "SPEAKING EXAM 2", weight: 0.02, class: "sp" },
  { name: "SPEAKING PROJECT 3", weight: 0.008, class: "sp" },
  { name: "WRITING QUIZ 3", weight: 0.016, class: "w" },
  { name: "ACHIEVEMENT EXAM 3", weight: 0.036, class: "a" },
  { name: "WRITING QUIZ 4", weight: 0.016, class: "w" },
  { name: "SPEAKING PROJECT 4", weight: 0.008, class: "sp" },
  { name: "QUIZ 4", weight: 0.016, class: "q" },
  { name: "ONLINE HOMEWORK", weight: 0.024, class: "h" },
  { name: "STUDENT PERFORMANCE", weight: 0.012, class: "h" },
  { name: "PROFICIENCY (FINAL) EXAM", weight: 0.6, class: "f" },
];

export default function Home() {
  const [scores, setScores] = useState(Array(exams.length).fill(""));
  const [finalScore, setFinalScore] = useState<number>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    calculateFinalScore();
  }, [scores]);

  const handleScoreChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && parseInt(value) <= 100) {
      const newScores = [...scores];
      newScores[index] = value;
      setScores(newScores);
    }
  };

  const calculateFinalScore = () => {
    let total = 0;
    scores.forEach((score, index) => {
      const numericScore = parseFloat(score);
      if (!isNaN(numericScore)) {
        total += numericScore * exams[index].weight;
      }
    });
    setFinalScore(total);
  };

  const clearScores = () => {
    setScores(Array(exams.length).fill(""));
  };

  const fillWithAI = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const scoreGroups: Record<string, number[]> = {};
      exams.forEach((exam, index) => {
        const numericScore = parseFloat(scores[index]);
        if (!isNaN(numericScore)) {
          if (!scoreGroups[exam.class]) {
            scoreGroups[exam.class] = [];
          }
          scoreGroups[exam.class].push(numericScore);
        }
      });

      const averages: Record<string, number> = {};
      Object.keys(scoreGroups).forEach((key) => {
        const values = scoreGroups[key];
        averages[key] =
          values.reduce((acc, val) => acc + val, 0) / values.length;
      });

      const newScores = scores.map((score, index) => {
        if (score !== "") return score;
        const examClass = exams[index].class;

        if (examClass === "f") {
          return ((averages["q"] + averages["w"]) / 2 || 50).toFixed(0);
        }

        return (averages[examClass] || 50).toFixed(0);
      });

      setScores(newScores);
    }, 3000);
  };

  return (
    <div className="relative flex flex-col items-center w-full px-48 max-md:px-4 min-h-screen bg-gray-100 text-zinc-700 max-md:py-3">
      <h1 className="text-4xl max-md:text-xl font-bold my-4">
        Yıl Sonu Başarı Puanı Hesaplama
      </h1>

      {loading && <AiAnimation />}

      <div className="bg-white p-6 rounded shadow-md w-full gap-x-4 grid grid-cols-2 max-md:grid-cols-1">
        {exams.map((exam, index) => (
          <div key={index} className="flex justify-between mb-2">
            <label className="font-medium">
              {exam.name}{" "}
              <span className="text-xs">
                ({(exam.weight * 100).toFixed(2)}%)
              </span>
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={scores[index]}
              onChange={(e) => handleScoreChange(index, e.target.value)}
              className="border rounded p-1 w-16 text-center"
              maxLength={3}
            />
          </div>
        ))}
      </div>

      <div className="w-full flex justify-start items-center gap-2 my-2">
        <button
          onClick={clearScores}
          className="bg-red-200 hover:bg-red-500 border border-red-500 text-red-500 hover:text-white px-4 py-2 rounded w-1/4 shadow"
        >
          Temizle
        </button>
        <button
          onClick={fillWithAI}
          className="bg-blue-200 hover:bg-blue-500 border border-blue-500 text-blue-500 hover:text-white px-4 py-2 rounded w-full flex justify-center items-center gap-3 shadow"
        >
          <Bot />
          Yapay Zeka ile Geleceği Tahmin Et
        </button>
      </div>

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
