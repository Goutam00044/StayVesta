import PhotosUploader from "../component/PhotosUploader";
import Perks from "../component/Perks";
import { useState, useEffect } from "react";
import AccountNav from "../component/AccountNav";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

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
    const [redirect, setredirect] = useState('');

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
        })
    }, [id])
    

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
        } 
        if(id){
            await axios.put('/places',{id, ...placeData}

            )
        }
        else{
        await axios.post('/places',placeData);
            
        }
        setredirect(true);
    }

    if(redirect){
        return <Navigate to={'/account/places'}/>
    }

    return(
         <div className="mt-5">
            <AccountNav/> 
            <form onSubmit={savePlace}>
                {/* The Title, Address, Photos Section */}
                {preInput('Title','Title for your place.')}
                <input type="text" placeholder="title, for example: My Love" value={title} onChange={(e)=>{
                    setTitle(e.target.value);
                }}/>

                {preInput('Address','Address to this place')}
                <input type="text" placeholder="address" value={address} onChange={(e)=>{
                    setAddress(e.target.value);}} />
                
                {preInput('Photos','more = better')}
                <PhotosUploader addedPhotos={addedPhotos} onchange={setAddedPhotos}/>
                
                {preInput('Description','description of the places')}
                <textarea value={description} onChange={(e)=>{
                    setDescription(e.target.value);}} />
                
                {preInput('Perks','select all the perks of your places')}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-col-3 lg:grid-cols-6">
                <Perks selected={perks} onChange={setPerks}/>
                </div>

                {preInput('Extra info', 'house rules, etc')}
                <textarea value={extraInfo} onChange={(e)=>{
                    setExtraInfo(e.target.value);}} />
                
                {preInput('Check in&out times','add check in and out')}
                <div className="grid gap-2 sm:grid-cols-3">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input type="text" placeholder="14:00" value={checkIn} onChange={(e)=>{
                            setCheckIn(e.target.value);}}/>
                    </div>
                    
                    <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input type="text" value={checkOut} onChange={(e)=>{
                            setCheckOut(e.target.value);}} />
                    </div>
                        
                    <div>
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input type="number" value={maxGuests} onChange={(e)=>{
                            setMaxGuests(e.target.value);}}/>
                    </div>
                </div>
                <button className="bg-amber-600 px-3 w-full py-1 rounded-2xl">Save</button>
            </form>
        </div>
    )
}