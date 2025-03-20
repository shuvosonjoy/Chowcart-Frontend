import {Route, Routes, Navigate} from 'react-router-dom'
import Homepage from './pages/home'
import Layout from './layout/layout'
import Login from './pages/login'
import AuthCallback from './pages/auth/authCallbackPage'
import { UserProfile } from './pages/user-profile-page'
import { ProtectedRoute } from './pages/auth/protected-route'
import ManageRestaurantPage from './pages/manageRestaurantPage'
import SearchPage from './pages/searchPage'
import DetailsViewPage from './pages/detailsViewPage'


function App() {
  return (
    <Routes>
      
      <Route path='/' element={ <Layout showHero><Homepage/></Layout>}/>
      <Route path ='/login' element={<Login/>}/>
      <Route path ='*' element={<Navigate to ='/'/>}/>
      <Route path = '/auth-callback' element = {<AuthCallback/>}/>
      <Route path = '/search/:city' element ={<Layout><SearchPage/></Layout>}/>
      <Route path = '/detail/:restaurantId' element ={<Layout><DetailsViewPage/></Layout>}/>

      // Protected Routes
      <Route element={<ProtectedRoute/>}>
      <Route path = '/user-profile' element = {<Layout><UserProfile/></Layout>}/>
      <Route path = '/manage-restaurant' element = {<Layout><ManageRestaurantPage/></Layout>}/>
      </Route>
    
    </Routes>

    
  )
}

export default App;
