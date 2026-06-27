import React from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Header from './component/Header.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Homepage from './pages/HomePage.jsx';
import Layout from './component/Layout.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import axios, { Axios } from 'axios';
// Ensure axios defaults are set as early as possible so requests
// from context/providers include credentials and the correct base URL.
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;
import { UserContextProvider } from './UserContext.jsx';
import PlacesPage from './pages/PlacesPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import PlacesPageFrom from './pages/PlacesPageFrom.jsx';
import PlacePage from './pages/PlacePage.jsx';
import BookedPage from './pages/BookedPage.jsx';
import BookingPage from './pages/BookingPage.jsx';

function App() {
  return (
    <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/account/' element={<ProfilePage/>}/>
            <Route path='/account/:subpage' element={<ProfilePage/>}/>
            <Route path='/account/places' element={<PlacesPage/>}/>
            <Route path='/account/places/new' element={<PlacesPageFrom/>}/>
            <Route path='/account/places/:id' element={<PlacesPageFrom/>}/>
            <Route path='/places/:id' element={<PlacePage/>}/>
            <Route path='/account/booking/' element={<BookedPage/>} />
            <Route path='/account/booking/:id' element={<BookingPage/>}/>
          </Route>
        </Routes>
    </UserContextProvider>
  )
}

export default App