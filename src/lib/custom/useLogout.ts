import { useRouter } from "next/router";
import { TokenConfig } from "@/lib/config/token";

function useLogout() {
  const router = useRouter();
  const tokenConfig = new TokenConfig();

  const logout = () => {
    tokenConfig.removeToken();
    router.push("/");
  };

  return { logout };
}

export default useLogout;
