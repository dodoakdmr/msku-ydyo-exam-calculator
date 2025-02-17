import React, { useState, useEffect } from "react";
import { LoaderPinwheel } from "lucide-react";

const AiAnimation = () => {
  const [message, setMessage] = useState("Fındık Notlarınızı Analiz Ediyor");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("Şimdi de Geleceği Tahmin Ediyor");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white/90 absolute w-full h-full z-50 max-md:p-4 flex flex-col justify-center items-center">
      <img
        src="/AiAnimation.gif"
        alt="AI Animation"
        className="w-96 max-md:w-48 h-96 max-md:h-48"
      />
      <div className="flex justify-center items-center gap-2 animate-pulse text-cyan-600">
        <p className="text-4xl max-md:text-xl font-semibold">{message}</p>
        <LoaderPinwheel size={36} className="animate-spin" />
      </div>
    </div>
  );
};

export default AiAnimation;
