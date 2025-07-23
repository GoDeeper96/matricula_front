import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'
import { PublicRoutes } from '../routes/Public'
import { useAuthStore } from '../hooks/Auth/useAuthContext'

export default function GuardRoutes() {
  const { isAuthenticated} = useAuthStore()
  if(isAuthenticated)
  {
    return ( <div>404</div>)
  }
  
  return ( <Navigate to={PublicRoutes.LOGIN}/>)

}