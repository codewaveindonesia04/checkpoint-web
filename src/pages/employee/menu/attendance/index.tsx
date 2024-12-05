import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/molecules/Navbar";
import Loading from "@/components/atomic/Loading";
import MainCard from "@/components/atomic/MainCard";
import Button from "@/components/atomic/Button";
import { TokenConfig } from "@/lib/config/token";

import useDataUser from "@/lib/custom/useDataUser";
import useTimer from "@/lib/custom/useTimer";

export default function Attendance() {
  const router = useRouter();
  const tokenConfig = new TokenConfig();

  const { user, loading } = useDataUser();
  const currentTime = useTimer();

  const [history, setHistory] = useState<{ type: string; time: string }[]>([]);

  function handleLogout() {
    tokenConfig.removeToken();
    router.push("/");
  }

  function handleClockIn() {
    const time = new Date().toLocaleTimeString();
    setHistory([...history, { type: "Clock In", time }]);
    alert("Clock In Successful!");
  }

  function handleClockOut() {
    const time = new Date().toLocaleTimeString();
    setHistory([...history, { type: "Clock Out", time }]);
    alert("Clock Out Successful!");
  }

  if (loading) return <Loading />;

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar
        name={user?.data.name as string}
        profilePicture="https://i.pinimg.com/736x/47/09/80/470980b112a44064cd88290ac0edf6a6.jpg"
        onLogout={handleLogout}
      />
      <div className="flex-grow flex flex-col items-center justify-center bg-purple-700 text-white">
        <MainCard>
          <div className="flex flex-col h-96 mx-auto justify-center items-center space-y-4 text-purple-700">
            <h1 className="text-xl font-bold">Attendance</h1>
            <div className="text-xl font-bold font-medium">
              <p>{currentTime}</p>
            </div>
            <div className="flex w-60 space-x-5">
              <Button variant="primary" onClick={handleClockIn}>
                Clock In
              </Button>
              <Button variant="secondary" onClick={handleClockOut}>
                Clock Out
              </Button>
            </div>

            <div className="mt-6 w-full max-w-md">
              <table className="table-auto w-full text-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b text-left">Type</th>
                    <th className="px-4 py-2 border-b text-left">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border-b">{entry.type}</td>
                      <td className="px-4 py-2 border-b">{entry.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  );
}
