import { useEffect, useState } from "react";
import { RoleConfig } from "@/lib/config/role";
import { UserData } from "@/lib/interface";

function useDataUser() {
  const roleConfig = new RoleConfig();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchUserData() {
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

    fetchUserData();
  }, []);

  return { user, loading };
}

export default useDataUser;
