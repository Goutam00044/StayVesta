// Actual Content of Place 
import Perks from "../Perks";
import { useState } from "react";
import ThingsToKnow from "./ThingsToKnow.jsx";

export default function PlaceOverview({ place }) {

    const [showFullDescription, setShowFullDescription] = useState(false);
    const DESCRIPTION_LIMIT = 300;
    const isLongDescription =
        place.description.length > DESCRIPTION_LIMIT;
    const description = showFullDescription
        ? place.description
        : place.description.slice(0, DESCRIPTION_LIMIT);
    const location = place.address.split(",").slice(-2).join(", ").trim();
    return (
        <div className="space-y-10">
            {/* Property Info */}
            <section>
                <h2 className="text-3xl font-semibold text-gray-900">
                    Entire {place.title}
                </h2>
                <p className="mt-1 text-sm  text-gray-800">
                    {location}
                </p>
                <div className="flex flex-wrap items-center gap-8 border-y border-gray-400 py-5 px-3 mt-4">
                    <div>
                        <p className="text-sm text-gray-500">Guests</p>
                        <p className="font-semibold">
                            Upto {place.maxGuests}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Check-in</p>
                        <p className="font-semibold">
                            {place.checkIn}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Check-out</p>
                        <p className="font-semibold">
                            {place.checkOut}
                        </p>
                    </div>

                </div>
                </section>
                {/* Description */}
                <section>
                <h2 className="text-2xl border-b py-4 border-gray-500 font-semibold mb-4">
                    About this place
                </h2>
                <p className="leading-8  text-gray-700 whitespace-pre-line">
                    {description}
                    {!showFullDescription && isLongDescription && "..."}
                </p>
                {isLongDescription && (
                    <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="mt-5 font-semibold text-gray-900 hover:underline transition"
                    >
                        {showFullDescription ? "Show less" : "Show more"}
                    </button>
                )}

            </section>

            {/* Amenities */}
                <section>

                    <h2 className="text-2xl border-b py-4 border-gray-500 font-semibold mb-6">
                        What this place offers
                    </h2>

                    {place.perks?.length > 0 ? (
                        <Perks selected={place.perks} />
                    ) : (
                        <div className="rounded-2xl border border-gray-200 p-6 text-gray-500">
                            No amenities have been added for this property.
                        </div>
                    )}

                </section>

            {/* Things to know */}
               <ThingsToKnow extraInfo={place.extraInfo} />

            <section className="border-b border-t border-gray-400 py-6">
                <h2 className="text-2xl font-semibold">
                    Hosted by {place.owner?.fname || "StayVesta"}
                </h2>

                <p className="text-gray-600 mt-2">
                    Thank you for choosing StayVesta. We hope you enjoy your stay.
                </p>
            </section>
        </div>
    );
}