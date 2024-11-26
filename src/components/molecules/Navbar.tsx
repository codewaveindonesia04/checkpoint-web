import { FC, useState } from "react";
import Image from "next/image";
import { NavbarProps } from "@/lib/interface";
import { cn } from "@/lib/shadcn";

const Navbar: FC<NavbarProps> = ({ name, profilePicture, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-slate-100 p-4 flex justify-end items-center text-purple-700 shadow-md">
      <div className="relative flex items-center space-x-7">
        <span className="hidden sm:block text-sm font-semibold">{name}</span>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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
              "absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md",
              "text-black overflow-hidden"
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
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
