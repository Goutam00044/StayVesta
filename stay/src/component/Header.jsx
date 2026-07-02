import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext, useState } from "react";

export default function Header() {
    const {user}= useContext(UserContext);
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
          <Link to="/login" className="font-bold">Log in</Link>
          <Link to="/register" className="font-bold">Sign up</Link>
          <button className='border border-black text-black px-3 py-1 rounded-l-2xl rounded-r-2xl'>Become a host</button>
        </div>
      </header>

      {/* This is Search Module for Our APP */}
      <div className='flex gap-2 border rounded-full py-4 px-2 justify-around'>
        <input
            type="text"
            placeholder="Where to?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="outline-none px-2 w-40"
        />
        <div className="border-l border-gray-400"></div>
          <div className="flex items-center gap-2">
            <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="outline-none"
            />
            <span>-</span>
            <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="outline-none"
            />
        </div>
        <div className="border-l border-gray-400"></div>
        <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-16 outline-none"
        />
          <button
              onClick={handleSearch}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full"
          >
              Search
          </button>      
        </div>
        </>
    )
}