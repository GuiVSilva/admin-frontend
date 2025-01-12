import { useState } from 'react'
import { Mail, Lock, Layers } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Boxes from '../../assets/boxes.gif'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate('/dashboard')
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="block w-full pl-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Digite seu email"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="block w-full pl-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Digite sua senha"
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Login
            </button>
            <div className="text-center">
              <button
                type="button"
                className="text-sm font-medium text-blue-500 hover:text-blue-400"
              >
                Esqueceu a senha?
              </button>
            </div>

            <p className="text-center text-sm text-gray-300">
              Não tem uma conta?
              <button
                type="button"
                className="ml-1 font-medium text-blue-500 hover:text-blue-400"
              >
                Cadastrar
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
