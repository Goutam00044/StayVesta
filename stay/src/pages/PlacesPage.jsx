import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../component/AccountNav";

export default function PlacesPage(){
    return(
       <div>
        <AccountNav/>
        <div className="mt-5"> 
            <div className="text-center">
                <Link className='bg-amber-600 inline-flex text-white px-4 py-1 rounded-2xl gap-1' to={'/account/places/new'}> 
                    {/* Plus Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Places
                </Link>
            </div>
        </div>
        </div>
    )   
}