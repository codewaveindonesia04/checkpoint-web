"use client";
import { MainLayout } from "@/lib/interface";

function Main({ children }: MainLayout) {
  return (
    <div className="h-full w-screen bg-slate-200 flex flex-col justify-center items-center">
      {children}
    </div>
  );
}

export default Main;
