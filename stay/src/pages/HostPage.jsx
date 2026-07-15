import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function HostingPage() {
    const { user, ready } = useContext(UserContext);
    const [places, setplaces] = useState([]);

    useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
        setplaces(data);
    });
    }, []);

    if (!ready) return null;

    if (!user?.isHost) {
        return <Navigate to="/" />;
    }
    
    const previewListings = places.slice(0, 2);

    return (
        <div className="w-full max-w-3xl mx-auto px-6 py-6">
            <h1 className="text-4xl font-semibold">
                Welcome back, {user?.fname}
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
                Manage your listings and start hosting guests.
            </p>

            {/* Your Listings */}

            <div className="mt-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">
                        Your Listings
                    </h2>
                </div>
                {places.length === 0 ?(
                    <div className="mt-4 border border-gray-600 rounded-2xl p-8 text-center">
                        <h3 className="text-xl font-semibold">
                            No listings yet
                        </h3>
                        <p className="text-gray-500 mt-2">
                            Start hosting by creating your first listing.
                        </p>
                    </div>
                ) : (
                    <>
                    {/* Listing Preview goes here */}
                    <div className="mt-5 flex flex-col gap-4">
                        {previewListings.map((place) => {
                            const firstPhoto = place.photos?.[0] || place.addedPhotos?.[0];
                            return (
                                <div
                                    key={place._id}
                                    className="flex gap-4 border border-gray-300 rounded-2xl p-4 hover:shadow-md hover:bg-gray-100 transition"
                                >
                                    {/* Property Image */}
                                    <div className="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                                        {firstPhoto ? (
                                            <img
                                                src={`http://localhost:4000/uploads/${firstPhoto}`}
                                                alt={place.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm">
                                                No Photo
                                            </div>
                                        )}
                                    </div>

                                    {/* Property Info */}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">
                                            {place.title}
                                        </h3>

                                        <p className="text-gray-500 text-sm mt-1">
                                            {place.address}
                                        </p>
                                        <span
                                            className={`inline-flex mt-3 px-3 py-1 rounded-full text-xs font-medium ${
                                                place.isListed
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-orange-100 text-orange-700"
                                            }`}
                                        >
                                            {place.isListed ? "🟢 Active" : "🟠 Inactive"}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    </>

                    
                )}

                <div className="mt-4">
                    <Link   to="/hosting/listings"
                        className="text-amber-600 font-medium hover:text-amber-500"
                    >
                        View all
                </Link>
                </div>
            </div>

            {/* Create Listing */}
            <div className="mt-5 mb-8">

                <h2 className="text-2xl font-semibold">
                    Start a new listing
                </h2>
               <Link
                to="/hosting/listings/new"
                className="mt-5 block p-6 hover:shadow-md hover:bg-gray-100 border border-gray-300 rounded-2xl transition">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-xl font-semibold">
                            Create a new listing
                        </h3>
                        <p className="text-gray-500 text-s  m">
                            Share your property to showcase it, so guests can book.
                        </p>
                    </div>
                </div>
            </Link>
            </div>
        </div>
    );
}