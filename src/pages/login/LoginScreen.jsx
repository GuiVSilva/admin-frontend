import { Layers, X } from 'lucide-react'
import Boxes from '../../assets/boxes.gif'
import { SignIn, SignUp } from '@clerk/clerk-react'
import { useAuth } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '@material-tailwind/react'

const LoginScreen = () => {
  const { isSignedIn, isLoaded } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [isSignInVisible, setSignInVisible] = useState(false)
  const [isSignUpVisible, setSignUpVisible] = useState(false)

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        navigate('/dashboard')
      } else {
        setLoading(false)
      }
    }
  }, [isSignedIn, isLoaded, navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-800">
        <Spinner className="h-12 w-12 text-gray-500" color="blue" />
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-800">
      <div className="hidden md:flex w-1/2 bg-gray-200 items-center justify-center min-h-screen">
        <img src={Boxes} alt="" className="object-cover w-full h-50" />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-8 bg-gray-800 min-h-screen">
        <div className="w-full max-w-sm md:max-w-md">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              <Layers className="h-8 w-8 text-blue-500" />
              StackFlow
            </h2>
          </div>

          <div className="space-y-6">
            {/* <SignInButton> */}
            <button
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={() => setSignInVisible(true)}
            >
              Login
            </button>
            {/* </SignInButton> */}
          </div>
          <p className="text-center text-sm text-gray-300 pt-5">
            Não tem uma conta?
            <button
              type="button"
              className="ml-1 font-medium text-blue-500 hover:text-blue-400"
              onClick={() => setSignUpVisible(true)}
            >
              Cadastrar
            </button>
          </p>
        </div>
      </div>
      {isSignInVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setSignInVisible(false)}
            >
              <X className="h-6 w-6" />
            </button>

            <SignIn
              appearance={{
                elements: {
                  formButtonPrimary:
                    'bg-blue-500 hover:bg-blue-700 text-sm text-white'
                },
                layout: {
                  socialButtonsVariant: 'iconButton'
                }
              }}
            />
          </div>
        </div>
      )}

      {isSignUpVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setSignUpVisible(false)}
            >
              <X className="h-6 w-6" />
            </button>

            <SignUp
              signUpFallbackRedirectUrl="/dashboard"
              appearance={{
                elements: {
                  formButtonPrimary:
                    'bg-blue-500 hover:bg-blue-700 text-sm text-white'
                },
                layout: {
                  socialButtonsVariant: 'iconButton'
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginScreen
