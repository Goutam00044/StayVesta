import { useState } from "react";
import { Navigate } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useContext } from "react";
import { useEffect } from "react";
import {UserContext} from '../UserContext.jsx';

export default function BookingWidget({place})
{
    const [checkIn, setcheckIn] = useState('');
    const [checkOut,setcheckOut]= useState('');
    const [numberGuest, setnumberGuest] = useState(1);
    const [name, setname] = useState('');
    const [phone, setphone] = useState();
    const [redirect, setredirect] = useState('');
    const [model, setmodel] = useState(false);
    let numberOfNight=0;
    numberOfNight = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));

    const {user} = useContext(UserContext);

    useEffect(()=>{
        if(user){
            setname(user.name);
        }
    },[user])

    async function book(ev){
        ev.preventDefault();
        const response = await axios.post('/booking', {
            place: place._id,
            checkIn,
            checkOut,
            numberGuest,
            name,
            phone,
            price: numberOfNight * place.price,
        });

        const bookingId = response.data._id;
        setmodel(false);
        setredirect(`/account/booking/${bookingId}`);
    }

    if(model)
    {
        return(
            <div className=" fixed z-10 bg-black/50 min-h-screen w-screen flex justify-center items-center top-0 left-0">
                <div className="bg-white p-4 relative">
                    <div className="flex flex-col gap-4 min-w-sm">
                        <h1 className="text-xl font-semibold">Confirm Booking</h1>
                        <p className="text-gray-700"> Confirm your booking dates </p>
                        <div className="flex gap-4 mt-4">
                            <button onClick={()=>{setmodel(false)}} className="bg-amber-600 text-white px-3 py-1 rounded hover:bg-amber-500">Cancel</button>
                            <button onClick={book} className="bg-amber-600 text-white px-3 py-1 rounded hover:bg-amber-500">Confirm</button>
                        </div>
                    </div>
                    <div className="absolute top-2 right-2">
                        <svg onClick={()=>{setmodel(false)}} size={30} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
            </div>
        )
    }
    if(redirect)
    {
        return <Navigate to={redirect}/>
    }

    return(
            <div className="bg-white shadow p-4 rounded-2xl">
                    <div className="text-2xl text-center">
                        Price: ₹{place.price} / per night
                    </div>
                    <div className="border rounded-2xl mt-4">
                        <div className="flex">
                            <div className="py-3 px-4">
                                <label> Check In : </label>
                                <input type="date" value={checkIn} onChange={(ev)=>{setcheckIn(ev.target.value)}}/>
                            </div>
                            <div className="py-3 px-4 border-l">
                                <label> Check Out : </label>
                                <input type="date" value={checkOut} onChange={(ev)=>{setcheckOut(ev.target.value)}}/>
                            </div>  
                            </div>
                            <div className="py-3 px-4 border-t">
                                <label> Number Of Guests : </label>
                                <input type="number" value={numberGuest} onChange={(ev)=>{setnumberGuest(ev.target.value)}}/>
                            </div>
                            <div className="py-3 px-4 border-t">
                                <label> Name : </label>
                                <input type="text" placeholder="Enter your name" value={name} onChange={(ev)=>{setname(ev.target.value)}}/>
                            </div>
                            <div className="py-3 px-4 border-t">
                                <label> Phone : </label>
                                <input type="tel" placeholder="333-666-999" value={phone} onChange={(ev)=>{setphone(ev.target.value)}}/>
                            </div>
                    </div>
                <button onClick={() => setmodel(true)} className="bg-amber-600 text-white mt-2 w-full px-3 py-2 rounded-l-2xl rounded-r-2xl">
                    Book now
                 {numberOfNight >0
                    &&(
                        <span> ₹{numberOfNight * place.price}</span>
                    )
                 }   
                </button>
            </div>
    );
}