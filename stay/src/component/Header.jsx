import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Header() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const isHomePage = location.pathname === "/";
    const isHostingPage = location.pathname.startsWith("/hosting");

    async function handleBecomeHost() {
        try {
            const { data } = await axios.patch(
                "/user/become-host",
                {},
                {
                    withCredentials: true,
                }
            );

            console.log(data.user);

            setUser(data.user);

            navigate("/hosting");

            toast.success("Switched to Host");
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    function switchToUser() {
        navigate("/");
        toast.success("Switched to User");
    }

    function switchToHost() {
        navigate("/hosting");
        toast.success("Switched to Host");
    }

    return (
        <header
            className={`
                z-50 w-full
                ${
                    isHomePage
                        ? "absolute top-0 left-0 text-white"
                        : "relative bg-white text-black border-b border-gray-100"
                }
            `}
        >
            <div
                className="
                    max-w-7xl mx-auto
                    px-4 lg:px-6
                    h-20
                    flex items-center justify-between
                "
            >

                {/* Logo */}
                <Link
                    to="/"
                    className={`
                        text-2xl
                        font-bold
                        tracking-tight
                        ${
                            isHomePage
                                ? "text-white"
                                : "text-black"
                        }
                    `}
                >
                    StayVesta
                </Link>


                {/* Right Navigation */}
                <div className="flex items-center gap-5">

                    {/* Explore */}
                    {!isHostingPage && (
                        <Link
                            to="/"
                            className={`
                                hidden md:block
                                font-medium
                                transition
                                ${
                                    isHomePage
                                        ? "text-white hover:text-gray-200"
                                        : "text-gray-700 hover:text-black"
                                }
                            `}
                        >
                            Explore
                        </Link>
                    )}


                    {/* Login / Signup */}
                    {!user && (
                        <>
                            <Link
                                to="/login"
                                className={`
                                    font-medium
                                    transition
                                    ${
                                        isHomePage
                                            ? "text-white hover:text-gray-200"
                                            : "text-gray-700 hover:text-black"
                                    }
                                `}
                            >
                                Log in
                            </Link>

                            <Link
                                to="/signup"
                                className={`
                                    hidden 
                                    sm:block
                                    font-medium
                                    transition
                                    ${
                                        isHomePage
                                            ? "text-white hover:text-gray-200"
                                            : "text-gray-700 hover:text-black"
                                    }
                                `}
                            >
                                Sign up
                            </Link>
                        </>
                    )}


                    {/* Host Controls */}
                    {!user?.isHost ? (

                        <button
                            onClick={handleBecomeHost}
                            className={`
                                border-2
                                px-6 py-2 lg:px-6 lg:py-2
                                rounded-full
                                font-semibold
                                transition
                                ${
                                    isHomePage
                                        ? "border-white text-white hover:bg-white hover:text-black"
                                        : "border-black text-black hover:bg-black hover:text-white"
                                }
                            `}
                        >
                            <span className="hidden sm:inline">
                                Become a host
                            </span>
                            <span className="sm:hidden">
                                Start Hosting..
                            </span>
                        </button>

                    ) : isHostingPage ? (

                        <button
                            onClick={switchToUser}
                            className={`
                                border-2
                                px-6 py-2 lg:px-5 lg:py-2.5
                                rounded-full
                                font-semibold
                                transition
                                ${
                                    isHomePage
                                        ? "border-white text-white hover:bg-white hover:text-black"
                                        : "border-black text-black hover:bg-black hover:text-white"
                                }
                            `}
                        >
                            <span className="hidden sm:inline">
                                Switch to User
                            </span>
                            <span className="sm:hidden">
                                User
                            </span>
                        </button>

                    ) : (

                        <button
                            onClick={switchToHost}
                            className={`
                                border-2
                                px-6 py-2 lg:px-5 lg:py-2.5
                                rounded-full
                                font-semibold
                                transition
                                ${
                                    isHomePage
                                        ? "border-white text-white hover:bg-white hover:text-black"
                                        : "border-black text-black hover:bg-black hover:text-white"
                                }
                            `}
                        >
                             <span className="hidden sm:inline">
                                Switch to Hosting
                            </span>
                            <span className="sm:hidden">
                                Host
                            </span>
                        </button>

                    )}


                    {/* Profile */}
                    {user && (
                        <Link to="/account">
                            <div
                                className="
                                    w-10 h-10
                                    rounded-full
                                    bg-amber-600
                                    flex items-center justify-center
                                    text-white
                                    text-lg
                                    font-semibold
                                    flex-shrink-0
                                "
                            >
                                {user.fname?.charAt(0).toUpperCase()}
                            </div>
                        </Link>
                    )}

                </div>
            </div>
        </header>
    );
}