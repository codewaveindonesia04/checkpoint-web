import { useRouter } from "next/router";

function useBack() {
  const router = useRouter();

  function goBack() {
    router.back();
  }

  return {goBack};
}

export default useBack;
