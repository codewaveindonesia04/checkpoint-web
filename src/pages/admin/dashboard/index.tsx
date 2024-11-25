import { useRef } from "react";
import { getCookie } from "cookies-next";
import { HrisApiService } from "@/lib/api/hris";
import { useQuery } from "@tanstack/react-query";

import Loading from "@/components/atomic/Loading";
import { ClockInData } from "@/lib/interface";
import { TokenConfig } from "@/lib/custom/token";

function Dashboard() {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const tokenConfig = new TokenConfig();

  const fetchEmployeeClockIns = async () => {
    const token = tokenConfig.getToken();
    if (!token) {
      throw new Error("No token available");
    }
    const hrisApiService = new HrisApiService(token as string);
    const { data } = await hrisApiService.getEmployeeClockIns();
    return Array.isArray(data?.data) ? data.data : [];
  };

  const {
    data: employeeData = [],
    isLoading,
    isError,
  }: any = useQuery({
    queryKey: ["employeeClockIns"],
    queryFn: fetchEmployeeClockIns,
  });

  const toggleSidebar = () => sidebarRef.current?.classList.toggle("hidden");

  return (
    <div className="flex min-h-screen bg-gray-100 text-purple-800">
      <aside
        ref={sidebarRef}
        className="bg-purple-700 text-white w-64 sm:block hidden"
      >
        <div className="p-4 text-lg font-semibold">MyHRIS</div>
        <nav className="mt-4">
          <a href="#" className="block py-2 px-4 hover:bg-purple-600">
            Employee Report
          </a>
          <a href="#" className="block py-2 px-4 hover:bg-purple-600">
            Leave Approval
          </a>
        </nav>
      </aside>
      <div className="flex-1 p-6">
        <header className="flex items-center justify-between bg-white p-4 shadow rounded-md">
          <button onClick={toggleSidebar} className="text-gray-500 sm:hidden">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M4 6h16M4 12h8m-8 6h16"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-md p-2 text-gray-700 focus:outline-none"
          />
        </header>
        <section className="mt-6">
          {isLoading ? (
            <Loading />
          ) : isError ? (
            <div>Error fetching employee data</div>
          ) : (
            <table className="min-w-full bg-white rounded-md shadow-md">
              <thead>
                <tr>
                  {["ID", "Clock In", "Clock Out", "Report"].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-2 bg-purple-700 text-white"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employeeData?.map(
                  ({ id, clockInTime, clockOutTime, report }: ClockInData) => (
                    <tr key={id} className="text-center">
                      <td className="px-4 py-2 border">{id}</td>
                      <td className="px-4 py-2 border">{clockInTime}</td>
                      <td className="px-4 py-2 border">
                        {clockOutTime || "N/A"}
                      </td>
                      <td className="px-4 py-2 border">{report || "N/A"}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
