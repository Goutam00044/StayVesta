import { useContext, useState } from "react";
import { Link, Navigate, useLocation, } from "react-router-dom";
import { UserContext } from "../UserContext";
import LogoutButton from "../component/LogoutButton";

export default function AccountNav() {
    const {ready,user,setUser} = useContext(UserContext); 
    const {pathname} = useLocation();
    let subpage = pathname.split('/')?.[2];
    if(subpage === undefined){
        subpage = 'profile';
    }

    function classes(type){
        let cls = 'flex items-center gap-3 px-4 py-3 border-l-[3px] transition-colors';
        if(type === subpage){
            cls += ' bg-transparent border-amber-600';
        } else {
            cls += ' border-transparent hover:bg-gray-50';
        }
        return cls;
    }

    function textClasses(type){
        return type === subpage 
            ? 'text-[14.5px] font-semibold text-gray-900' 
            : 'text-[14.5px] text-gray-600';
    }

    function iconColor(type){
        return type === subpage ? '#d97706' : '#9ca3af';
    }

   
    if(!ready){
            return 'Loading..';
    }
    
    if (ready && !user){
            return <Navigate to={'/login'}/>
        }
    


    return(
        <nav className="flex flex-col gap-0.5 w-64 mt-2">
            <h2 className="text-3xl font-semibold mb-4 px-2 py-2">Account</h2>
            <Link className={classes('profile')} to={'/account'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={iconColor('profile')} className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <span className={textClasses('profile')}>My Profile</span>
            </Link>

            <Link className={classes('booked')} to={'/account/booked'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={iconColor('booked')} className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span className={textClasses('booked')}>My Bookings</span>
            </Link>

            {/* Not needed this part we completely moved to Host Dashboard as feature corresponding to it  */}
            {/* <Link className={classes('places')} to={'/account/places'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={iconColor('places')} className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                </svg>
                <span className={textClasses('places')}>My Accommodations</span>
            </Link> */}

            <div className="h-px bg-gray-200 my-2.5 mx-1"></div>

            <LogoutButton className="pl-1" mobile />
        </nav>
    )
}