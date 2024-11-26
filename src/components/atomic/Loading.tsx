import { cn } from "@/lib/shadcn";

export default function Loading() {
  return (
    <div
      className={cn(
        "fixed inset-0 flex justify-center items-center z-50",
        "bg-black bg-opacity-50"
      )}
    >
      <div className="flex flex-col items-center justify-center py-4 space-y-3">
        <div
          className={cn(
            "h-10 w-10 animate-spin rounded-full border-t-4",
            "border-purple-500"
          )}
        ></div>
        <p className="text-white font-semibold">Loading</p>
      </div>
    </div>
  );
}
