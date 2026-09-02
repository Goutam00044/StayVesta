import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import { UserContext } from "../UserContext.jsx";
import toast from "react-hot-toast";

export default function BookingPage() {

    const [bookinfo, setbookinfo] = useState(null);
    const [redirect, setredirect] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { pendingBooking, setPendingBooking } = useContext(UserContext);

    useEffect(() => {
    if (!pendingBooking) {
        setbookinfo(null);
        return;
    }

    if (!isValidBooking(pendingBooking)) {
        toast.error("Your booking details are incomplete.");
        setPendingBooking(null);
        setredirect("/");

        return;
    }

    setbookinfo(pendingBooking);
}, [pendingBooking, setPendingBooking]);
    // Never Used function, but it been used before to create booking without payment gateway
    // async function book(){
    //     if (!pendingBooking) return;
    //     const response = await axios.post('/booking', {
    //         place: pendingBooking.place._id,
    //         checkIn: pendingBooking.checkIn,
    //         checkOut: pendingBooking.checkOut,
    //         numberGuest: pendingBooking.numberGuest,
    //         name: pendingBooking.name,
    //         phone: pendingBooking.phone,
    //         price: pendingBooking.price,
    //     });
    //     return response.data;
    // }

    function isValidBooking(booking) {
    if (!booking) return false;

    if (!booking.place?._id) return false;

    if (!booking.checkIn || !booking.checkOut) return false;

    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);

    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
        return false;
    }

    if (differenceInCalendarDays(checkOut, checkIn) <= 0) {
        return false;
    }

    if (!booking.numberGuest || Number(booking.numberGuest) < 1) {
        return false;
    }

    if (!booking.name?.trim()) {
        return false;
    }

    if (!booking.phone?.trim()) {
        return false;
    }

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(booking.phone.trim())) {
        return false;
    }

    if (!booking.price || Number(booking.price) <= 0) {
        return false;
    }

    return true;
    }

   async function handlePayClick() {
    const loadingToast = toast.loading("Processing payment...");
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
                const { data } = await axios.post("/verify-payment",response);
                if (data.success) {
                // Create booking
                await axios.post("/booking", {
                    place: pendingBooking.place._id,
                    checkIn: pendingBooking.checkIn,
                    checkOut: pendingBooking.checkOut,
                    numberGuest: pendingBooking.numberGuest,
                    name: pendingBooking.name,
                    phone: pendingBooking.phone,
                    price: pendingBooking.price,
                    paymentStatus:"Paid",
                    razorpayOrderId:response.razorpay_order_id,
                    razorpayPaymentId:response.razorpay_payment_id,
                });
                toast.dismiss(loadingToast);
                toast.success("Booking confirmed successfully!");
                setPendingBooking(null);
                setredirect("/account/booked");
            } 
            else{
                  toast.dismiss(loadingToast);
                  toast.error("Payment verification failed.");
            }
        },
    }
        const razorpay = new window.Razorpay(options);
        razorpay.open();
        } 
        catch (err) {
        console.log(err);
            toast.dismiss(loadingToast);
            toast.error(
            err.response?.data?.error ||
            "Payment failed. Please try again."
            );
    } finally {
        setIsLoading(false);
    }
}

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    if (!bookinfo) {
    return (
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
            <h1 className="text-xl font-semibold text-gray-900">
                No booking found
            </h1>

            <p className="text-sm text-gray-500 mt-2">
                Please select a property and start your booking again.
            </p>

            <Link
                to="/"
                className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-xl"
            >
                Browse stays
            </Link>
        </div>
    );
}

    return (
        <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-4 py-4 sm:py-4 lg:py-5">
            <div>
                <div className="mb-1">
                        
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Review your booking
                    </h1>
                    
                </div>
                <p className="text-sm text-black mb-8">
                    Check the details before completing your payment.
                    </p>
            </div>

            <div className="flex flex-col md:flex-row rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-300 bg-white">
                {/* Left */}
                <div className="md:w-5/12 relative min-h-55 ">
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
                                <span>{format(new Date(bookinfo.checkIn), "dd MMM yyyy")}</span>
                            </div>

                            <div className="flex justify-between py-2.5">
                                <span>Check Out</span>
                                <span>{format(new Date(bookinfo.checkOut), "dd MMM yyyy")}</span>
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

                    <div className="mt-auto gap-2 flex flex-col sm:flex-row">
                        <button
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded font-semibold transition disabled:opacity-50"
                            onClick={handlePayClick}
                            disabled={isLoading}
                        >
                            {isLoading
                                ? "Processing..."
                                : `Pay ₹${bookinfo.price}`}
                        </button>

                        <Link
                         to="/"
                         className="text-center w-full bg-gray-400 hover:bg-gray-500 text-gray-800 px-4 py-3 rounded font-semibold transition disabled:opacity-50"
                        >
                            Cancel
                    
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}