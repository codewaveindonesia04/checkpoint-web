import { useRouter } from "next/router";
import Navbar from "@/components/molecules/Navbar";
import MenuCard from "@/components/atomic/MenuCard";
import Loading from "@/components/atomic/Loading";
import useUserData from "@/lib/custom/useDataUser";
import useLogout from "@/lib/custom/useLogout";
import { menuItems } from "@/lib/data/data";

export default function EmployeeMenu() {
  const router = useRouter();
  const { user, loading } = useUserData();

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
      />
      <div className="flex-grow flex items-center justify-center bg-purple-700 text-white">
        {menuItems.map((item) => (
          <div className="mx-5 flex flex-col items-center">
            <MenuCard
              key={item.title}
              imageSrc={item.imageSrc}
              title={item.title}
              description={item.description}
              buttonText={item.buttonText}
              onClick={() => handleMenuClick(item.onClick)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
