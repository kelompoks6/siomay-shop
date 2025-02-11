import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Hapus token dari localStorage
        localStorage.removeItem("token");

        // Hapus token dari sessionStorage (opsional)
        sessionStorage.removeItem("token");

        // Hapus token dari cookies (opsional)
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // Tampilkan pesan logout sukses
        message.success("You have been logged out successfully.");

        // Arahkan ke halaman login
        navigate("../");
    }, [navigate]);

    return null; // Tidak perlu ada tampilan untuk logout
};

export default Logout;
