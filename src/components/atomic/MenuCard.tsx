import Image from "next/image";
import { MenuCardProps } from "@/lib/interface";
import { cn } from "@/lib/shadcn";

export default function MenuCard({
  imageSrc,
  title,
  description,
  buttonText,
  onClick,
}: MenuCardProps) {
  return (
    <div className={cn("w-1/2 p-8 flex flex-col items-center justify-center")}>
      <Image
        src={imageSrc}
        alt={title}
        width={100}
        height={100}
        className="mb-4"
        priority
      />
      <h2 className={cn("text-2xl font-bold text-purple-700")}>{title}</h2>
      <p className={cn("text-gray-500 mt-2 text-center")}>{description}</p>
      <button
        onClick={onClick}
        className={cn(
          "mt-6 px-6 py-2 rounded-lg",
          "bg-purple-700 text-white",
          "hover:bg-purple-800"
        )}
      >
        {buttonText}
      </button>
    </div>
  );
}
