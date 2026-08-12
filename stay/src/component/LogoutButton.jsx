import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function LogoutButton({ mobile = false }) {
    const { setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function logout() {
    try {
        setLoading(true);
        setError("");

        await axios.post("/logout");

        setUser(null);
        navigate("/");
    } catch (error) {
        console.error("Logout failed:", error);

        setError(
            error.response?.data?.message ||
            "Unable to logout. Please try again."
        );
    } finally {
        setLoading(false);
    }
    }

    return (
        <button
            onClick={logout}
            className={
                mobile
                    ? "w-full flex items-center justify-between px-5 py-5 text-left hover:bg-red-50 rounded transition"
                    : "flex items-center gap-3 px-4 py-2 border-l-[3px] border-transparent hover:bg-red-50 rounded text-left w-64"
            }
        >
            <span
                className={
                    mobile
                        ? "text-[15px] font-medium text-red-600"
                        : "text-[14.5px] font-medium text-red-600"
                }
            >
                <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>

                 {loading ? "Logging out..." : "Logout"}
                </div>
            </span>
        </button>
    );
}