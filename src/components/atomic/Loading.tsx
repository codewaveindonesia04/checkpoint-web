export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex flex-col space-y-3 items-center justify-center py-4">
        <div className="h-10 w-10 animate-spin rounded-full border-t-4 border-purple-500"></div>
        <p className="font-semibold text-white">Loading</p>
      </div>
    </div>
  );
}