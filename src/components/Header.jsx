import { SignedIn, UserButton, useUser } from '@clerk/clerk-react'

const Header = ({ title }) => {
  const { user } = useUser()
  return (
    <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto p-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>
          <SignedIn>
            <div className="flex items-center gap-x-4">
              <span className="text-gray-100">{user?.fullName}</span>
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  )
}

export default Header
