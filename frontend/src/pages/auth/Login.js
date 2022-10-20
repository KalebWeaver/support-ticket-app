import { useState, useEffect } from 'react'
import { useForm } from '../../utils/hooks'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/auth/authSlice'
import { useLoginMutation } from '../../app/services/auth'
import { toast } from 'react-toastify'

import Loading from '../../components/main/Loading'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  const { onChange, onSubmit, setValues, values } = useForm(loginUser, {
    username: '',
    password: '',
  })

  const [remember, setRemember] = useState(values.username ? true : false)

  useEffect(() => {
    const userName = localStorage.getItem('userName')

    if (userName !== null) {
      setValues({ ...values, username: userName })
      setRemember(true)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (remember === true) {
      localStorage.setItem('userName', values.username)
    } else {
      localStorage.removeItem('userName')
    }
  }, [remember, values.username])

  async function loginUser() {
    try {
      const userData = await login(values).unwrap()
      dispatch(setCredentials(userData))
      navigate('/')
    } catch (error) {
      toast.error(error.data)
    }
  }

  const content = isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-4xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-lg text-gray-600">
            Or{' '}
            <Link
              to="/register"
              className="font-medium text-cyan-600 hover:text-cyan-500"
            >
              register a new user
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={onChange}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={onChange}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    name="remember"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-cyan-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )

  return content
}
