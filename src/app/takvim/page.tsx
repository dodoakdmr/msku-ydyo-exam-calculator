"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";

const englishExams = [
  { name: "QUIZ 1", date: "05.11.2024", day: "SALI" },
  { name: "WRITING QUIZ 1", date: "19.11.2024", day: "SALI" },
  { name: "ACHIEVEMENT EXAM 1", date: "05.12.2024", day: "PERŞEMBE" },
  { name: "SPEAKING EXAM 1", date: "12.12.2024", day: "PERŞEMBE/CUMA" },
  { name: "QUIZ 2", date: "24.12.2024", day: "SALI" },
  { name: "WRITING QUIZ 2", date: "07.01.2025", day: "SALI" },
  { name: "ONLINE SINAV", date: "21.01.2025", day: "SALI" },
  { name: "ACHIEVEMENT EXAM 2", date: "30.01.2025", day: "PERŞEMBE" },
  { name: "QUIZ 3", date: "11.03.2025", day: "SALI" },
  { name: "SPEAKING EXAM 2", date: "20.03.2025", day: "PERŞEMBE/CUMA" },
  { name: "WRITING QUIZ 3", date: "08.04.2025", day: "SALI" },
  { name: "ACHIEVEMENT EXAM 3", date: "17.04.2025", day: "PERŞEMBE" },
  { name: "WRITING QUIZ 4", date: "06.05.2025", day: "SALI" },
  { name: "QUIZ 4", date: "13.05.2025", day: "SALI" },
  { name: "PROFICIENCY (FINAL) EXAM", date: "27.05.2025" },
];

const deutchExams = [
  { name: "WORTSCHATZ GRAMMATIK 1", date: "08.11.2024", day: "CUMA" },
  { name: "WORTSCHATZ GRAMMATIK 2", date: "20.12.2024", day: "CUMA" },
  { name: "ZWISCHENPRÜFUNG 1", date: "27.12.2024", day: "CUMA" },
  { name: "PROJEKTARBEIT 1", date: "17.01.2025", day: "CUMA" },
  { name: "WORTSCHATZ GRAMMATIK 3", date: "31.01.2025", day: "CUMA" },
  { name: "PERFORMANCE 1", date: "31.01.2025", day: "CUMA" },
  { name: "WORTSCHATZ GRAMMATIK 4", date: "21.03.2025", day: "CUMA" },
  { name: "ZWISCHENPRÜFUNG 2", date: "28.02.2025", day: "CUMA" },
  { name: "WORTSCHATZ GRAMMATIK 5", date: "25.04.2025", day: "CUMA" },
  { name: "ZWISCHENPRÜFUNG 3", date: "16.05.2025", day: "CUMA" },
  { name: "WORTSCHATZ GRAMMATIK 6", date: "20.05.2025", day: "SALI" },
  { name: "PERFORMANCE 2", date: "23.05.2025", day: "CUMA" },
  { name: "PORTFOLIO", date: "23.05.2025", day: "SALİ" },
  { name: "PROJEKTARBEIT 2", date: "23.05.2025", day: "SALI" },
  { name: "EIGNUNGSPRÜFUNG", date: "27.05.2025", day: "" },
];

const categories = ["İngilizce", "Almanca"];

export default function ExamSchedule() {
  const [selectedCategory, setSelectedCategory] = useState("İngilizce");
  const [exams, setExams] = useState(englishExams);

  // Bugünün tarihini alalım
  const today = new Date();

  // Fonksiyon: dd.mm.yyyy formatındaki tarihi Date nesnesine dönüştür
  function parseDate(dateStr: any) {
    const [day, month, year] = dateStr
      .split(".")
      .map((num: any) => parseInt(num, 10));
    return new Date(year, month - 1, day); // Aylar 0'dan başlar
  }

  // Fonksiyon: Tarihin geçmiş olup olmadığını kontrol et
  function isPast(dateStr: any) {
    const examDate = parseDate(dateStr);
    return examDate < today; // Geçmiş mi kontrol et
  }

  function calculateDaysBetween(dateStr2: string) {
    const date1 = today;
    const date2 = parseDate(dateStr2);
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24)); // Gün cinsinden fark
  }

  useEffect(() => {
    selectedCategory === "İngilizce"
      ? setExams(englishExams)
      : selectedCategory === "Almanca"
      ? setExams(deutchExams)
      : [];
  }, [selectedCategory]);

  return (
    <div className="flex flex-col items-center py-6 px-4 max-md:px-2 bg-zinc-100 min-h-screen">
      <h1 className="text-4xl max-md:text-xl font-bold mb-3">Sınav Takvimi</h1>
      <div className="flex gap-4 mb-6">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-md:gap-2">
        {exams.map((exam, index) => (
          <Card>
            <CardContent
              className={`p-4 text-center ${
                isPast(exam.date)
                  ? "bg-green-100 border rounded-xl border-green-300 text-green-500 h-full"
                  : ""
              }`}
            >
              <h2 className="text-xl max-md:text-sm font-semibold flex gap-2 justify-center items-center">
                <p className="">
                  {selectedCategory === "İngilizce"
                    ? "🇬🇧"
                    : selectedCategory === "Almanca"
                    ? "🇩🇪"
                    : "🇹🇷"}
                </p>
                {exam.name}
              </h2>
              <p className="text-gray-600 max-md:text-xs">{exam.date}</p>
              <p className="text-gray-600 max-md:text-xs">{exam.day}</p>
              {isPast(exam.date) ? (
                <div className="flex justify-center items-center gap-2 text-green-700 max-md:text-xs">
                  <CheckCheck />
                  <p>Sınav Tarihi Geçti</p>
                </div>
              ) : (
                <p className="text-green-600 max-md:text-sm italic">
                  Sınav {calculateDaysBetween(exam.date) - 1} gün sonra
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
