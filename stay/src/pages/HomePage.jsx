import { useEffect, useState } from 'react';    
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import SearchModel from '../component/SearchModel';
export default function Homepage()
{   
    const location = useLocation();
    const [places, setplaces] = useState([]);
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const destination = params.get("destination");
        const checkIn = params.get("checkIn");
        const checkOut = params.get("checkOut");
        const guests = params.get("guests");
        axios.get("/places", {
            params: {
                destination,
                checkIn,
                checkOut,
                guests,
            },
        }).then((response) => {
            setplaces(response.data);
        });
    }, [location.search]);

    return (
    <main className="bg-white">

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
                backgroundImage: "url('/public/stayvesta-hero.png')",
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
                        <SearchModel />
                    </div>

                </div>
            </div>
        </section>


        {/* =========================
            EXISTING PLACES SECTION
        ========================== */}
        <section
            className="
                max-w-7xl
                mx-auto
                px-6
                lg:px-8
                py-14
                lg:py-16
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
                    Weekend stays near you
                </h2>

                <p className="mt-2 text-gray-500">
                    Explore places that might be perfect for your next stay.
                </p>
            </div>


            {/* Existing No Places UI */}
            {places.length === 0 && (
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
            {places.length > 0 && (
                <div
                    className="
                        grid
                        grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                        gap-x-6
                        gap-y-8
                    "
                >
                    {places.map(place => (

                        <Link
                            to={'/places/' + place._id}
                            key={place._id}
                        >

                            <div className="flex mb-2 rounded-2xl bg-gray-500">

                                {place.photos?.[0] && (
                                    <img
                                        className="
                                            rounded-2xl
                                            object-cover
                                            aspect-square
                                            w-full
                                        "
                                        src={
                                            'http://localhost:4000/uploads/' +
                                            place.photos?.[0]
                                        }
                                        alt=""
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

        </section>

    </main>
);
}