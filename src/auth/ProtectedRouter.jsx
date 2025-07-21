import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRouter = ({ children }) => {
    const [isLoggedIn, setISLoggedIn] = useState(false);
    const navigate = useNavigate();
    const chackUserStatus = async (email) => {
        try {
            const response = await fetch(`http://localhost:5001/users?email=${email}`)
            const user = await response.json();
            if (user.length > 0) {
                setISLoggedIn(true);
            } else {
                setISLoggedIn(false);
                navigate("/login")
            }
        } catch (error) {

        }
    }


    useEffect(() => {
        const local = JSON.parse(localStorage.getItem("todouser"));
        if (local) {
            chackUserStatus(local.email);
        } else {
            navigate("/login")
        }

    }, [])
    return (
        isLoggedIn ? children : null


    )
}

export default ProtectedRouter