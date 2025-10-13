export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center my-auto bg-gray-100 h-auto">
      <p className="text-black text-3xl font-medium text-center mb-4">
        Loading...
      </p>
      <Spinner />
    </div>
  );
}

const Spinner = () => {
  return (
    <svg className="w-16 h-16 animate-spin" viewBox="0 0 50 50">
      <circle
        className="opacity-25 stroke-brand"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      />
      <circle
        className="opacity-75 stroke-brand"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="90,150"
        strokeDashoffset="0"
      />
    </svg>
  );
};
