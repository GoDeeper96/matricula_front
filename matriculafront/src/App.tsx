import {BrowserRouter as Router, Route} from 'react-router-dom'
import { lazy,Suspense } from 'react'
import './App.css'
import LoadingGeneral from './Pages/Loading/LoadingGeneral';
import RoutesWithNotFound from './Pages/NoMatch/NotFound';
import GuardBasic from './Guards/GuardAuth';
import { PublicRoutes } from './routes/Public';
import LoginForm from './Pages/Login/LoginForm';
import { PrivateRoutes } from './routes/PrivateRoutes/Private';


const Login = lazy(()=>import('./Pages/Login/LoginForm'))
const Layout = lazy(()=>import('./Pages/Home/Layout'))
const Home = lazy(()=>import('./Pages/Home/Home'))
function App() {

  return (

    <Router>
      <Suspense fallback={<LoadingGeneral/>}>
        <RoutesWithNotFound>
        <Route element={<GuardBasic/>}>
            <Route path={`${PrivateRoutes.PORTAL_GENERAL}`}  element={<Layout/>}>
              <Route index element={<Home/>}/>
            </Route>
        </Route>
          <Route index path={`${PublicRoutes.LOGIN}`} element={<Login/>}/>
          </RoutesWithNotFound>
      </Suspense>
    </Router>

  )
}

export default App
