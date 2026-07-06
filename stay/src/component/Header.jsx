import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext, useState, useEffect } from "react";
import { format, addDays } from 'date-fns';

export default function Header() {
    const {user}= useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [destination, setDestination] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);

    async function handleSearch(){
            const params = new URLSearchParams();
            if (destination)
                params.append("destination", destination);
            if (checkIn)
                params.append("checkIn", checkIn);
            if (checkOut)
                params.append("checkOut", checkOut);
            if (guests)
                params.append("guests", guests);
              console.log(params);
            navigate("/?" + params.toString());
    }

    useEffect(()=>{
        const params = new URLSearchParams(location.search);
        setDestination(params.get("destination") || "");
        // Instead default value for checkIn and checkOut, we can set them to today's date and two days later respectively if they are not provided in the URL parameters.
        const today = new Date();
        const checkOutDate = addDays(today, 2);
        setCheckIn(params.get("checkIn") || format(today,'yyyy-MM-dd'));
        setCheckOut(params.get("checkOut") || format(checkOutDate,'yyyy-MM-dd'));
        setGuests(params.get("guests") || 1);

    }, [location.search]);

    return(
        <>
        <header className="mb-4 flex items-center justify-between">
        {/* This is Logo for Our APP */}
        <Link to={"/"} className="logo font-bold">
        StayVersta
        </Link>
        {/* This is Login and Signup for Our APP */}
        <div className='flex items-center gap-4'>
          {!!user &&(
            <Link to={'/account'}>
              {user.name}
            </Link>
          )}
          {!user &&(
            <>
            <Link to="/login" className="font-bold">Log in</Link>
            <Link to="/signup" className="font-bold">Sign up</Link>
            </>   
          )}
          
          <button className='border-2 border-black text-black px-3 py-1 rounded-l-2xl rounded-r-2xl'>Become a host</button>
        </div>
      </header>

      {/* This is Search Module for Our APP */}
        <div className="grid grid-cols-[2.0fr_1.4fr_1.4fr_1fr_auto] gap-0 items-center bg-white rounded-full shadow-md hover:shadow-lg border border-gray-200 overflow-hidden">
            {/* Location */}
            <div className="px-4 py-3 border-r border-gray-200">
                <p className="text-xs pl-3 tracking-wider uppercase font-semibold translate-y-1 text-black ">
                    Location
                </p>
                <input
                    type="text"
                    placeholder="Where to?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full h-8 bg-transparent text-md placeholder-gray-400 search focus:outline-none leading-none"
                />
            </div>

            {/* Check In */}
            <div className="px-6 py-3 border-r border-gray-200">
                <p className="text-xs uppercase font-semibold tracking-wider text-black">
                    Check In
                </p>
                <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full h-8 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none leading-none"
                />
            </div>

            {/* Check Out */}
            <div className="px-6 py-3 border-r border-gray-200">
                <p className="text-xs uppercase font-semibold tracking-wider text-black">
                    Check Out
                </p>
                <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full h-8 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none leading-none"
                />
            </div>

            {/* Guests */}
            <div className="px-6 py-3">
                <p className="text-xs uppercase translate-y-1 font-semibold tracking-wider text-black">
                    Guests
                </p>
                <input
                    type="number"   
                    min="1"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full h-8 bg-transparent text-gray-900 search placeholder-gray-400 focus:outline-none leading-none"
                />
            </div>

            {/* Search */}
            <div className="px-3">
                <button
                    onClick={handleSearch}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold transition"
                >
                    Search
                </button>
            </div>
        </div>
        </>
    )
}