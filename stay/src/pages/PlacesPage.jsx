import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../component/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import OptionsModel from "../component/OptionsModel";

export default function PlacesPage(){
    const [places, setPlaces] = useState([]);
    const [OpenMenu, setOpenMenu] = useState(null);
    useEffect(()=>{
        axios.get('/user-places').then((response)=>{
            console.log(response.data);
            setPlaces(response.data);
        })
    },[])

    async function toggleListing(placeId) {
    try {
        await axios.patch(`/places/${placeId}/toggle-listing`);

        setPlaces(prev =>
            prev.map(place =>
                place._id === placeId
                    ? { ...place, isListed: !place.isListed }
                    : place
            )
        );

        setOpenMenu(null);
    } catch (err) {
        console.error(err);
    }
}

    return(
    <div className="w-full px-6 py-8">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
                <div>
                    <AccountNav/>
                </div>
            <div className="mb-3">
                <div className="flex items-center justify-between mt-3 mb-3">
                    <h1 className="text-3xl font-semibold">My Listing</h1>
                    <Link className='bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-semibold transition inline-flex gap-1' to={'/account/places/new'}> 
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
                            <div
                                key={place._id}
                                className="relative bg-gray-200 flex gap-6 rounded-2xl items-stretch">
                                <div className="w-50 h-40 flex-shrink-0 overflow-hidden rounded-l-2xl">
                                    {firstPhoto ? (
                                        <img
                                            className="w-full h-full object-cover"
                                            src={'http://localhost:4000/uploads/' + firstPhoto}
                                            alt={place.title}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                            No photo
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col mb-8 justify-center">
                                    <div className="relative flex items-center justify-between">
                                    <h2 className="text-xl mb-2 font-semibold">{place.title}</h2>
                                     <span className={`absolute right-5 top-1.5 text-xs px-3 py-1 rounded font-medium ${
                                                place.isListed
                                                    ? "bg-green-400 text-white"
                                                    : "bg-amber-100 text-amber-700"
                                            }`}
                                        >
                                            {place.isListed ? "Listed" : "Unlisted"}
                                        </span>
                                        </div>
                                    <p className="w-140 text-sm text-gray-600 mt-2 line-clamp-3">
                                        {place.description}
                                    </p>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <button
                                        onClick={() =>
                                            setOpenMenu(OpenMenu === place._id ? null : place._id)
                                        }
                                        className="p-2 rounded-full hover:bg-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                        </svg>
                                    </button>
                                    {OpenMenu === place._id && (
                                        <>
                                         {/* Backdrop */}
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={() => setOpenMenu(null)}
                                            ></div>
                                        {/* Menu */}
                                        <OptionsModel
                                            place={place}
                                            onClose={() => setOpenMenu(null)}
                                            onToggleListing={toggleListing}
                                        />
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            </div>
        </div>
    </div>
    )   
}