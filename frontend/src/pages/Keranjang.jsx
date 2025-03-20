import React, { useEffect, useState } from "react";
import { Card, Button, InputNumber, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCT } from "../utils/Endpoint";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Keranjang = () => {
    const [cartItem, setCartItem] = useState(null);

    useEffect(() => {
        const storedCart = localStorage.getItem("cartItem");
        if (storedCart) {
            setCartItem(JSON.parse(storedCart));
        } else {
            axios
                .get(`${URL_PRODUCT}`)
                .then((res) => {
                    console.log("API Response:", res.data);
                    if (Array.isArray(res.data) && res.data.length > 0) {
                        setCartItem(res.data[0]);
                        localStorage.setItem("cartItem", JSON.stringify(res.data[0]));
                    } else if (res.data) {
                        setCartItem(res.data);
                        localStorage.setItem("cartItem", JSON.stringify(res.data));
                    }
                })
                .catch((err) => {
                    console.error("API Error:", err.response);
                });
        }
    }, []);

    useEffect(() => {
        if (cartItem) {
            localStorage.setItem("cartItem", JSON.stringify(cartItem));
        }
    }, [cartItem]);

    const handleQuantityChange = (value) => {
        if (cartItem) {
            setCartItem({ ...cartItem, quantity: value });
        }
    };

    const handleRemoveItem = () => {
        setCartItem(null);
        localStorage.removeItem("cartItem");
    };

    const totalAmount = cartItem?.price ? cartItem.price * (cartItem.quantity || 1) : 0;

    return (
        <>
            <Navbar />
            <div style={{ padding: "20px" }}>
                <h1>Keranjang Belanja</h1>
                <Row gutter={16} style={{ backgroundColor: "#f8e5be", padding: "10px", borderRadius: "10px" }}>
                    <Col span={24}>
                        {cartItem ? (
                            <Card bordered={false} style={{ marginBottom: "10px", backgroundColor: "#faebd7" }}>
                                <Row align="middle">
                                    <Col span={4}>
                                        <img src={cartItem.thumbnail} alt={cartItem.name || "Produk"} style={{ width: "80px", borderRadius: "5px" }} />
                                    </Col>
                                    <Col span={6}>
                                        <strong>{cartItem.name || "Produk Tanpa Nama"}</strong>
                                    </Col>
                                    <Col span={4}>Rp {cartItem.price || 0}</Col>
                                    <Col span={4}>
                                        <InputNumber
                                            min={1}
                                            value={cartItem.quantity || 1}
                                            onChange={(value) => handleQuantityChange(value)}
                                        />
                                    </Col>
                                    <Col span={3}>Rp {totalAmount}</Col>
                                    <Col span={2}>
                                        <Button type='text' icon={<DeleteOutlined />} danger onClick={handleRemoveItem} />
                                    </Col>
                                </Row>
                            </Card>
                        ) : (
                            <p>Keranjang Anda kosong.</p>
                        )}
                    </Col>
                </Row>
                <Row style={{ marginTop: "20px", backgroundColor: "#f8e5be", padding: "15px", borderRadius: "10px" }}>
                    <Col span={8} style={{ textAlign: "right" }}>
                        <strong>Total:</strong>
                    </Col>
                    <Col span={2}>
                        <strong>Rp {totalAmount}</strong>
                    </Col>
                    <Col span={2}>
                        
                            <Link to={`/checkout1`}>
                                <Button type="primary" danger style={{ fontSize: "18px", padding: "10px 20px", backgroundColor: '#E39F0E' }} className="px-5 text-black">
                                    Checkout
                                </Button>
                            </Link>
                     
                    </Col>
                </Row>
            </div>
            <Footer />
        </>
    );
};

export default Keranjang;
