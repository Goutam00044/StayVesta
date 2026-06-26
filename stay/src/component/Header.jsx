import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";

export default function Header() {
  const {user}= useContext(UserContext);
    return(
        <>
        <header className="mb-4 flex items-center justify-between">
        {/* This is Logo for Our APP */}
        <div>
          <a href="/" className="logo font-bold">StayVersta</a>
        </div>
        {/* This is Login and Signup for Our APP */}
        <div className='flex items-center gap-4'>
          {!!user &&(
            <Link to={'/account'}>
              {user.name}
            </Link>
          )}
          <Link to="/login" className="font-bold">Log in</Link>
          <a href="" className="font-bold">Sign up</a>

          <button className='border border-black text-black px-3 py-1 rounded-l-2xl rounded-r-2xl'>Become a host</button>
        </div>
      </header>

      {/* This is Search Module for Our APP */}
      <div className='flex gap-2 border rounded-full py-4 px-2'>
        <div>Where to?</div>
        <div className="border-l border-gray-400"></div>
        <div>When?</div>
        <div className="border-l border-gray-400"></div>
        <div>Who's going? </div>
        <button className='bg-amber-600 text-white px-3 py-1 rounded-l-2xl rounded-r-2xl' >Search</button>
      </div>
        </>
    )
}