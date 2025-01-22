import { useField } from 'formik'
import { useState } from 'react'
import { Spinner } from '@material-tailwind/react'

const CustomAutocomplete = ({
  name,
  options = [],
  placeholder = 'Digite algo...',
  size = 'md',
  loading = false,
  onChange,
  className = '',
  ...props
}) => {
  const [field, meta, helpers] = useField(name)
  const [filteredOptions, setFilteredOptions] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const getSizeClasses = size => {
    switch (size) {
      case 'sm':
        return 'w-32'
      case 'md':
        return 'w-64'
      case 'lg':
        return 'w-100'
      default:
        return 'w-full'
    }
  }

  const handleInputChange = e => {
    const inputValue = e.target.value
    helpers.setValue(inputValue)
    setIsDropdownOpen(true)

    if (inputValue.trim() === '') {
      setFilteredOptions([])
    } else {
      const newOptions = options.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      )
      setFilteredOptions(newOptions)
    }

    if (onChange) {
      onChange(inputValue)
    }
  }

  const handleOptionSelect = option => {
    helpers.setValue(option)
    setIsDropdownOpen(false)
    setFilteredOptions([])

    if (onChange) {
      onChange(option)
    }
  }

  return (
    <div
      className={`relative flex flex-col ${getSizeClasses(size)} ${className}`}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={field.value?.label || field.value}
        onChange={handleInputChange}
        onFocus={() => setIsDropdownOpen(true)}
        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
        className={`mt-1 block px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-gray-300 placeholder-gray-400 sm:text-sm ${
          meta.error && meta.touched ? 'border-red-500' : 'border-transparent'
        }`}
        {...props}
      />

      {loading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
          <Spinner className="h-5 w-5 text-gray-500" color="blue" />
        </div>
      )}

      {isDropdownOpen && filteredOptions.length > 0 && (
        <ul
          className="absolute z-10 mt-1 max-h-40 w-full overflow-auto bg-gray-800 border border-gray-700 rounded-md shadow-lg"
          style={{
            top: '100%',
            scrollbarWidth: 'thin',
            scrollbarColor: 'transparent transparent'
          }}
        >
          {filteredOptions.map(option => (
            <li
              key={option.value}
              onClick={() => handleOptionSelect(option)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-700 text-gray-300"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {meta.touched && meta.error && (
        <span className="text-red-500 text-sm mt-1">{meta.error}</span>
      )}
    </div>
  )
}

export default CustomAutocomplete
