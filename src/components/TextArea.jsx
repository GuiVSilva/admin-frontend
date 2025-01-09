export const TextArea = ({
  placeholder,
  rows = 3,
  className = '',
  ...props
}) => (
  <textarea
    rows={rows}
    placeholder={placeholder}
    className={`mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none bg-gray-700 text-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
    {...props}
  />
)
