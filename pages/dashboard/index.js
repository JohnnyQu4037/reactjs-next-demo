import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("access_token"))
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;
    if (!token) {
      router.push("/");
      return;
    }
    else{
      router.push(`/dashboard/overview`);
    }
  }, []);

  return null;
}
