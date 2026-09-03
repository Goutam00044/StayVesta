import PhotosUploader from "../component/PhotosUploader";
import Perks from "../component/Perks";
import { useState, useEffect, useContext } from "react";
import AccountNav from "../component/AccountNav";
import axios from "axios";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../UserContext";

export default function PlacesPageFrom(){
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    const [price, setprice] = useState(0)
    const [redirect, setredirect] = useState('');
    const navigate = useNavigate();
    const { user, ready } = useContext(UserContext);


    useEffect(() => {
      if(!id){
        return;
    }
        axios.get('/places/'+id).then((response)=>{
                const place = response.data;
                console.log('loaded place', place);
                setTitle(place.title);
                setAddress(place.address);
                setAddedPhotos(place.photos || []);
                setDescription(place.description);
                setPerks(place.perks || []);
                setExtraInfo(place.extraInfo);
                setCheckIn(place.checkIn);
                setCheckOut(place.checkOut);
                setMaxGuests(place.maxGuests);
                setprice(place.price);
        })
    }, [id])

    if (!ready) return null;
    if (!user?.isHost) {
        return <Navigate to="/" />;
    }

    function inputHeader(text) {
    return (
             <h2 className="text-2xl mt-4">{text}</h2>
        )
    }
    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }
    function preInput(header,description) {
        return (
            <>
            {inputHeader(header)}
            {inputDescription(description) }
            </>
        );
    }

    async function savePlace(ev){
        ev.preventDefault();
        const placeData ={
                        title,
                        address,
                        photos: addedPhotos,
                        description,
                        perks,
                        extraInfo,
                        checkIn,
                        checkOut,
                        maxGuests,
                        price,
        } 
        if(id){
            await axios.put('/places',{id, ...placeData}

            )
        }
        else{
        await axios.post('/places',placeData);
            
        }
        toast.success(
        id
        ? "Property updated successfully!"
        : "Property added successfully!"
        );
        setredirect(true);
    }

    if(redirect){
        return <Navigate to={'/hosting/'}/>
    }

    return(
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-3 py-5 sm:px-6 sm:py-4 lg:px-8">
                {/* Header Section */}
                <div className="mb-8 sm:mb-12">
                    
                    <h1 className="text-3xl sm:text-4xl px-2 font-semibold text-gray-900 mb-2">
                        {id ? 'Update your property' : 'List your property'}
                    </h1>
                    <p className="text-lg px-2 text-gray-600">
                        {id ? 'Update your property details of your accommodation' : 'Share the details of your property to showcase it, so guests can discover and book it'}
                    </p>
                </div>

                <form onSubmit={savePlace} className="space-y-8">
                    
                    {/* Section 1: Basic Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <div className="flex items-center mb-5">
                            <div className="flex items-center justify-center w-8 h-8 rounded bg-amber-400 font-semibold text-white text-sm mr-3">
                                1
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">The Basics</h2>
                        </div>

                        {/* Property Name */}
                        <div className="mb-6">
                            {preInput('Property name', 'Give your property a memorable name..')}
                            <input 
                                type="text" 
                                placeholder="e.g, Cozy Beachfront Villa" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            {preInput('Location', 'Provide the exact location of your property')}
                            <input 
                                type="text" 
                                placeholder="Street address, city, state" 
                                value={address} 
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                            />
                        </div>
                    </div>

                    {/* Section 2: Photos */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <div className="flex items-center mb-5">
                            <div className="flex items-center justify-center w-8 h-8 rounded bg-amber-400 font-semibold text-white text-sm mr-3">
                                2
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Photos</h2>
                        </div>

                        {preInput('Upload Photos', 'Upload photos that showcase your space.')}
                        <PhotosUploader addedPhotos={addedPhotos} onchange={setAddedPhotos} placeId={id} />
                    </div>

                    {/* Section 3: Description & Details */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <div className="flex items-center mb-5">
                            <div className="flex items-center justify-center w-8 h-8 rounded bg-amber-400 font-semibold text-white text-sm mr-3">
                                3
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">About your Property</h2>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            {preInput('About Place', 'Describe your property and what makes it special..')}
                            <textarea 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Tell guests what makes your property unique... What's the best thing about it? What are the key features?"
                                rows="5"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition resize-none"
                            />
                        </div>

                        {/* Extra Info */}
                        <div>
                            {preInput('House Rules & Extra Info', 'Set expectations about noise, pets, parties, smoking, etc.')}
                            <textarea 
                                value={extraInfo} 
                                onChange={(e) => setExtraInfo(e.target.value)}
                                placeholder="Share important information like house rules, parking, or check-in instructions."
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition resize-none"
                            />
                        </div>
                    </div>

                    {/* Section 4: Amenities & Perks */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <div className="flex items-center mb-5">
                            <div className="flex items-center justify-center w-8 h-8 rounded bg-amber-400 font-semibold text-white text-sm mr-3">
                                4
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Amenities & Perks</h2>
                        </div>

                        {preInput('Select Amenities', 'Choose all the amenities your place offers')}
                        <div className="px-4 py-4">
                            <Perks selected={perks} onChange={setPerks} variant="form"/>
                        </div>
                    </div>

                    {/* Section 5: Booking Settings */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <div className="flex items-center mb-5">
                            <div className="flex items-center justify-center w-8 h-8 rounded bg-amber-400 font-semibold text-white text-sm mr-3">
                                5
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Booking Settings</h2>
                        </div>

                        {preInput('Check-in, Check-out & Pricing', 'Set your availability window and pricing')}
                        
                        <div className="m-3 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {/* Check In */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Time</label>
                                <input 
                                    type="text" 
                                    placeholder="9:00 AM" 
                                    value={checkIn} 
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                                />
                            </div>
                            
                            {/* Check Out */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Time</label>
                                <input 
                                    type="text" 
                                    placeholder="11:00 PM" 
                                    value={checkOut} 
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                                />
                            </div>
                            
                            {/* Max Guests */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Max Guests</label>
                                <input 
                                    type="number" 
                                    value={maxGuests} 
                                    onChange={(e) => setMaxGuests(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price per Night ₹</label>
                                <div className="relative">
                                    <span className="absolute right-4 top-4">₹</span>
                                    <input 
                                        type="number" 
                                        value={price} 
                                        onChange={(e) => setprice(e.target.value)}
                                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                                    />
                                </div>
                            </div> 
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3 mb-20">
                        <button type="button" onClick={() => navigate(-1)} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg transition duration-200 transform shadow-md"
                        >
                            {id ? 'Cancel' : 'Back'}
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 bg-amber-700 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 transform shadow-md"
                        >
                            {id ? 'Save listing' : 'Create a new listing'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}