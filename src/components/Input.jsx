import { Spinner } from "@material-tailwind/react";

export const Input = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  className = "",
  error,
  loading = false,
  mask,
  size,
  ...props
}) => {
  const handleChange = (e) => {
    let inputValue = e.target.value;

    if (mask === "money") {
      const numericValue = inputValue.replace(/\D/g, "");
      inputValue = (Number(numericValue) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }

    if (mask === "phone") {
      inputValue = inputValue.replace(/\D/g, "");

      if (inputValue.length > 11) {
        inputValue = inputValue.slice(0, 11);
      }

      if (inputValue.length <= 10) {
        inputValue = inputValue.replace(
          /(\d{2})(\d{0,5})(\d{0,4})/,
          "($1) $2-$3"
        );
      } else {
        inputValue = inputValue.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      }
    }

    if (mask === "cpf_cnpj") {
      inputValue = inputValue.replace(/\D/g, "");
      if (inputValue.length <= 11) {
        inputValue = inputValue.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          "$1.$2.$3-$4"
        );
      } else if (inputValue.length <= 14) {
        inputValue = inputValue.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "$1.$2.$3/$4-$5"
        );
      }
    }

    if (onChange) {
      onChange({
        target: {
          name,
          value:
            mask === "money" || mask === "phone" || mask === "cpf_cnpj"
              ? inputValue
              : e.target.value,
        },
      });
    }
  };

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
    <div className="flex flex-col">
      <div className="relative">
        <input
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          type={type}
          placeholder={placeholder}
          className={`mt-1 block  px-3 py-2 rounded-md shadow-sm focus:outline-none  ${getSizeClasses(
            size
          )} bg-gray-700 text-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder-gray-400 ${
            error ? "border-red-500" : "border-transparent"
          } ${className}`}
          disabled={loading}
          {...props}
        />

        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
            <Spinner className="h-5 w-5 text-gray-500" color="blue" />
          </div>
        )}
      </div>

      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};
