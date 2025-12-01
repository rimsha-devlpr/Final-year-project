/*"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    
    router.push("/app/main/auth/v1/login");
  }, [router]);
  return null;
}*/
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
  return <>Coming Soon</>;
}
