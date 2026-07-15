import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function HostRoute({ children }) {
    const { user, ready } = useContext(UserContext);

    // Wait until the profile request completes
    if (!ready) {
        return null; // or a loading spinner
    }

    // After loading, check permission
    if (!user?.isHost) {
        return <Navigate to="/" replace />;
    }

    return children;
}