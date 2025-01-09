export const Select = ({
  id,
  name,
  options = [],
  className = '',
  ...props
}) => (
  <select
    id={id}
    name={name}
    className={`mt-1 block w-full px-3 py-2 border border-transparent rounded-md shadow-sm focus:outline-none bg-gray-700 text-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder-gray-400 ${className}`}
    {...props}
  >
    {options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
)
