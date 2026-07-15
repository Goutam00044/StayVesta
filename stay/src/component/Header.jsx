import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext, useState, useEffect } from "react";
import { format, addDays } from 'date-fns';
import SearchModel from "./SearchModel";
import axios from "axios";
import toast from "react-hot-toast";

export default function Header() {
    const {user, setUser, hostMode, setHostMode }= useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const isHostingPage = location.pathname.startsWith("/hosting");
    
    async function handleBecomeHost(){
      try{
        const {data} = await axios.patch("/user/become-host",{},{
                withCredentials:true
            });
            console.log(data.user);
            setUser(data.user);
            setHostMode(true);
            navigate("/hosting");
            toast.success("Switched to Host")
      }
      catch(error){
        console.log(error.response?.data || error.message);
      }
    }
    function switchToUser() {
      setHostMode(false);
      navigate("/");
      toast.success("Switched to User")
      }

    function switchToHost() {
    setHostMode(true);
    navigate("/hosting");
    toast.success("Switched to Host");
    }
    return(
        <>
        <header className="p-4 flex items-center justify-between">
        {/* This is Logo for Our APP */}
        <Link to={"/"} className="logo font-bold">
        StayVersta
        </Link>
        {/* This is Login and Signup for Our APP */}
        <div className='flex items-center gap-4'>
          {!!user &&(
            <Link to={'/account'}>
              <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white text-xl flex-shrink-0">
                  {user.fname.charAt(0).toUpperCase()}
              </div>
            </Link>
          )}
          {!user &&(
            <>
            <Link to="/login" className="font-bold">Log in</Link>
            <Link to="/signup" className="font-bold">Sign up</Link>
            </>   
          )}
          
          {!user?.isHost ? (
                <button
                    onClick={handleBecomeHost}
                    className="border-2 border-black px-3 py-1 rounded-full"
                >
                    Become a Host
                </button>

            ) : isHostingPage ? (

                <button
                    onClick={() => {
                        navigate("/");
                        toast.success("Switched to User");
                    }}
                    className="border-2 border-black px-3 py-1 rounded-full"
                >
                    Switch to User
                </button>

            ) : (

                <button
                    onClick={() => {
                        navigate("/hosting");
                        toast.success("Switched to Hosting");
                    }}
                    className="border-2 border-black px-3 py-1 rounded-full"
                >
                    Switch to Hosting
                </button>

            )}
        </div>
      </header>

      {/* This is Search Module for Our APP */}
        {/* <SearchModel/> */}
        </>
    )
}