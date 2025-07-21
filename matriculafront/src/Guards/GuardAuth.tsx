
// import useSessionHook from '@/hooks/Usuarios/useSessionHook'
import { Navigate,Outlet } from 'react-router-dom'
// import useSessionHook from '@/hooks/Usuarios/useSession'

const GuardBasic = () => {
    // const { status } = useSessionHook()
    // const navigate = useNavigate()
  
//     if (status === 'authenticated') {
//       // window.location.href = '/b2b'
//       // navigate('/b2b')
//       return <Navigate to='/pos'/> // Evitar renderizar algo mientras redirige
//   }
  // navigate('/b2b/login')
  // window.location.href = '/b2b/login'
  return <Navigate to='/login'/>

}

export default GuardBasic