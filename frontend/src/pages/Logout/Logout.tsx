import React from "react";

export const Logout = () => {
    React.useEffect(() => {
        localStorage.removeItem('credentials');
        return window.location.replace("/")
    }

        , []);
    return null
}