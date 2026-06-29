import { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";
import { UserContext } from "../UserContext.jsx";
import ConfirmBookingModal from "./ConfirmBookingModal";

export default function BookingWidget({ place }) {

    const [checkIn, setcheckIn] = useState('');
    const [checkOut, setcheckOut] = useState('');
    const [numberGuest, setnumberGuest] = useState(1);
    const [name, setname] = useState('');
    const [phone, setphone] = useState('');
    const [redirect, setredirect] = useState('');
    const [model, setmodel] = useState(false);

    const { user, setPendingBooking } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setname(user.name);
        }
    }, [user]);

    let numberOfNight = 0;

    if (checkIn && checkOut) {
        numberOfNight = differenceInCalendarDays(
            new Date(checkOut),
            new Date(checkIn)
        );
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
                    onClose={() => setmodel(false)}
                    onConfirm={(finalIn, finalOut) => {

                        // update widget dates
                        setcheckIn(finalIn);
                        setcheckOut(finalOut);

                        // save everything needed for BookingPage
                        setPendingBooking({
                            place,
                            checkIn: finalIn,
                            checkOut: finalOut,
                            numberGuest,
                            name,
                            phone,
                            price:
                                differenceInCalendarDays(
                                    new Date(finalOut),
                                    new Date(finalIn)
                                ) * place.price,
                        });

                        setmodel(false);

                        // open BookingPage (preview page)
                        setredirect(`/account/booking/${place._id}`);
                    }}
                />
            )}

            <div className="bg-white shadow p-4 rounded-2xl">

                <div className="text-2xl text-center">
                    Price: ₹{place.price} / per night
                </div>

                <div className="border rounded-2xl mt-4">

                    <div className="flex">

                        <div className="py-3 px-4">
                            <label>Check In :</label>
                            <input
                                type="date"
                                value={checkIn}
                                onChange={(ev) => setcheckIn(ev.target.value)}
                            />
                        </div>

                        <div className="py-3 px-4 border-l">
                            <label>Check Out :</label>
                            <input
                                type="date"
                                value={checkOut}
                                onChange={(ev) => setcheckOut(ev.target.value)}
                            />
                        </div>

                    </div>

                    <div className="py-3 px-4 border-t">
                        <label>Number Of Guests :</label>
                        <input
                            type="number"
                            value={numberGuest}
                            onChange={(ev) => setnumberGuest(ev.target.value)}
                        />
                    </div>

                    <div className="py-3 px-4 border-t">
                        <label>Name :</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(ev) => setname(ev.target.value)}
                        />
                    </div>

                    <div className="py-3 px-4 border-t">
                        <label>Phone :</label>
                        <input
                            type="tel"
                            placeholder="333-666-999"
                            value={phone}
                            onChange={(ev) => setphone(ev.target.value)}
                        />
                    </div>

                </div>

                <button
                    onClick={() => setmodel(true)}
                    className="bg-amber-600 text-white mt-2 w-full px-3 py-2 rounded-l-2xl rounded-r-2xl"
                >
                    Book now

                    {numberOfNight > 0 && (
                        <span> ₹{numberOfNight * place.price}</span>
                    )}

                </button>

            </div>
        </>
    );
}