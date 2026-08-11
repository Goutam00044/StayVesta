import { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";
import { UserContext } from "../../UserContext.jsx";
import ConfirmBookingModal from "./ConfirmBookingModal.jsx";
import toast from "react-hot-toast";

export default function BookingWidget({ place }) {

    const [checkIn, setcheckIn] = useState("");
    const [checkOut, setcheckOut] = useState("");
    const [numberGuest, setnumberGuest] = useState(1);
    const [name, setname] = useState("");
    const [phone, setphone] = useState("");
    const [redirect, setredirect] = useState("");
    const [model, setmodel] = useState(false);

    const { user, setPendingBooking } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setname(user.name || "");
        }
    }, [user]);

    let numberOfNight = 0;

    if (checkIn && checkOut) {
        numberOfNight = differenceInCalendarDays(
            new Date(checkOut),
            new Date(checkIn)
        );
    }

    function validateBookingDetails() {

        if (!checkIn) {
            toast.error("Please select your check-in date.");
            return false;
        }

        if (!checkOut) {
            toast.error("Please select your check-out date.");
            return false;
        }

        if (numberOfNight <= 0) {
            toast.error("Check-out must be after check-in.");
            return false;
        }

        if (!numberGuest || Number(numberGuest) < 1) {
            toast.error("Please enter at least one guest.");
            return false;
        }

        if (!name.trim()) {
            toast.error("Please enter your full name.");
            return false;
        }

        if (!phone.trim()) {
            toast.error("Please enter your phone number.");
            return false;
        }

        // Basic Indian phone validation
        const phoneRegex = /^[6-9]\d{9}$/;

        if (!phoneRegex.test(phone.trim())) {
            toast.error("Please enter a valid 10-digit phone number.");
            return false;
        }

        return true;
    }

    function handleReserve() {

        if (!user) {
            setredirect("/login");
            return;
        }

        // Do not open confirmation modal
        // until all required information exists.
        if (!validateBookingDetails()) {
            return;
        }

        setmodel(true);
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <>
            {model && (
                <ConfirmBookingModal
                    checkIn={checkIn}
                    checkOut={checkOut}
                    numberGuest={numberGuest}
                    name={name}
                    phone={phone}
                    onClose={() => setmodel(false)}
                    onConfirm={(finalIn, finalOut) => {

                        // Update widget dates
                        setcheckIn(finalIn);
                        setcheckOut(finalOut);

                        const nights = differenceInCalendarDays(
                            new Date(finalOut),
                            new Date(finalIn)
                        );

                        // Save everything needed for BookingPage
                        setPendingBooking({
                            place,
                            checkIn: finalIn,
                            checkOut: finalOut,
                            numberGuest: numberGuest,
                            name: name.trim(),
                            phone: phone.trim(),
                            price: nights * place.price,
                        });

                        setmodel(false);

                        // Only now open BookingPage
                        setredirect(`/account/booking/${place._id}`);
                    }}
                />
            )}

            <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-6">

                <div className="pb-6 border-b border-gray-200">
                    <div className="flex items-end px-2 gap-2">
                        <span className="text-3xl font-bold text-gray-900">
                            ₹{place.price.toLocaleString("en-IN")}
                        </span>

                        <span className="text-gray-500 mb-1">
                            /per night
                        </span>
                    </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-gray-300">

                    <div className="grid grid-cols-2">

                        <div className="p-4 border-l border-gray-300">
                            <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
                                Check-in
                            </label>

                            <input
                                type="date"
                                min={new Date().toISOString().split("T")[0]}
                                value={checkIn}
                                onChange={(ev) => setcheckIn(ev.target.value)}
                                className="w-full h-8 border-0 p-0 focus:ring-0 text-gray-900"
                            />
                        </div>

                        <div className="p-4 border-l border-gray-300">
                            <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
                                Check-Out
                            </label>

                            <input
                                type="date"
                                min={
                                    checkIn ||
                                    new Date().toISOString().split("T")[0]
                                }
                                value={checkOut}
                                onChange={(ev) => setcheckOut(ev.target.value)}
                                className="w-full h-8 border-0 p-0 focus:ring-0 text-gray-900"
                            />
                        </div>

                    </div>

                    <div className="p-4 border-t border-gray-300">
                        <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
                            Guests
                        </label>

                        <input
                            type="number"
                            min="1"
                            placeholder="Number of Guests"
                            value={numberGuest}
                            onChange={(ev) =>
                                setnumberGuest(Number(ev.target.value))
                            }
                            className="w-full border-0 p-0 focus:ring-0 text-gray-900 placeholder:text-gray-400"
                        />
                    </div>

                    <div className="py-3 px-4 border-t border-gray-300">
                        <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
                            Name
                        </label>

                        <input
                            type="text"
                            placeholder="Full name"
                            value={name}
                            onChange={(ev) => setname(ev.target.value)}
                            className="w-full border-0 p-0 focus:ring-0 text-gray-900 placeholder:text-gray-400"
                        />
                    </div>

                    <div className="p-4 border-t border-gray-300">
                        <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
                            Phone
                        </label>

                        <input
                            type="tel"
                            placeholder="333-666-8888"
                            value={phone}
                            onChange={(ev) => setphone(ev.target.value)}
                            className="w-full border-0 p-0 focus:ring-0 text-gray-900 placeholder:text-gray-400"
                        />
                    </div>

                </div>

                <button
                    onClick={handleReserve}
                    className="
                        w-full
                        mt-6
                        bg-amber-500
                        hover:bg-amber-600
                        text-white
                        font-semibold
                        py-4
                        rounded-2xl
                        transition-all
                        duration-300
                        shadow-md
                        hover:shadow-lg
                    "
                >
                    {user ? "Reserve now" : "Login to Reserve"}

                    {numberOfNight > 0 && (
                        <div className="text-sm font-normal opacity-90 mt-1">
                            ₹{numberOfNight * place.price} Total
                        </div>
                    )}
                </button>

            </div>
        </>
    );
}