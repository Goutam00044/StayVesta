import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
export default function AccountPage(){
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
    function classes(type = null) {
            let cls = 'py-2 px-6 inline-flex gap-1 rounded-2xl';
            if (type === subpage) {
                cls += ' bg-amber-600 text-white rounded-2xl';
            }
            else{
                cls += ' bg-gray-300';
            }
            return cls;
        }



        return(
            <div>
                <nav className="w-full flex justify-center mt-8 gap-2">
                    <Link className={classes('profile')}to={'/account'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        My Profile
                    </Link>
                    <Link className={classes('booking')} to={'/account/booking'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        My Booking</Link>
                    <Link className={classes('places')} to={'/account/places'}> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                        </svg>
                        My Accommodations
                    </Link>
                </nav>
                {subpage === 'profile' && (
                    <div className="text-center max-w-lg mx-auto mt-10">
                        Logged in as {user.name} ({user.email})
                        <button className="primary max-w-sm mt-3" onClick={logout}> Logout </button>
                    </div>
                )}
                {subpage==='places' && (
                    <PlacesPage/>
                )}
            </div>
        )
}