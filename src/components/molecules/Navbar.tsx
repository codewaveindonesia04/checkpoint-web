import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { NavbarProps } from "@/lib/interface";
import { cn } from "@/lib/shadcn";

import Loading from "../atomic/Loading";
import useLogout from "@/lib/custom/useLogout";
export default function Navbar({ name, profilePicture }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState<string | null>(null);
  const { logout } = useLogout();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hour = new Date().getHours();
      if (hour < 12) {
        setGreeting("Good Morning");
      } else if (hour < 18) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    }
  }, []);

  if (!greeting) {
    return <Loading />;
  }

  return (
    <div className="w-full bg-slate-100 p-4 flex justify-end items-center text-purple-700 shadow-md">
      <div className="relative flex items-center space-x-7">
        {greeting && (
          <p className="hidden sm:block text-sm font-semibold">
            {greeting}, {name}
          </p>
        )}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex items-center space-x-2"
        >
          <Image
            src={profilePicture}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </button>
        {isMenuOpen && (
          <div
            className={cn(
              "absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md text-black overflow-hidden"
            )}
          >
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => console.log("Navigate to profile")}
            >
              Profile
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
