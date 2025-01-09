export const Button = ({ children, className = '', ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg hover:bg-opacity-80 transition ${className}`}
    {...props}
  >
    {children}
  </button>
)
