import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
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
            let cls = 'py-2 px-6';
            if (type === subpage) {
                cls += ' bg-amber-600 text-white rounded-2xl';
            }
            return cls;
        }



        return(
            <div>
                <nav className="w-full flex justify-center mt-8 gap-2">
                    <Link className={classes('profile')}to={'/account'}>My Profile</Link>
                    <Link className={classes('booking')} to={'/account/booking'}>My Booking</Link>
                    <Link className={classes('places')} to={'/account/places'}> My Accommodations</Link>
                </nav>
                {subpage === 'profile' && (
                    <div className="text-center max-w-lg mx-auto mt-10">
                        Logged in as {user.name} ({user.email})
                        <button className="primary max-w-sm mt-3" onClick={logout}> Logout </button>
                    </div>
                )}
            </div>
        )
}