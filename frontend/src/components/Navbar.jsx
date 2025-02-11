import React from "react";
import { ShoppingCartOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-color1 p-3 w-full">
            <div className="flex justify-between items-center w-full">
                {/* Logo di sebelah kiri */}
                <h1 className="ml-8 text-color2 text-3xl font-bold">Ngularan</h1>

                {/* Form Pencarian dan Ikon Keranjang & User di kanan */}
                <div className="flex items-center flex-1">
                    {/* Form Pencarian dengan ikon di kanan */}
                    <div className="ml-6 mr-4 flex-grow">
                        <Input
                            placeholder="Pencarian..."
                            className="border-none rounded-md bg-color3 text-white shadow-md"
                            suffix={<SearchOutlined className="text-black text-xl" />}
                        />
                    </div>

                    {/* Navigasi ke halaman keranjang (ShoppingCart) */}
                    <Link to="">
                        <Button
                            type="link"
                            icon={<ShoppingCartOutlined className="text-black text-2xl" />}
                            style={{ marginLeft: 10 }}
                        />
                    </Link>

                    {/* Navigasi ke halaman profil (Profile) */}
                    <Link to="">
                        <Button
                            type="link"
                            icon={<UserOutlined className="text-black text-2xl" />}
                            style={{ marginLeft: 10 }}
                        />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
