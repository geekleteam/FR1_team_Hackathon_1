import {useAuth0} from '@auth0/auth0-react'
import useAuth from '../../hooks/useAuth'

const loginButton = () => {

    const {logout,isAuthenticated} = useAuth0();
    const {setAuth} = useAuth()

    const handleLogout = () => {
        setAuth({})
        logout()
    }

  return (
    isAuthenticated && <button 
    className="logout-button px-4 py-2 rounded-md text-primary-green border border-hovergreen hover:bg-hovergreen hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green disabled:opacity-50"
    onClick={handleLogout}>
        Sign Out
    </button>
  )
}

export default loginButton