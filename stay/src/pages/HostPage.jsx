import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function HostingPage() {

    const { user } = useContext(UserContext);

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <h1 className="text-4xl font-semibold">
                Welcome back, {user?.fname}
            </h1>
            <p className="text-gray-500 mt-2">
                Manage your listings and start hosting guests.
            </p>

            {/* Your Listings */}

            <div className="mt-14">
                <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-semibold">
                        Your Listings
                    </h2>

                    <Link
                        to="/hosting/listings"
                        className="text-amber-600 font-medium hover:underline"
                    >
                        View all →
                    </Link>

                </div>
                <div className="mt-5 border rounded-2xl p-6">
                    Listing Preview
                </div>
            </div>

            {/* Create Listing */}
            <div className="mt-14">

                <h2 className="text-2xl font-semibold">
                    Start a new listing
                </h2>
                <Link
                    to="/hosting/listings/new"
                    className="mt-5 flex items-center justify-between border rounded-2xl p-6 hover:bg-gray-50 transition"
                >
                    <span className="font-medium">
                        Create a new listing
                    </span>
                    <span>
                        →
                    </span>
                </Link>
            </div>
        </div>
    );
}