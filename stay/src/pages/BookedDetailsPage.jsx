import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import CancelBookingModel from "../component/CancelBookingModal";


export default function BookedDetailsPage() {

    const { id } = useParams();
    const [bookinfo, setBookinfo] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    useEffect(() => {

        axios.get(`/bookings/${id}`).then(response => {
            setBookinfo(response.data);
        });

    }, [id]);
    console.log(bookinfo);
    if (!bookinfo) {
        return <div>Loading...</div>;
    }

    async function cancelBooking() {
        console.log("Cancel Clicked")
        try {
            const { data } = await axios.patch(
                `/bookings/${bookinfo._id}/cancel`
            );
            setBookinfo(data);
            setShowCancelModal(false);
        } catch (err) {
            console.error(err);
            alert("Failed to cancel booking.");
        }
    }
    console.log(showCancelModal);
    return (
        <>
            {showCancelModal && (
                <CancelBookingModel
                    booking={bookinfo}
                    onClose={() => {setShowCancelModal(false)}}
                    onConfirm={cancelBooking}
                />
            )}
            <div className="mt-4">
                <a
                    href="/account/booked"
                    className="inline-flex items-center gap-1.5 text-sm text-black hover:text-gray-800 mb-7"
                >
                    ← Back to booked
                </a>
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    Booking Details
                </h1>
                <p className="text-sm text-black mb-8">
                    Check the booking details before payment information.                
                </p>
            </div>
            <div className="flex flex-col md:flex-row rounded-xl overflow-hidden border border-gray-300 shadow-sm hover:shadow-2xl bg-white">
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
                            Property details
                        <div className="border-t w-40 mt-2">
                        </div>
                        </p>
                        
                        <div className="divide-y divide-gray-100">
                            <div className="flex justify-between py-2.5">
                                <span>{bookinfo.place.title}</span>
                                <span></span>
                            </div>

                            <div className="flex justify-between py-2.5">
                                <span>{bookinfo.place.address}</span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <p className="text-xs font-medium text-black uppercase tracking-widest mb-3">
                            Guest details
                        <div className="border-t w-40 mt-2">
                        </div>
                        </p>

                        <div className="divide-y divide-gray-100">
                            <div className="flex justify-between py-2.5">
                                <span>Guest Name</span>
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
                        <div className="border-t w-40 mt-2">
                        </div>
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
                    <hr />
                    <div className="mt-auto">
                        <p className="text-xs font-medium uppercase tracking-widest mb-3">
                            Payment Information
                            <div className="border-t w-40 mt-2">
                            </div>
                        </p>
                        <div className="divide-y divide-gray-100">
                            <div className="flex justify-between py-2.5">
                                <span>Payment Status</span>
                                <span className={`font-semibold ${bookinfo.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                                    {bookinfo.paymentStatus}
                                </span>
                            </div>
                            <div className="flex justify-between py-2.5">
                                <span>Booking ID</span>
                                <span className="text-sm">{bookinfo._id}</span>
                            </div>

                            <div className="flex justify-between py-2.5">
                                <span>Payment ID</span>
                                <span className="text-sm">
                                    {bookinfo.razorpayPaymentId}
                                </span>
                            </div>
                            <div className="flex justify-between py-2.5">
                                <span>Booking Status</span>
                                <span className={`font-semibold ${bookinfo.bookingStatus === 
                                        "Confirmed"? "text-green-600": "text-red-600"}`}>
                                    {bookinfo.bookingStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                     <hr />
                    <div>
                         {bookinfo.bookingStatus === "Confirmed" ? (
                                <button
                                    onClick={() => setShowCancelModal(true)}
                                    className="w-full bg-red-500 text-white px-3 py-1 rounded-l-2xl rounded-r-2xl"
                                >
                                    Cancel Booking
                                </button>
                            ) : (
                                <button
                                    disabled
                                    className="w-full bg-gray-500 text-white px-3 py-1 rounded-l-2xl rounded-r-2xl cursor-not-allowed"
                                >
                                    Booking Cancelled
                                </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}