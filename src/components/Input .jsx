export const Input = ({
  id,
  name,
  placeholder,
  type = 'text',
  className = '',
  ...props
}) => (
  <input
    type={type}
    id={id}
    name={name}
    placeholder={placeholder}
    className={`mt-1 block w-full px-3 py-2 border border-transparent rounded-md shadow-sm focus:outline-none bg-gray-700 text-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder-gray-400 ${className}`}
    {...props}
  />
)
