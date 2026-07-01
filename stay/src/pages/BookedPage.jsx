import { useEffect, useState } from 'react';
import AccountNav from '../component/AccountNav';
import axios from 'axios';
import {differenceInCalendarDays, differenceInDays, format} from 'date-fns'
import { Link } from 'react-router-dom';
export default function BookedPage()
{
    const [booking, setbooking] = useState([]);
    useEffect(()=>{
        axios.get('/bookings').then(((response)=>{
            setbooking(response.data);
        }))
    },[]);
    return(
        <div>
            <AccountNav/>
            <div className='mt-4'>
                {booking?.length > 0 && booking.map(booking => (
                    <Link to={`/account/booked/${booking._id}`} 
                        key={booking._id} className="flex bg-gray-200 gap-4 mb-2 overflow-hidden rounded">
                        <div className='w-48'>
                            <img src={"http://localhost:4000/uploads/"+booking.place.photos?.[0]} alt="" />
                        </div>
                        <div className='py-3 grow pr-3'>
                            <h1 className='text-2xl font-semibold mb-2'>{booking.place.title}</h1> 
                            <div className='border-t border-gray-400 mt-2 py-2'>
                                {format(new Date(booking.checkIn), 'dd-MM-yyyy')} -- {format(new Date(booking.checkIn), 'dd-MM-yyyy')}
                            </div>
                            <div className='flex gap-1 items-center font-semibold'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                </svg>
                                {differenceInCalendarDays(new Date(booking.checkOut),new Date(booking.checkIn))}  Nights
                                | Total Price: ${booking.price}
                            </div>
                        </div>
                        
                    </Link>
                ))}
            </div>
        </div>
    )
}