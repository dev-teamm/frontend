export default function EmptyView({
  message,
  minHeight,
  buttonLabel,
  buttonAction,
}: {
  message: string;
  minHeight?: string;
  buttonLabel?: string;
  buttonAction?: () => void;
}) {
  return (
    <div className="w-full">
      <div
        className={` ${
          minHeight ? minHeight : "min-h-[60vh]"
        } bg-gray-50 rounded-lg py-6 flex flex-col items-center justify-center gap-6`}
      >
        <img src={"/empty.svg"} width={300} height={300} alt="empty" />
        <h1 className="text-xl font-semibold text-gray-700">{message}</h1>
        {buttonLabel && buttonAction && (
          <button
            onClick={buttonAction}
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
}
