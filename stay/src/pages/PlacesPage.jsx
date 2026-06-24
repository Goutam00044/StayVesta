import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../component/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacesPage(){
    const [places, setPlaces] = useState([]);
    useEffect(()=>{
        axios.get('/places').then((response)=>{
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
            <div>
                {places.length > 0 && places.map((place)=> (
                    <Link to={'/account/places/'+place._id} className="bg-gray-200 flex gap-4 p-4 rounded-2xl cursor-pointer">
                        <div className="h-32 w-32 border">
                            {place.photos.length >0 && (
                                <img src="{place.photos[0]}" alt="" />
                            )}
                        </div>
                        <div className="grow-0 shrink" key={place._id || place.title}>
                            <h2 className="text-xl">{place.title}</h2>
                            <p className="text-sm mt-2">{place.description}</p>
                        </div>
                    </Link>
                  
                ))}
            </div>
        </div>
    )   
}