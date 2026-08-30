import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext, useState, useEffect } from "react";
import { format, addDays } from 'date-fns';

export default function SearchModel({
    onMobileSearchOpen,
    mobileExpanded = false,
    onMobileSearchClose
}) {
     const location = useLocation();
    const navigate = useNavigate();
    const [destination, setDestination] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    async function handleSearch(){
            const params = new URLSearchParams();
            if (destination)
                params.append("destination", destination);
            if (checkIn)
                params.append("checkIn", checkIn);
            if (checkOut)
                params.append("checkOut", checkOut);
            if (guests)
                params.append("guests", guests);
              console.log(params);
            navigate("/?" + params.toString());
            // Close the mobile search model after performing the search
            onMobileSearchClose?.();
    }

    useEffect(()=>{
        const params = new URLSearchParams(location.search);
        setDestination(params.get("destination") || "");
        // Instead default value for checkIn and checkOut, we can set them to today's date and two days later respectively if they are not provided in the URL parameters.
        const today = new Date();
        const checkOutDate = addDays(today, 2);
        setCheckIn(params.get("checkIn") || format(today,'yyyy-MM-dd'));
        setCheckOut(params.get("checkOut") || format(checkOutDate,'yyyy-MM-dd'));
        setGuests(params.get("guests") || 1);

    }, [location.search]);
    return(
        <>
        {/* =========================
            DESKTOP SEARCH
        ========================== */}
        <div className="hidden md:block">

        <div className="grid grid-cols-[2.0fr_1.4fr_1.4fr_1fr_auto] gap-0 items-center bg-white rounded-full shadow-md hover:shadow-lg border border-gray-200 overflow-hidden">
            {/* Location */}
            <div className="px-4 py-3 border-r border-gray-200">
                <p className="text-xs pl-3 tracking-wider uppercase font-semibold translate-y-1 text-black ">
                    Location
                </p>
                <input
                    type="text"
                    placeholder="Where to?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full h-8 bg-transparent text-md text-black placeholder-gray-400 search focus:outline-none leading-none"
                />
            </div>

            {/* Check In */}
            <div className="px-6 py-3 border-r border-gray-200">
                <p className="text-xs uppercase font-semibold tracking-wider text-black">
                    Check In
                </p>
                <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full h-8 bg-transparent text-black placeholder-gray-400 focus:outline-none leading-none"
                />
            </div>

            {/* Check Out */}
            <div className="px-6 py-3 border-r border-gray-200">
                <p className="text-xs uppercase font-semibold tracking-wider text-black">
                    Check Out
                </p>
                <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full h-8 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none leading-none"
                />
            </div>

            {/* Guests */}
            <div className="px-6 py-3">
                <p className="text-xs uppercase translate-y-1 font-semibold tracking-wider text-black">
                    Guests
                </p>
                <input
                    type="number"   
                    min="1"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full h-8 bg-transparent text-gray-900 search placeholder-gray-400 focus:outline-none leading-none"
                />
            </div>

            {/* Search */}
            <div className="px-3">
                <button
                    onClick={handleSearch}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold transition"
                >
                    Search
                </button>
                </div>
            </div>
        </div>

       {/* =========================
            MOBILE SEARCH BAR
        ========================== */}
    {!mobileExpanded && (
        <div className="md:hidden">
            <button
                onClick={() => onMobileSearchOpen?.()}
                className="
                    w-full
                    bg-white
                    rounded-full
                    px-5
                    py-4
                    flex
                    items-center
                    gap-3
                    text-left
                    shadow-lg
                    border
                    border-gray-200
                "
            >
                <span className="text-gray-500 text-lg">
                    🔍
                </span>

                <span className="text-gray-600 font-medium truncate">
                    {destination || "Where do you want to stay?"}
                </span>
            </button>
        </div>
    )}

        {mobileExpanded && (
                <div className="md:hidden">

                    {/* Location */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Location
                        </label>

                        <input
                            type="text"
                            placeholder="Where to?"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="
                                w-full
                                h-14
                                px-4
                                rounded-xl
                                border
                                border-gray-300
                                text-gray-900
                                focus:outline-none
                                focus:ring-2
                                focus:ring-amber-500
                            "
                        />
                    </div>

                    {/* Check In */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Check In
                        </label>

                        <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="
                                w-full
                                h-14
                                px-4
                                rounded-xl
                                border
                                border-gray-300
                                text-gray-900
                                focus:outline-none
                                focus:ring-2
                                focus:ring-amber-500
                            "
                        />
                    </div>

                    {/* Check Out */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Check Out
                        </label>

                        <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="
                                w-full
                                h-14
                                px-4
                                rounded-xl
                                border
                                border-gray-300
                                text-gray-900
                                focus:outline-none
                                focus:ring-2
                                focus:ring-amber-500
                            "
                        />
                    </div>

                    {/* Guests */}
                    <div className="mb-8">
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Guests
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            className="
                                w-full
                                h-14
                                px-4
                                rounded-xl
                                border
                                border-gray-300
                                text-gray-900
                                focus:outline-none
                                focus:ring-2
                                focus:ring-amber-500
                            "
                        />
                    </div>

                    <button
                        onClick={handleSearch}
                        className="
                            w-full
                            h-14
                            rounded-xl
                            bg-amber-600
                            hover:bg-amber-700
                            text-white
                            font-semibold
                            text-lg
                            transition
                        "
                    >
                        Search
                    </button>

                </div>
            )}
        </>
    );
}