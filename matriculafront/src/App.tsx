import {BrowserRouter as Router, Route} from 'react-router-dom'
import { lazy,Suspense } from 'react'
import './App.css'
import LoadingGeneral from './Pages/Loading/LoadingGeneral';
import RoutesWithNotFound from './Pages/NoMatch/NotFound';
import GuardBasic from './Guards/GuardAuth';


function App() {
    const handleLogin = (email: string, password: string) => {
    console.log('Datos de login:', { email, password });
    // Aquí puedes agregar la lógica para autenticar al usuario
    // Por ejemplo, llamar a una API, guardar en localStorage, etc.
  };

  return (
    <Router>
      <Suspense fallback={<LoadingGeneral/>}>
        <RoutesWithNotFound/>
        <Route element={<GuardBasic/>}>
            
        </Route>
      </Suspense>
    </Router>
  )
}

export default App
