import { Spinner } from "@material-tailwind/react";
import { Field } from "formik";

export const Select = ({
  id,
  name,
  options = [],
  className = "",
  loading = false,
  size,
  ...props
}) => {
  const getSizeClasses = (size) => {
    switch (size) {
      case "sm":
        return "w-10"; // Tamanho pequeno
      case "md":
        return "w-30"; // Tamanho médio
      case "lg":
        return "w-80"; // Tamanho grande
      default:
        return "w-full"; // Tamanho grande
    }
  };
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <div className="relative">
          <select
            id={id}
            {...field} // Passa automaticamente value, onChange, onBlur
            className={`mt-1 block ${getSizeClasses(
              size
            )} px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none bg-gray-700 text-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              meta.touched && meta.error
                ? "border-red-500"
                : "border-transparent"
            } ${className}`}
            disabled={loading}
            {...props}
          >
            <option value="">Selecione uma opção</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
              <Spinner className="h-5 w-5 text-gray-500 mr-5" color="blue" />
            </div>
          )}

          {meta.touched && meta.error && (
            <span className="text-red-500 text-sm mt-1">{meta.error}</span>
          )}
        </div>
      )}
    </Field>
  );
};
