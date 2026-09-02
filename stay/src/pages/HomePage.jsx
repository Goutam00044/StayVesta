import { useEffect, useState } from 'react';    
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import SearchModel from '../component/SearchModel';
export default function Homepage()
{   
    const location = useLocation();
    const [places, setplaces] = useState([]);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const destination = params.get("destination");
        const checkIn = params.get("checkIn");
        const checkOut = params.get("checkOut");
        const guests = params.get("guests");

        setLoading(true);
        setError(false);

        axios.get("/places", {
            params: {
                destination,
                checkIn,
                checkOut,
                guests,
            },
        }).then((response) => {
            setplaces(response.data);
        })
        .catch((error) => {
            console.error("Failed to fetch places:", error);
            setError(true);
            setplaces([]);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [location.search]);

    return (
    <main className="bg-gray-50">

        {/* =========================
            HERO SECTION
        ========================== */}
        <section
            className="
                relative
                min-h-[650px]
                lg:min-h-[550px]
                flex
                items-center
                bg-cover
                bg-center
            "
            style={{
                backgroundImage: "url('/stayvesta-hero.png')",
            }}
        >

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/35" />

            {/* Hero content */}
            <div
                className="
                    relative
                    z-10
                    w-full
                    max-w-7xl
                    mx-auto
                    px-6
                    lg:px-8
                    pt-6
                "
            >
                <div className="max-w-5xl mx-auto text-center text-white">

                    {/* Hero Heading */}
                    <h1
                        className="
                            text-4xl
                            sm:text-5xl
                            lg:text-6xl
                            font-bold
                            tracking-tight
                            leading-tight
                        "
                    >
                        Find your perfect stay
                    </h1>

                    {/* Hero Subtitle */}
                    <p
                        className="
                            mt-2
                            text-lg
                            sm:text-xl
                            text-white/90
                        "
                    >
                        Discover comfortable places to stay,
                        wherever you're going.
                    </p>

                    {/* Search Model */}
                   <div className="mt-8 text-left">
                        <SearchModel
                            onMobileSearchOpen={() => setIsMobileSearchOpen(true)}
                        />
                    </div>
                </div>
            </div>
        </section>
    
        {isMobileSearchOpen && (
        <div className="fixed inset-0 z-[9999] bg-white overflow-y-auto md:hidden">

            <div className="flex items-center gap-2 px-2 py-5 border-b border-gray-300">

                <button
                    onClick={() => setIsMobileSearchOpen(false)}
                    className="
                        w-10
                        h-10
                        flex
                        items-center
                        justify-center
                        text-xl
                        shrink-0
                    "
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>

                </button>

                <h2 className="text-2xl font-semibold text-black">
                    Search Stays
                </h2>

            </div>

            <div className="px-5 py-6">

                <SearchModel
                    mobileExpanded={true}
                    onMobileSearchClose={() => setIsMobileSearchOpen(false)}
                />

            </div>

        </div>
    )}

        {/* =========================
            EXISTING PLACES SECTION
        ========================== */}
        <section
            className="
                relative
                z-20
                w-[94%]
                max-w-7xl
                mx-auto
                -mt-24
            "
        >
        <div
            className="
                bg-white
                rounded-3xl
                shadow-[0_12px_35px_rgba(0,0,0,0.16)]
                border border-gray-100
                px-6
                lg:px-8
                py-8
                lg:py-10
            "
        >
            <div className="mb-8">
                <h2
                    className="
                        text-2xl
                        lg:text-3xl
                        font-bold
                        text-gray-900
                    "
                >
                    {location.search && new URLSearchParams(location.search).get("destination")
                            ? `Stays in ${new URLSearchParams(location.search).get("destination")}`
                            : "Weekend stays near you"
                        }
                </h2>

                <p className="mt-2 text-gray-500">
                    Explore places that might be perfect for your next stay.
                </p>
            </div>


            {/* Existing No Places UI */}
            
            {/* Loading State */}
                {loading && (
                    <div className="text-center py-20">
                        <div className="mx-auto w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin" />

                        <p className="mt-4 text-gray-500">
                            Finding available stays...
                        </p>
                    </div>
                )}
            {/* Error State */}
            {!loading && error && (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Something went wrong
                    </h2>

                    <p className="text-gray-500 mt-2">
                        We couldn't load the stays. Please try again.
                    </p>
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && places.length === 0 && (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-semibold">
                        No places found
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Try searching for another destination.
                    </p>
                </div>
            )}


            {/* Existing Places */}
            {!loading && places.length > 0 && (
                <div
                    className="
                        grid
                        grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                        xl:grid-cols-5
                        gap-x-6
                        gap-y-8
                    "
                >
                    {places.map(place => (

                        <Link
                            to={'/places/' + place._id}
                            key={place._id}
                            className="group"
                        >

                            <div className="flex mb-2 rounded-2xl bg-gray-400">

                                {place.photos?.[0] && (
                                    <img
                                        className="
                                                w-full
                                                rounded-2xl
                                                object-cover
                                                aspect-square
                                                transition-transform
                                                duration-300
                                                hover:brightness-88
                                            "
                                        src={
                                            'http://localhost:4000/uploads/' +
                                            place.photos?.[0]
                                        }
                                        alt={place.title|| "StayVesta"}
                                    />
                                )}

                            </div>

                            <div>

                                <h2 className="px-0.5 font-bold">
                                    {place.address}
                                </h2>

                                <h3 className="px-0.5 text-sm text-gray-500">
                                    {place.title}
                                </h3>

                                <div>
                                    <span className="font-bold">
                                        ₹{place.price}
                                    </span>{" "}
                                    per night
                                </div>

                            </div>

                        </Link>

                    ))}
                </div>
            )}
        </div>
        </section>

    </main>
);
}