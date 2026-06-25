import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../component/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacesPage(){
    const [places, setPlaces] = useState([]);
    useEffect(()=>{
        axios.get('/user-places').then((response)=>{
            console.log(response.data);
            setPlaces(response.data);
        })
    },[])
    return(
       <div>
        <AccountNav/>
            <div className="text-center">
                <Link className='bg-amber-600 inline-flex text-white px-4 py-1 rounded-2xl gap-1' to={'/account/places/new'}> 
                    {/* Plus Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Places
                </Link>
            </div>
            <div className="flex flex-col gap-3">
                {places.length > 0 && places.map((place) => {
                    const firstPhoto = place.photos?.[0] || place.addedPhotos?.[0];
                    return (
                        <Link
                            key={place._id || place.title}
                            to={'/account/places/' + place._id}
                                    className="bg-gray-200 flex gap-4 md:gap-6 p-4 rounded-2xl cursor-pointer items-center"                        >
                            <div className="h-32 w-38 flex-shrink-0 overflow-hidden rounded-2xl border">
                                {firstPhoto ? (
                                    <img className="w-full h-full object-cover" src={'http://localhost:4000/uploads/' + firstPhoto} alt={place.title || 'Place photo'} />
                                ) : (
                                    <div className="text-xs text-gray-500 p-2">No photo</div>
                                )}
                            </div>
                            <div className="flex flex-col justify-center">
                                <h2 className="text-xl font-semibold">{place.title}</h2>
                                <p className="text-sm text-gray-600 mt-1">{place.description}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    )   
}