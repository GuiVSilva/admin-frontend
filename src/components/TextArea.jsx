import { Spinner } from '@material-tailwind/react'

export const TextArea = ({
  placeholder,
  rows = 3,
  className = '',
  loading = false,
  error,
  ...props
}) => (
  <div className="relative">
    <textarea
      rows={rows}
      placeholder={placeholder}
      className={`mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none bg-gray-700 text-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
        error ? 'border-red-500' : 'border-transparent'
      } ${className}`}
      disabled={loading}
      {...props}
    />

    {loading && (
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
        <Spinner className="h-5 w-5 text-gray-500" color="blue" />
      </div>
    )}

    {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
  </div>
)
