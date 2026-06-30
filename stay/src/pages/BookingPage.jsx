import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { UserContext } from "../UserContext.jsx";

export default function BookingPage() {

    const [bookinfo, setbookinfo] = useState(null);
    const [redirect, setredirect] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { pendingBooking, setPendingBooking } = useContext(UserContext);

    useEffect(() => {
        if (pendingBooking) {
            setbookinfo(pendingBooking);
        }
    }, [pendingBooking]);

    async function book() {

        if (!pendingBooking) return;

        const response = await axios.post('/booking', {

            place: pendingBooking.place._id,

            checkIn: pendingBooking.checkIn,

            checkOut: pendingBooking.checkOut,

            numberGuest: pendingBooking.numberGuest,

            name: pendingBooking.name,

            phone: pendingBooking.phone,

            price: pendingBooking.price,

        });

        return response.data;
    }

   async function handlePayClick() {
    if (!pendingBooking) return;
    setIsLoading(true);
    try {
        const { data: order } = await axios.post(
            "/create-order",
            pendingBooking
        );
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "StayVesta",
            description: "Accommodation Booking",
            order_id: order.id,
            prefill: {
                name: pendingBooking.name,
                contact: pendingBooking.phone,
            },
            theme: {
                color: "#d97706",
            },
            handler: async function (response) {
                console.log("Payment Success");
                console.log(response);
            },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
    } catch (err) {
        console.log(err);
    } finally {
        setIsLoading(false);
    }
}

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    if (!bookinfo) {
        return (
            <div className="text-center py-16 text-black text-sm">
                No booking found
            </div>
        );
    }

    return (
        <>
            <div className="mt-4">

                <a
                    href="/account/booking"
                    className="inline-flex items-center gap-1.5 text-sm text-black hover:text-gray-800 mb-7"
                >
                    ← Back to bookings
                </a>

                <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    Review your booking
                </h1>

                <p className="text-sm text-black mb-8">
                    Check the details before completing your payment.
                </p>

            </div>

            <div className="flex flex-col md:flex-row rounded-xl overflow-hidden border border-gray-200 bg-white">

                {/* Left */}

                <div className="md:w-5/12 relative min-h-64">

                    <img
                        src={
                            "http://localhost:4000/uploads/" +
                            bookinfo.place.photos?.[1]
                        }
                        alt={bookinfo.place.title}
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/50 to-transparent">

                        <h2 className="text-white text-base font-medium">
                            {bookinfo.place.title}
                        </h2>

                    </div>

                </div>

                {/* Right */}

                <div className="md:w-7/12 flex flex-col gap-5 p-6">

                    <div>

                        <p className="text-xs font-medium text-black uppercase tracking-widest mb-3">
                            Booking details
                        </p>

                        <div className="divide-y divide-gray-100">

                            <div className="flex justify-between py-2.5">

                                <span>Name</span>

                                <span>{bookinfo.name}</span>

                            </div>

                            <div className="flex justify-between py-2.5">

                                <span>Check In</span>

                                <span>{bookinfo.checkIn}</span>

                            </div>

                            <div className="flex justify-between py-2.5">

                                <span>Check Out</span>

                                <span>{bookinfo.checkOut}</span>

                            </div>

                            <div className="flex justify-between py-2.5">

                                <span>Guests</span>

                                <span>{bookinfo.numberGuest}</span>

                            </div>

                        </div>

                    </div>

                    <hr />

                    <div>

                        <p className="text-xs font-medium uppercase tracking-widest mb-3">
                            Amount Summary
                        </p>

                        <div className="divide-y divide-gray-100">

                            <div className="flex justify-between py-2.5">

                                <span>Total Nights</span>

                                <span>

                                    {differenceInCalendarDays(
                                        new Date(bookinfo.checkOut),
                                        new Date(bookinfo.checkIn)
                                    )}

                                </span>

                            </div>

                            <div className="flex justify-between py-2.5">

                                <span>Rent Per Night</span>

                                <span>

                                    ₹{bookinfo.place.price}

                                </span>

                            </div>

                        </div>

                        <div className="flex justify-between pt-3">

                            <span>Total Amount</span>

                            <span className="text-xl font-semibold">

                                ₹{bookinfo.price}

                            </span>

                        </div>

                    </div>

                    <div className="mt-auto">

                        <button
                            className="primary w-full py-2.5 disabled:opacity-50"
                            onClick={handlePayClick}
                            disabled={isLoading}
                        >

                            {isLoading
                                ? "Processing..."
                                : `Pay ₹${bookinfo.price}`}

                        </button>

                    </div>

                </div>

            </div>
        </>
    );
}