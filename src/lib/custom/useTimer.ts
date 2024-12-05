import { useState, useEffect } from "react";

export default function useTimer() {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date();
      const timeString = time.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setCurrentTime(timeString);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const dateString = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return { currentTime, dateString };
}
