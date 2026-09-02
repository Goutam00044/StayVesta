import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import {
    differenceInCalendarDays,
    format,
} from "date-fns";
import AccountNav from "../component/AccountNav";

export default function BookedPage() {
    const [booking, setBooking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { user } = useContext(UserContext);

    useEffect(() => {
    async function fetchBookings() {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get("/bookings");

            setBooking(response.data);
        } catch (error) {
            console.error("Failed to fetch bookings:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load your bookings. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

        fetchBookings();
    }, []);

    if (loading) {
    return <BookingsLoading />;
    }

    if (error) {
    return <BookingsError message={error} />;
    }

    function BookingsLoading() {
    return (
        <div className="space-y-4">

            {[1, 2].map((item) => (
                <div
                    key={item}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden animate-pulse"
                >
                    <div className="lg:flex">

                        <div className="w-full lg:w-60 h-48 lg:h-52 bg-gray-200"></div>

                        <div className="flex-1 p-5 space-y-4">

                            <div className="h-6 bg-gray-200 rounded w-2/3"></div>

                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>

                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>

                            <div className="flex gap-2">
                                <div className="h-7 w-20 bg-gray-200 rounded-full"></div>
                                <div className="h-7 w-16 bg-gray-200 rounded-full"></div>
                            </div>

                        </div>

                    </div>
                </div>
            ))}

        </div>
    );
    }

    function BookingsError({ message }) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-4">

            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7 text-red-500"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m0 3.75h.008v.008H12v-.008ZM10.29 3.86 1.82 18a1.875 1.875 0 0 0 1.61 2.812h17.14A1.875 1.875 0 0 0 22.18 18L13.71 3.86a1.875 1.875 0 0 0-3.42 0Z"
                    />
                </svg>

            </div>

            <h2 className="text-lg font-semibold text-gray-900">
                Something went wrong
            </h2>

            <p className="text-sm text-gray-500 mt-2 max-w-sm">
                {message}
            </p>

            <button
                onClick={fetchBookings}
                className="mt-5 bg-amber-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-amber-500 transition"
            >
                Try Again
            </button>

        </div>
    );
    }

    const fetchBookings = async () => {
    try {
        setLoading(true);
        setError("");

        const response = await axios.get("/bookings");

        setBooking(response.data);
    } catch (error) {
        console.error("Failed to fetch bookings:", error);

        setError(
            error.response?.data?.message ||
            "Unable to load your bookings. Please try again."
        );
    } finally {
        setLoading(false);
    }
    };

    return (
        <div className="w-full px-4 sm:px-6 py-6 sm:py-8">
            <div className="max-w-7xl mx-auto">

                {/* ================= DESKTOP ================= */}
                <div className="hidden lg:grid lg:grid-cols-[280px_1fr] gap-12">

                    {/* Account Sidebar */}
                    <div>
                        <AccountNav />
                    </div>

                    {/* Desktop Bookings */}
                    <div className="mt-4 space-y-4">
                        <BookingContent booking={booking} />
                    </div>

                </div>


                {/* ================= MOBILE ================= */}
                <div className="lg:hidden">
                   <div className="flex items-center gap-2 mb-5">
                     <Link
                        to="/account"
                        className="inline-flex items-center font-bold"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </Link>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        My Bookings
                    </h1>
                   </div>


                    {/* User Header */}
                    {user && (
                        <div className="bg-white border border-gray-200 rounded-2xl px-5 py-5 flex items-center gap-4 mb-6">

                            <div className="w-14 h-14 rounded-full bg-amber-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                                {user.fname.charAt(0).toUpperCase()}
                            </div>

                            <div className="min-w-0">
                                <p className="text-lg font-bold text-gray-900 truncate">
                                    {user.fname} {user.lname}
                                </p>

                                <p className="text-sm text-gray-500 truncate">
                                    {user.email}
                                </p>
                            </div>

                        </div>
                    )}


                    {/* Mobile Bookings */}
                    <div>
                        <BookingContent booking={booking} mobile />
                    </div>

                </div>

            </div>
        </div>
    );
}


/* =========================================================
   BOOKING CONTENT
========================================================= */

function BookingContent({ booking, mobile = false }) {

    /* ================= NO BOOKINGS ================= */

    if (booking.length === 0) {
        return (
            <div className="text-center mt-12 lg:mt-18">

                <h2 className="text-2xl font-semibold">
                    No bookings yet
                </h2>

                <p className="text-gray-500 mt-2">
                    Book your first stay and it will appear here.
                </p>

                <Link
                    to="/"
                    className="inline-block mt-6 bg-amber-600 text-white px-6 py-3 rounded-xl hover:bg-amber-500 transition"
                >
                    Explore Places
                </Link>

            </div>
        );
    }


    /* ================= BOOKINGS ================= */

    return (
        <div className="space-y-4">

            {booking.map((booking) => (

                <div
                    key={booking._id}
                    className={
                        mobile
                            ? "bg-white rounded-2xl border border-gray-200 overflow-hidden"
                            : "flex bg-white rounded-2xl shadow-sm hover:shadow-2xl border border-gray-300 overflow-hidden transition"
                    }
                >

                    {/* ================= IMAGE ================= */}

                    <div
                        className={
                            mobile
                                ? "w-full h-48"
                                : "w-60 h-52 shrink-0"
                        }
                    >
                        <img
                            
                            src={
                                booking.place.photos?.[0]?.startsWith("http")
                                    ? booking.place.photos[0]
                                    : `http://localhost:4000/uploads/${booking.place.photos?.[0]}`
                            }
                            alt={booking.place.title}
                            className="w-full h-full object-cover"
                        />
                    </div>


                    {/* ================= CONTENT ================= */}

                    <div
                        className={
                            mobile
                                ? "p-4"
                                : "flex-1 p-5 flex flex-col justify-between"
                        }
                    >

                        {/* Main Information */}

                        <div>

                            {/* Title + Price */}

                            <div
                                className={
                                    mobile
                                        ? "flex flex-col gap-1"
                                        : "flex justify-between items-start"
                                }
                            >

                                <h2
                                    className={
                                        mobile
                                            ? "text-lg font-semibold text-gray-900"
                                            : "text-xl font-semibold"
                                    }
                                >
                                    {booking.place.title}
                                </h2>

                                <span
                                    className={
                                        mobile
                                            ? "text-lg font-bold text-amber-600"
                                            : "text-xl font-bold text-amber-600"
                                    }
                                >
                                    ₹{booking.price}
                                </span>

                            </div>


                            {/* Dates */}

                            <p className="text-gray-500 mt-3 text-sm sm:text-base">
                                📅{" "}
                                {format(
                                    new Date(booking.checkIn),
                                    "dd MMM yyyy"
                                )}
                                {" - "}
                                {format(
                                    new Date(booking.checkOut),
                                    "dd MMM yyyy"
                                )}
                            </p>


                            {/* Nights + Guests */}

                            <div className="flex gap-4 sm:gap-5 mt-2 text-gray-600 text-sm sm:text-base">

                                <span>
                                    {differenceInCalendarDays(
                                        new Date(booking.checkOut),
                                        new Date(booking.checkIn)
                                    )}{" "}
                                    Nights
                                </span>

                                <span>
                                    {booking.numberGuest} Guests
                                </span>

                            </div>

                        </div>


                        {/* ================= BOTTOM ================= */}

                        <div
                            className={
                                mobile
                                    ? "mt-4"
                                    : "flex justify-between items-center mt-5"
                            }
                        >

                            {/* Status */}

                            <div className="flex flex-wrap gap-2">

                                <span
                                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                                        booking.bookingStatus === "Confirmed"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {booking.bookingStatus}
                                </span>


                                <span
                                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                                        booking.paymentStatus === "Paid"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                                >
                                    {booking.paymentStatus}
                                </span>

                            </div>


                            {/* View Details */}

                            <Link
                                to={`/account/booked/${booking._id}`}
                                className={
                                    mobile
                                        ? "block mt-4"
                                        : "ml-4"
                                }
                            >
                                <span
                                    className={
                                        mobile
                                            ? "flex items-center justify-center w-full bg-amber-600 px-4 py-3 rounded-xl text-white text-sm font-medium hover:bg-amber-500 transition"
                                            : "inline-flex bg-amber-600 px-4 py-3 rounded text-white text-sm font-medium hover:bg-amber-500"
                                    }
                                >
                                    View Details →
                                </span>
                            </Link>

                        </div>

                    </div>

                </div>

            ))}

        </div>
    );
}