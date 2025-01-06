import { ArrowLeft, ArrowRight } from 'lucide-react'

const Pagination = ({
  filteredData,
  currentPage,
  onPageChange,
  itemsPerPage
}) => {
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  return (
    <div className="flex items-center justify-center mt-4 space-x-2">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg ${
          currentPage === 1
            ? 'text-gray-500 cursor-not-allowed'
            : 'text-blue-500 hover:text-blue-600'
        }`}
      >
        <ArrowLeft />
      </button>
      <span className="text-gray-300">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg ${
          currentPage === totalPages
            ? 'text-gray-500 cursor-not-allowed'
            : 'text-blue-500 hover:text-blue-600'
        }`}
      >
        <ArrowRight />
      </button>
    </div>
  )
}

export default Pagination
