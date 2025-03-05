export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="animate-pulse">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <div className="h-[400px] bg-gray-200 rounded-lg" />
          </div>
          <div className="w-full lg:w-1/3">
            <div className="h-[500px] bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
