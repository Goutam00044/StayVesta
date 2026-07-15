import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../component/AccountNav";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import OptionsModel from "../component/OptionsModel";
import DeletePlaceModal from "../component/DeletePlaceModal";
import toast from "react-hot-toast";
import ConfirmAction from "../component/ConfirmAction";
import { UserContext } from "../UserContext";

export default function PlacesPage(){
    const { user, ready } = useContext(UserContext);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [places, setPlaces] = useState([]);
    const [OpenMenu, setOpenMenu] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null);
    const activeListings = places.filter(place => place.isListed).length;
    const inactiveListings = places.filter(place => !place.isListed).length;
    const totalListings = places.length;
    useEffect(()=>{
        axios.get('/user-places').then((response)=>{
            console.log(response.data);
            setPlaces(response.data);
        })
    },[])

    if (!ready) return null;
    if (!user?.isHost) {
        return <Navigate to="/" />;
    }

    console.log(showDeleteModal);
    async function toggleListing(placeId) {
    try {
        // These are for Toast response based on listed or unlisted
        const currentPlace = places.find(place => place._id === placeId);
        const willBeListed = !currentPlace.isListed;
        //API calling to Toggle
        await axios.patch(`/places/${placeId}/toggle-listing`);
        setPlaces(prev =>
            prev.map(place =>
                place._id === placeId
                    ? { ...place, isListed: !place.isListed }
                    : place
            )
        );
        setOpenMenu(null);
        toast.success(
            willBeListed
            ? "Property listed successfully!"
            : "Property unlisted successfully!"
        );
    } catch (err) {
        console.error(err);
    }
    }
    //Delete the property on confirm delete by owner
    async function deletePlace() {
    try {
        await axios.delete(`/places/${selectedPlace._id}`);
        // Remove the deleted place from the UI
        setPlaces(prev =>
            prev.filter(place => place._id !== selectedPlace._id)
        );
        toast.success("Property deleted successfully!");
        // Close modal
        setShowDeleteModal(false);
        setSelectedPlace(null);
        
    } catch (err) {
        toast.error(
                err.response?.data?.error ||
                "Failed to delete property."
            );
    }
}
    return(
    <div className="w-full px-6 py-8">
                    {/* <div className="mt-3 mb-6 mx-18">
                    <Link className='bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-semibold transition inline-flex gap-1' 
                           to={'/hosting/listings/new'}> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Places
                    </Link>
                </div> */}
        <div className="max-w-4xl mx-auto">            
            {/* <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
                <div>
                    <AccountNav/>
                </div> */}
            <div className="mb-8">
             <div className="flex flex-col gap-3">
                <div className="mt-4">
                    {/* Header */}
                   <div className="flex items-center justify-between">
                     <div>
                        <h1 className="text-3xl font-semibold">
                        My Listing
                        </h1>
                        <p className="text-gray-500 text-md">
                            Manage all your accommodations.
                        </p>
                     </div>

                    <Link
                        className="bg-amber-600 hover:bg-amber-700  text-white px-6 py-2 rounded font-semibold transition inline-flex gap-2"
                        to="/hosting/listings/new">
                        Add Listing
                    </Link>
                   </div>
                </div>
                <div className="mt-6 mb-2 border border-gray-400 rounded-3xl bg px-2 py-2 bg-white">
                <div className="flex justify-end-safe gap-6">
                    <div className="flex gap-1 border border-gray-300 py-1 rounded-2xl bg-gray-200 px-4 items-center">
                        <p className="font-semibold text-green-800 ">
                            Active 
                        </p>
                        <p className="text-md text-gray-700">
                            ({activeListings})
                        </p>
                    </div>
                    <div className="flex gap-1 border border-gray-300 py-1 rounded-2xl bg-gray-200 px-4 items-center">
                        <p className="font-semibold text-orange-800 ">
                            Inactive
                        </p>

                        <p className="text-md text-gray-700">
                            ({inactiveListings})
                        </p>
                    </div>
                    <div className="flex gap-1 border border-gray-300 py-1 rounded-2xl bg-gray-200 px-4 items-center">
                        <p className="font-semibold text-gray-900 ">
                            Total Listings
                        </p>

                        <p className="text-md text-gray-700">
                            ({totalListings})
                        </p>
                    </div>
                </div>

            </div>
                {places.length > 0 && places.map((place) => {
                    const firstPhoto = place.photos?.[0] || place.addedPhotos?.[0];
                    return (
                            <div
                                key={place._id}
                                className="relative hover:bg-gray-100 shadow-md hover:shadow-lg border border-gray-300 flex rounded items-stretch">
                                <div className="w-50 h-42 flex-shrink-0 overflow-hidden rounded-l">
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
                                <div className="flex flex-col w-full justify-center">
                                    <div className="relative flex items-center justify-between">
                                    <h2 className="text-xl ml-6 py-4 font-semibold">{place.title}</h2>
                                     
                                    </div>
                                    <p className="w-150 ml-6 mb-3 line-clamp-2 text-sm text-gray-600">
                                        {place.description}
                                    </p>
                                    <div className="w-full flex flex-row items-center p-2 h-12 relative mt-2">
                                        <div className="px-4 font-semibold text-sm">
                                            ₹ {place.price}.00
                                        </div>
                                        <button 
                                            onClick={() =>
                                            setOpenMenu(OpenMenu === place._id ? null : place._id)
                                            }
                                            className="text-amber-500 hover:text-amber-600 hover:cursor-pointer font-semibold text-sm absolute right-57">
                                            More Actions
                                        </button>
                                        <div className="absolute right-30">
                                            <Link
                                                to={`/hosting/listings/${place._id}`}
                                                className="px-6 py-1.5 hover:cursor-pointer font-semibold text-sm rounded border text-orange-400 border-orange-400 hover:text-orange-600 hover:border-orange-600 ">
                                                Modify
                                            </Link>
                                        </div>
                                        <div className="absolute right-4">
                                            <Link 
                                                to={`/places/${place._id}`}
                                                className="px-8 py-1.5 hover:cursor-pointerrounded border font-semibold text-sm text-white bg-orange-400 hover:bg-orange-500">
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="absolute right-4 top-3.5">
                                <span 
                                    className={`min-w-[90px] px-4 py-2 rounded-2xl border border-gray-300 text-xs font-medium flex items-center justify-center gap-1
                                            ${
                                            place.isListed
                                                ? "bg-lime-50 text-gray-800"
                                                : "bg-orange-50 text-gray-800"
                                            }`}
                                        >
                                        {place.isListed ? "🟢 Active" : "🟠 Inactive"}
                                </span>
                                </div>
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
                                            onToggleListing={()=>{
                                                setConfirmAction(place);
                                                setOpenMenu(null);
                                            }   
                                            }
                                            onDelete ={(place)=>{
                                                setSelectedPlace(place);
                                                setShowDeleteModal(true);
                                            }}
                                        />
                                        </>
                                    )}
                                    {confirmAction && (
                                        <ConfirmAction
                                            place={confirmAction}
                                            onCancel={() => setConfirmAction(null)}
                                            onConfirm={()=>{
                                                toggleListing(confirmAction._id)
                                                setConfirmAction(null);
                                            }}
                                        />
                                    )}
                                    {showDeleteModal && selectedPlace && (
                                        <DeletePlaceModal
                                            place={selectedPlace}
                                            onClose={() => {
                                                setShowDeleteModal(false);
                                                setSelectedPlace(null);
                                            }}
                                            onConfirm={deletePlace}
                                        />
                                    )}
                            </div>
                        );
                    })}
                </div>
            </div>
            </div>
        {/* </div> */}
    </div>
    )   
}