import { MainCardProps } from "@/lib/interface";

export default function MainCard({ children }: MainCardProps) {
  return (
    <div className="flex space-x-5 bg-slate-100 shadow-md rounded-md w-full h-max">
      {children}
    </div>
  );
}
