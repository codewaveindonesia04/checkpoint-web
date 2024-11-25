import Navbar from "@/components/molecules/Navbar";
import Image from "next/image";

export default function EmployeeMenu() {
  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar
        email="employee@example.com"
        profilePicture={"https://i.pinimg.com/736x/47/09/80/470980b112a44064cd88290ac0edf6a6.jpg"}
        onLogout={handleLogout}
      />
      <div className="flex-grow flex items-center justify-center bg-purple-700 text-white">
        <div className="container max-w-4xl bg-white rounded-lg shadow-lg flex divide-x divide-gray-300">
          <div className="w-1/2 p-8 flex flex-col items-center justify-center">
            <Image
              src="/attendance-logo.png"
              alt="Attendance"
              width={100}
              height={100}
              className="mb-4"
            />
            <h2 className="text-2xl font-bold text-purple-700">
              Mark Attendance
            </h2>
            <p className="text-gray-500 mt-2 text-center">
              Clock in and out to record your working hours accurately.
            </p>
            <button className="mt-6 bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800">
              Mark Attendance
            </button>
          </div>
          <div className="w-1/2 p-8 flex flex-col items-center justify-center">
            <Image
              src="/request-leave-logo.png"
              alt="Request Leave"
              width={100}
              height={100}
              className="mb-4"
            />
            <h2 className="text-2xl font-bold text-purple-700">
              Apply for Leave
            </h2>
            <p className="text-gray-500 mt-2 text-center">
              Easily submit your leave requests and check approval status.
            </p>
            <button className="mt-6 bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800">
              Apply for Leave
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
