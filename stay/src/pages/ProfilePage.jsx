import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../component/AccountNav";
export default function ProfilePage(){
    const [redirect, setredirect] = useState(null);
    const {ready,user,setUser} = useContext(UserContext); 
    let {subpage} = useParams();
    if (!subpage) {
        subpage = 'profile';
    }  

   async function logout(){
        await axios.post('/logout');
        setredirect(true);
        setUser(null);
    }
    if(!ready){
            return 'Loading..';
    }
    
    if (ready && !user && !redirect){
            return <Navigate to={'/login'}/>
        }
    if(redirect){
        return <Navigate to={'/'}/>
    }
        return(
            <div>
                <AccountNav/>
                {subpage === 'profile' && (
                    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
                        <div className="max-w-md mx-auto">
                            {/* Card */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                {/* Avatar with initials */}
                                <div className="flex justify-center mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className="text-center mb-8">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h1>
                                    <div className="flex items-center justify-center text-gray-600 mb-4">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                        </svg>
                                        <p className="text-sm">{user.email}</p>
                                    </div>
                                </div>

                                {/* Logout Button */}
                                <button 
                                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-xl transition-colors duration-300"
                                    onClick={logout}
                                >
                                    Logout
                                </button>

                                {/* Footer text */}
                                <p className="text-center text-gray-500 text-sm mt-6">
                                    Secure account managed by Airbnb
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                {subpage==='places' && (
                    <PlacesPage/>
                )}
            </div>
        )
}