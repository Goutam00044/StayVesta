import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, useParams } from "react-router-dom";
import AccountNav from "../component/AccountNav";
import LogoutButton from "../component/LogoutButton";

export default function ProfilePage() {
    const { ready, user } = useContext(UserContext);
    const { subpage } = useParams();

    if (!ready) {
        return <AccountLoading />;
    }

    if (!user) {
        return null;
    }

    // /account/profile
    const isProfilePage = !subpage || subpage === "profile";

    // Loading state component
    function AccountLoading() {
    return (
        <div className="w-full px-4 sm:px-6 py-8">
            <div className="max-w-7xl mx-auto">

                <div className="animate-pulse space-y-6">

                    <div className="h-8 w-32 bg-gray-200 rounded"></div>

                    <div className="h-24 bg-gray-200 rounded-2xl"></div>

                    <div className="h-48 bg-gray-200 rounded-2xl"></div>

                </div>

            </div>
        </div>
    );
}

    return (
        <div className="w-full px-4 sm:px-6 py-6 sm:py-8">
            <div className="max-w-7xl mx-auto">

                {/* ================= DESKTOP ================= */}
                <div className="hidden lg:grid lg:grid-cols-[280px_1fr] gap-12">

                    {/* Left Sidebar */}
                    <div>
                        <AccountNav />
                    </div>

                    {/* Right Content */}
                    <div>
                        {isProfilePage && (
                            <ProfileContent user={user} />
                        )}
                    </div>
                </div>


                {/* ================= MOBILE ================= */}
                <div className="lg:hidden">

                    {/* Account Home */}
                    {!subpage && (
                        <div>

                            <h1 className="text-3xl font-semibold text-gray-900 mb-6">
                                Account
                            </h1>

                            {/* User Header */}
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


                            {/* Account Menu */}
                            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

                                <Link
                                    to="/account/profile"
                                    className="flex items-center justify-between px-5 py-5 hover:bg-gray-100 transition"
                                >
                                   <div className="flex items-center gap-3">
                                        <span className="text-[15px] font-medium text-gray-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
                                        </span>
                                        
                                        <span className="text-[15px] font-medium text-gray-900">
                                            My Profile
                                        </span>
                                   </div>
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </Link>


                                <div className="h-px bg-gray-100 mx-5"></div>


                                <Link
                                    to="/account/booked"
                                    className="flex items-center justify-between px-5 py-5 hover:bg-gray-100 transition"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-[15px] font-medium text-gray-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </span>
                                    <span className="text-[15px] font-medium text-gray-900">
                                        My Bookings
                                    </span>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </Link>


                                <div className="h-px bg-gray-100 mx-5"></div>


                                <LogoutButton mobile />

                            </div>

                        </div>
                    )}


                    {/* Mobile Profile */}
                    {subpage === "profile" && (
                        <div>

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
                                    My Profile
                                </h1>
                            </div>

                            <ProfileContent user={user} />

                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}


/* ================= PROFILE CONTENT ================= */

function ProfileContent({ user }) {
    return (
        <div>

            {/* User Header */}
            <div className="bg-white border border-gray-200 rounded-2xl px-5 sm:px-8 py-6 sm:py-7 flex items-center gap-4 sm:gap-6 mb-6">

                <div className="w-16 h-16 sm:w-19 sm:h-19 rounded-full bg-amber-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold flex-shrink-0">
                    {user.fname.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                    <p className="text-lg sm:text-xl font-bold text-gray-900 mb-0.5 truncate">
                        {user.fname} {user.lname}
                    </p>

                    <p className="text-sm text-gray-500 truncate">
                        {user.email}
                    </p>
                </div>

                {user.createdAt && (
                    <div className="hidden sm:block text-right">
                        <p className="text-xs text-gray-400">
                            Member since
                        </p>

                        <p className="text-sm font-semibold text-gray-700 mt-0.5">
                            {new Date(user.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                    month: "short",
                                    year: "numeric",
                                }
                            )}
                        </p>
                    </div>
                )}

            </div>


            {/* Personal Information */}
            <div className="bg-white border border-gray-200 rounded-2xl px-5 sm:px-8 py-6">

                <p className="text-[15.5px] font-bold text-gray-900 mb-4">
                    Personal information
                </p>


                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-3.5 border-b border-gray-100">

                    <span className="text-sm text-gray-800">
                        Full name
                    </span>

                    <span className="text-sm font-medium text-gray-900">
                        {user.fname} {user.lname}
                    </span>

                </div>


                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-3.5 border-b border-gray-100">

                    <span className="text-sm text-gray-800">
                        Email address
                    </span>

                    <span className="text-sm font-medium text-gray-900 break-all sm:break-normal">
                        {user.email}
                    </span>

                </div>


                <div className="flex items-center justify-between py-3.5">

                    <span className="text-sm text-gray-800">
                        Account status
                    </span>

                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                        Verified
                    </span>

                </div>

            </div>

        </div>
    );
}
