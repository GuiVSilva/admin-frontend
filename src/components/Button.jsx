import { Spinner } from '@material-tailwind/react'

export const Button = ({
  children,
  className = '',
  loading = false,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={loading}
      className={`px-4 py-2 rounded-lg hover:bg-opacity-80 transition ${
        loading ? 'cursor-not-allowed opacity-75' : ''
      } ${className}`}
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
  )
}
