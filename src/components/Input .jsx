import { Spinner } from '@material-tailwind/react'

export const Input = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  type = 'text',
  className = '',
  error,
  loading = false,
  mask,
  ...props
}) => {
  const handleChange = e => {
    let inputValue = e.target.value

    if (mask === 'money') {
      const numericValue = inputValue.replace(/\D/g, '') // Remove não numéricos
      inputValue = (Number(numericValue) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    }

    // Chama o onChange do Formik com o valor formatado
    if (onChange) {
      onChange({
        target: {
          name,
          value: mask === 'money' ? inputValue : e.target.value
        }
      })
    }
  }

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
          className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none bg-gray-700 text-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder-gray-400 ${
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
      </div>

      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  )
}
