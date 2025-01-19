import { Spinner } from "@material-tailwind/react";

const Button = ({
  children,
  className = "",
  loading = false,
  size,
  ...props
}) => {
  const getSizeButton = () => {
    switch (size) {
      case "sm":
        return "w-30";
      case "md":
        return "w-60";
      case "lg":
        return "w-72";
      default:
        return "w-full";
    }
  };
  return (
    <button
      {...props}
      disabled={loading}
      className={`px-4 py-2 rounded-lg hover:bg-opacity-80 transition ${getSizeButton(
        size
      )} ${loading ? "cursor-not-allowed opacity-75" : ""} ${className}`}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner className="h-6 w-6 mr-2 text-gray-900/50" color="blue" />
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button