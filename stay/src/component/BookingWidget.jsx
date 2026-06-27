import { useState } from "react";
import { data, Navigate } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";


export default function BookingWidget({place})
{
    const [checkIn, setcheckIn] = useState('');
    const [checkOut,setcheckOut]= useState('');
    const [numberGuest, setnumberGuest] = useState(1);
    const [name, setname] = useState('');
    const [phone, setphone] = useState();
    const [redirect, setredirect] = useState('');
    let numberOfNight=0;
    numberOfNight = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));

    async function book(ev){
        ev.preventDefault();
        const response= await axios.post('/booking',{place:place._id,
            checkIn,
            checkOut,
            numberGuest,
            name,
            phone, price: numberOfNight * place.price,});

        const bookingId= response.data._id;
        setredirect(`/account/booking/${bookingId}`);
    }

    if(redirect)
    {
        return <Navigate to={redirect}/>
    }
    return(
            <div className="bg-white shadow p-4 rounded-2xl">
                    <div className="text-2xl text-center">
                        Price: ${place.price} / per night
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
                <button onClick={book} className="bg-amber-600 text-white mt-2 w-full px-3 py-2 rounded-l-2xl rounded-r-2xl">
                    Book now
                 {numberOfNight >0
                    &&(
                        <span> ${numberOfNight * place.price}</span>
                    )
                 }   
                </button>
            </div>
    );
}