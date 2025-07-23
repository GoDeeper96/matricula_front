
import { Navigate,Outlet } from 'react-router-dom'

import { useAuthStore } from '../hooks/Auth/useAuthContext'
import { PublicRoutes } from '../routes/Public'
// import useSessionHook from '@/hooks/Usuarios/useSession'

const GuardBasic = () => {
    // const { status } = useSessionHook()
    const {isAuthenticated } = useAuthStore()
    console.log(isAuthenticated)

    if(isAuthenticated)
    {

      return <Outlet/>
    }
//     if (status === 'authenticated') {
//       // window.location.href = '/b2b'
//       // navigate('/b2b')
//       return <Navigate to='/pos'/> // Evitar renderizar algo mientras redirige
//   }
  // navigate('/b2b/login')
  // window.location.href = '/b2b/login'
  return <Navigate to={PublicRoutes.LOGIN}/>;

}

export default GuardBasic