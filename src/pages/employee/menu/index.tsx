import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/molecules/Navbar";
import MenuCard from "@/components/atomic/MenuCard";
import MainCard from "@/components/atomic/MainCard";
import Loading from "@/components/atomic/Loading";
import { RoleConfig } from "@/lib/custom/role";
import { TokenConfig } from "@/lib/custom/token";
import { UserData } from "@/lib/interface";

export default function EmployeeMenu() {
  const router = useRouter();
  const roleConfig = new RoleConfig();
  const tokenConfig = new TokenConfig();

  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getUserData() {
      try {
        const role = roleConfig.getRole() as string;
        const parsedUser = JSON.parse(role) as UserData | null;
        setUser(parsedUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    getUserData();
  }, []);

  function handleLogout() {
    tokenConfig.removeToken();
    router.push("/");
  }

  if (loading) return <Loading />;

  function handleMenuClick(menu: string) {
    if (menu === "attendance") {
      router.push("/employee/menu/attendance");
    } else if (menu === "leave") {
      router.push("/employee/menu/leave");
    }
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar
        name={user?.data.name as string}
        profilePicture="https://i.pinimg.com/736x/47/09/80/470980b112a44064cd88290ac0edf6a6.jpg"
        onLogout={handleLogout}
      />
      <div className="flex-grow flex items-center justify-center bg-purple-700 text-white">
        <div className="mx-1">
          <MainCard>
            {menuItems.map((item) => (
              <MenuCard
                key={item.title}
                imageSrc={item.imageSrc}
                title={item.title}
                description={item.description}
                buttonText={item.buttonText}
                onClick={() => handleMenuClick(item.onClick)}
              />
            ))}
          </MainCard>
        </div>
      </div>
    </div>
  );
}

const menuItems = [
  {
    imageSrc: "/attendance-logo.png",
    title: "Absensi Kehadiran",
    description:
      "Catat jam kerja Anda dengan mudah dengan fitur clock-in dan clock-out yang akurat.",
    buttonText: "Absen Sekarang",
    onClick: "attendance",
  },
  {
    imageSrc: "/request-leave-logo.png",
    title: "Ajukan Cuti",
    description:
      "Ajukan permohonan cuti Anda dengan mudah dan pantau status persetujuan permohonan Anda.",
    buttonText: "Ajukan Cuti",
    onClick: "leave",
  },
];
