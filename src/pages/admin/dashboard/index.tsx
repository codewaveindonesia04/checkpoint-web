import { useRef } from "react";

function Dashboard() {
  const sidebarRef: any = useRef(null);

  const employeeData = [
    {
      id: 1,
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      report: "Completed tasks",
    },
    {
      id: 2,
      clockIn: "10:00 AM",
      clockOut: "06:00 PM",
      report: "Pending review",
    },
    { id: 3, clockIn: "08:00 AM", clockOut: "04:00 PM", report: "On schedule" },
  ];

  const toggleSidebar = () => {
    if (sidebarRef.current) {
      sidebarRef.current.classList.toggle("hidden");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-purple-800">
      <aside
        ref={sidebarRef}
        className="bg-purple-700 text-white w-64 sm:block hidden"
      >
        <div className="p-4 text-lg font-semibold">MyHRIS Dashboard</div>
        <nav className="mt-4">
          <a href="#" className="block py-2 px-4 hover:bg-purple-600">
            Employee Report
          </a>
          <a href="#" className="block py-2 px-4 hover:bg-purple-600">
            Leave Approval
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-6">
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
          <table className="min-w-full bg-white rounded-md shadow-md">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-purple-700 text-white">ID</th>
                <th className="px-4 py-2 bg-purple-700 text-white">Clock In</th>
                <th className="px-4 py-2 bg-purple-700 text-white">
                  Clock Out
                </th>
                <th className="px-4 py-2 bg-purple-700 text-white">Report</th>
              </tr>
            </thead>
            <tbody>
              {employeeData.map((employee) => (
                <tr key={employee.id} className="text-center">
                  <td className="px-4 py-2 border">{employee.id}</td>
                  <td className="px-4 py-2 border">{employee.clockIn}</td>
                  <td className="px-4 py-2 border">{employee.clockOut}</td>
                  <td className="px-4 py-2 border">{employee.report}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
