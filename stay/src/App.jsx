import React from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Header from './component/Header.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import Homepage from './pages/HomePage.jsx';
import Layout from './component/Layout.jsx';
import axios, { Axios } from 'axios';
// Ensure axios defaults are set as early as possible so requests
// from context/providers include credentials and the correct base URL.
axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;
import { UserContextProvider } from './UserContext.jsx';
import PlacesPage from './pages/PlacesPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import PlacesPageFrom from './pages/PlacesPageFrom.jsx';
import PlacePage from './pages/PlacePage.jsx';
import BookedPage from './pages/BookedPage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import BookedDetailsPage from './pages/BookedDetailsPage.jsx';
import { Toaster } from "react-hot-toast";
import HostPage from './pages/HostPage.jsx';
import HostRoute from './component/HostRoute.jsx';

function App() {
  return (
    <UserContextProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#fff",
            color: "#111827",
          },
          success: {
            iconTheme: {
              primary: "#16a34a",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#dc2626",
              secondary: "#fff",
            },
          },
        }}
      />
        <Routes>
            <Route path='/' element={<Layout/>}>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/signup' element={<SignupPage/>}/>
            <Route path='/account/' element={<ProfilePage/>}/>
            <Route path='/account/:subpage' element={<ProfilePage/>}/>
            <Route path='/hosting/listings' element={<PlacesPage/>}/>
            <Route path='/hosting/listings/new' element={<PlacesPageFrom/>}/>
            <Route path='/hosting/listings/:id' element={<PlacesPageFrom/>}/>
            <Route path='/places/:id' element={<PlacePage/>}/>
            <Route path='/account/booked' element={<BookedPage/>}/>
            <Route path='/account/booked/:id' element={<BookedDetailsPage/>}/>
            <Route path='/account/booking/:id' element={<BookingPage/>}/>
            <Route path='/hosting' element={
              <HostRoute>
                <HostPage/>
              </HostRoute>
            }/>
          </Route>
        </Routes>
    </UserContextProvider>
  )
}

export default App