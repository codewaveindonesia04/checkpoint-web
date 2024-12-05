import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/molecules/Navbar";
import Loading from "@/components/atomic/Loading";
import { UserData } from "@/lib/interface";
import { RoleConfig } from "@/lib/config/role";
import { TokenConfig } from "@/lib/config/token";

export default function Attendance() {
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

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar
        name={user?.data.name as string}
        profilePicture="https://i.pinimg.com/736x/47/09/80/470980b112a44064cd88290ac0edf6a6.jpg"
        onLogout={handleLogout}
      />
      <div className="flex-grow flex items-center justify-center bg-purple-700 text-white">
        <></>
      </div>
    </div>
  );
}
