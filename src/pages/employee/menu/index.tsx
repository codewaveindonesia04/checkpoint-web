import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/molecules/Navbar";
import MenuCard from "@/components/atomic/MenuCard";
import Loading from "@/components/atomic/Loading";
import { RoleConfig } from "@/lib/custom/role";
import { TokenConfig } from "@/lib/custom/token";

export default function EmployeeMenu() {
  const router = useRouter();
  const roleConfig = useMemo(() => new RoleConfig(), []);
  const tokenConfig = useMemo(() => new TokenConfig(), []);

  const user = useMemo(() => {
    try {
      return JSON.parse(roleConfig.getRole() as string) || null;
    } catch {
      return null;
    }
  }, [roleConfig]);

  useEffect(() => {
    if (user?.data?.role !== "EMPLOYEE" || !user?.data?.access_token) {
      router.push("/");
    }
  }, [user, router]);

  const handleLogout = () => {
    tokenConfig.removeToken();
    if (!tokenConfig.getToken()) router.push("/");
  };

  if (!user) return <Loading />;

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar
        name={user.data.name}
        profilePicture="https://i.pinimg.com/736x/47/09/80/470980b112a44064cd88290ac0edf6a6.jpg"
        onLogout={handleLogout}
      />
      <div className="flex-grow flex items-center justify-center bg-purple-700 text-white">
        <div className="container max-w-4xl bg-white rounded-lg shadow-lg flex divide-x divide-gray-300">
          {menuItems.map((item) => (
            <MenuCard
              key={item.title}
              imageSrc={item.imageSrc}
              title={item.title}
              description={item.description}
              buttonText={item.buttonText}
              onClick={item.onClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const menuItems = [
  {
    imageSrc: "/attendance-logo.png",
    title: "Mark Attendance",
    description: "Clock in and out to record your working hours accurately.",
    buttonText: "Mark Attendance",
    onClick: () => console.log("Mark Attendance"),
  },
  {
    imageSrc: "/request-leave-logo.png",
    title: "Apply for Leave",
    description: "Easily submit your leave requests and check approval status.",
    buttonText: "Apply for Leave",
    onClick: () => console.log("Apply for Leave"),
  },
];
