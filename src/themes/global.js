const theme = {
  colors: {
    primary: "#3498db",
  },
  button: {
    success:
      "flex items-center  justify-center bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800",
    error:
      "flex items-center  justify-center bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-900 px-6",
    warning:
      "flex items-center  justify-center bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700",
    gray: "flex items-center  justify-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 px-6",
  },
  grid: {
    cards: "max-w-7xl mx-auto py-20 px-4 lg:px-8",
    motion: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
  },
  input: {
    search: "bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  }
};
export default theme;
