import Navbar from "@/components/molecules/Navbar";
import Loading from "@/components/atomic/Loading";
import MainCard from "@/components/atomic/MainCard";
import Button from "@/components/atomic/Button";

import useDataUser from "@/lib/custom/useDataUser";
import useTimer from "@/lib/custom/useTimer";
import useAttendance from "@/lib/custom/useAttendance";
import useBack from "@/lib/custom/useBack";

export default function Attendance() {
  const { user, loading } = useDataUser();
  const { currentTime, dateString } = useTimer();
  const { history, handleClockIn, handleClockOut } = useAttendance();
  const { goBack } = useBack();

  if (loading) return <Loading />;

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar
        name={user?.data.name as string}
        profilePicture="https://i.pinimg.com/736x/47/09/80/470980b112a44064cd88290ac0edf6a6.jpg"
      />
      <div className="flex-grow flex flex-col items-center justify-center bg-purple-700 text-white">
        <div className="w-1/2">
          <MainCard>
            <div className="flex flex-col h-96 mx-auto justify-center items-center space-y-4 text-purple-700">
              <h1 className="text-xl font-bold">Attendance</h1>
              <div className="flex flex-col justify-center items-center text-xl py-5">
                <p>{dateString}</p>
                <p className="font-bold text-black">{currentTime}</p>
              </div>
              <div className="flex w-60 space-x-5">
                <Button variant="primary" onClick={handleClockIn}>
                  Clock In
                </Button>
                <Button variant="secondary" onClick={handleClockOut}>
                  Clock Out
                </Button>
              </div>
              {history.length == 0 ? (
                <div className="p-5">
                  <p> No Attendance Recorded</p>
                </div>
              ) : (
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
              )}
            </div>
          </MainCard>
          <div className="my-5">
            <Button variant="primary" onClick={goBack}>
              Back to Menu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
