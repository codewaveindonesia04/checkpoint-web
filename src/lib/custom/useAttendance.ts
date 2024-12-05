import { useState } from "react";

export default function useAttendance() {
  const [history, setHistory] = useState<{ type: string; time: string }[]>([]);

  function handleClockIn() {
    const time = new Date().toLocaleTimeString();
    setHistory((prevHistory) => [...prevHistory, { type: "Clock In", time }]);
    alert("Clock In Successful!");
  }

  function handleClockOut() {
    const time = new Date().toLocaleTimeString();
    setHistory((prevHistory) => [...prevHistory, { type: "Clock Out", time }]);
    alert("Clock Out Successful!");
  }

  return { history, handleClockIn, handleClockOut };
}
