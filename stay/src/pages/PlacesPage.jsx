import { Link, useParams } from "react-router-dom";
import Perks from "../component/Perks";
import { useState } from "react";
import axios from "axios";

export default function PlacesPage(){
    const {action} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink,setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
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
    async function addPhotoByLink(ev){
        ev.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/upload-link', { link: photoLink });
            const filename = response.data?.savedPath || response.data;
            if (!filename) {
                return;
            }
            setAddedPhotos(prev => [...prev, filename]);
            setPhotoLink('');
        } catch (error) {
            console.error('Upload failed', error);
        }
    }
    return(
       <div>
         {action === undefined && (
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
        )}
        {action =='new' && (
            <div className="mt-5"> 
            <form>
                {preInput('Title','Title for your place.')}
                <input type="text" placeholder="title, for example: My Love" value={title} onChange={(e)=>{
                    setTitle(e.target.value);
                }}/>
                {preInput('Address','Address to this place')}
                <input type="text" placeholder="address" value={address} onChange={(e)=>{
                    setAddress(e.target.value);}} />
                {preInput('Photos','more = better')}
                <div className="flex gap-2">
                <input type="text" placeholder={'Add using a link .... jpg' } value={photoLink} onChange={(e)=>{
                    setPhotoLink(e.target.value);}}/>
                <button type="button" onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp; </button>
                </div>
                <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">    
                {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                    <div key={index}>
                        {link}
                    </div>
                ))}
                <button className="flex items-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    Upload    
                </button>
                </div>
                {preInput('Description','description of the places')}
                <textarea value={description} onChange={(e)=>{
                    setDescription(e.target.value);}} />
                {preInput('Perks','select all the perks of your places')}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-col-3 lg:grid-cols-6">
                <Perks/>
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
        )}
       </div>
    
    )   
}