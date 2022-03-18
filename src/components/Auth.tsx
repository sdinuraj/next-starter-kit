import { FunctionComponent, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { useFormFields } from '~/lib/utils'
import { useAuth } from '~/lib/auth'
import Spinner from '~/components/Spinner'

type SignUpFieldProps = {
  email: string
  password: string
}

const FORM_VALUES: SignUpFieldProps = {
  email: '',
  password: '',
}

const Auth: FunctionComponent = () => {
  const [isSignIn, setIsSignIn] = useState(true)
  const { loading, signIn, signUp, signInWithProvider } = useAuth()
  const [values, handleChange, resetFormFields] =
    useFormFields<SignUpFieldProps>(FORM_VALUES)

  const handleSumbit = async (event: React.FormEvent) => {
    event.preventDefault()
    isSignIn ? await signIn(values) : await signUp(values)
    resetFormFields()
  }

  return (
    <div className="w-full flex flex-col justify-center items-center relative">
      {/* Sign Up form --> */}
      <form className="w-full sm:w-1/2 xl:w-1/3" onSubmit={handleSumbit}>
        <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
          <button
            onClick={(evt) => {
              evt.preventDefault()
              signInWithProvider('github')
            }}
            className="btn btn-block gap-2"
          >
            <FaGithub className="inline-block text-2xl" />
            {isSignIn ? 'Log In' : 'Sign Up'} with Github
          </button>
          <hr className="my-4" />
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-semibold text-gray-800 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="h-12 px-4 py-2 bg-white rounded shadow-inner border-gray-300 w-full border  hover:border-gray-400"
              placeholder="Your Email"
              required
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-semibold text-gray-800 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="h-12 px-4 py-2 bg-white rounded shadow-inner border-gray-300 w-full border hover:border-gray-400"
              placeholder="Your password. Leave empty for password-less login"
              value={values.password}
              onChange={handleChange}
            />
          </div>

          {/* <!-- Sign Up & Sign In form: Actions --> */}

          <div className="flex pt-4 gap-2">
            <button
              type="submit"
              // className="flex-1 bg-gray-500 border border-gray-600 text-white py-3 rounded w-full text-center shadow"
              className={`btn btn-primary btn-wide ${loading ? 'loading' : ''}`}
            >
              {loading ? '' : isSignIn ? 'Log In' : 'Sign Up'}
            </button>
            <div className="flex-1 text-right">
              <small className="block text-gray-600">
                {isSignIn ? 'Not a member yet?' : 'Already a member?'}{' '}
              </small>
              <a
                className="block font-semibold"
                href=""
                onClick={(e) => {
                  e.preventDefault()
                  setIsSignIn(!isSignIn)
                }}
              >
                {isSignIn ? 'Sign Up' : 'Log In'}
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Auth
