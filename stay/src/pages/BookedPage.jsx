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
            <div className="mt-4 space-y-4">
                {/* When There Are No Bookings */}
                {booking.length === 0 && (
                        <div className="text-center mt-16">
                            <h2 className="text-2xl font-semibold">
                                No bookings yet
                            </h2>
                            <p className="text-gray-500 mt-2">
                                Book your first stay and it will appear here.
                            </p>
                            <Link
                                to="/"
                                className="inline-block mt-6 bg-amber-600 text-white px-6 py-3 rounded-xl"
                            >
                                Explore Places
                            </Link>
                        </div>
                    )}
                {/* When There Are Bookings */}
                {booking?.length > 0 &&
                    booking.map((booking) => (
                        <div
                            key={booking._id}
                            to={`/account/booked/${booking._id}`}
                            className="flex bg-white rounded-2xl shadow-sm hover:shadow-2xl border border-gray-400 overflow-hidden transition"
                        >

                            {/* Image */}

                            <div className="w-60 h-52 shrink-0">
                                <img
                                    src={"http://localhost:4000/uploads/" + booking.place.photos?.[0]}
                                    alt={booking.place.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Center */}

                            <div className="flex-1 p-5 flex flex-col justify-between">

                                <div>

                                    <div className="flex justify-between items-start">

                                        <h2 className="text-xl font-semibold">
                                            {booking.place.title}
                                        </h2>

                                        <span className="text-xl font-bold text-amber-600">
                                            ₹{booking.price}
                                        </span>

                                    </div>

                                    <p className="text-gray-500 mt-3">
                                        📅 {format(new Date(booking.checkIn), "dd MMM yyyy")} -
                                        {" "}
                                        {format(new Date(booking.checkOut), "dd MMM yyyy")}
                                    </p>

                                    <div className="flex gap-5 mt-2 text-gray-600">

                                        <span>
                                            {differenceInCalendarDays(
                                                new Date(booking.checkOut),
                                                new Date(booking.checkIn)
                                            )} Nights
                                        </span>

                                        <span>
                                            {booking.numberGuest} Guests
                                        </span>

                                    </div>

                                </div>

                                <div className="flex justify-between items-center mt-5">

                                    <div className="flex gap-2">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                booking.bookingStatus === "Confirmed"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {booking.bookingStatus}
                                        </span>

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                booking.paymentStatus === "Paid"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {booking.paymentStatus}
                                        </span>

                                    </div>
                                    <Link to={`/account/booked/${booking._id}`}>    
                                    <span className="flex-1 bg-amber-600 px-4 py-3 rounded text-white text-sm font-medium hover:bg-amber-500">
                                        View Details →
                                    </span>
                                    </Link>

                                </div>

                            </div>

                        </div>
                    ))}
            </div>
        </div>
    )
}