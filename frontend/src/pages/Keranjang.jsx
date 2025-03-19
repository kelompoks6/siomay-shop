import React, { useEffect, useState } from "react";
import { Card, Button, InputNumber, Row, Col, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCT } from "../utils/Endpoint";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Keranjang = () => {
    const [cartItems, setCartItems] = useState([]);
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || {};
        setCartItems(storedCart[id] || []);
    }, [id]);

    const addToCart = (product) => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || {};
        const existingCart = storedCart[id] || [];
        const existingProduct = existingCart.find(item => item.id === product.id);
        let updatedCart;
        
        if (existingProduct) {
            updatedCart = existingCart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedCart = [...existingCart, { ...product, quantity: 1 }];
        }
        
        storedCart[id] = updatedCart;
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(storedCart));
    };

    const handleQuantityChange = (index, value) => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || {};
        const updatedCart = [...cartItems];
        updatedCart[index].quantity = value;
        storedCart[id] = updatedCart;
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(storedCart));
    };

    const handleRemoveItem = (index) => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || {};
        const updatedCart = cartItems.filter((_, i) => i !== index);
        storedCart[id] = updatedCart;
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(storedCart));
    };

    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <>
            <Navbar />
            <div style={{ padding: "20px" }}>
                <h1 style={{ fontSize: '35px' }}>Keranjang Belanja</h1>
                <Row gutter={16} style={{ backgroundColor: "#DDD9D0", padding: "10px", borderRadius: "10px" }}>
                    <Col span={24}>
                        {cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <Card key={index} bordered={false} style={{ marginBottom: "10px", backgroundColor: "#FBECD3" }}>
                                    <Row align="middle">
                                        <Col span={1}><Checkbox defaultChecked /></Col>
                                        <Col span={4}><img src={item.thumbnail} alt={item.name} style={{ width: "80px", borderRadius: "5px" }} /></Col>
                                        <Col span={6}><strong>{item.name}</strong></Col>
                                        <Col span={4}>Rp {item.price}</Col>
                                        <Col span={4}>
                                            <InputNumber min={1} value={item.quantity} onChange={(value) => handleQuantityChange(index, value)} />
                                        </Col>
                                        <Col span={3}>Rp {item.price * item.quantity}</Col>
                                        <Col span={2}><Button type='text' icon={<DeleteOutlined />} danger onClick={() => handleRemoveItem(index)} /></Col>
                                    </Row>
                                </Card>
                            ))
                        ) : (
                            <p>Keranjang Anda kosong.</p>
                        )}
                    </Col>
                </Row>
                <Row style={{ marginTop: "20px", backgroundColor: "#f8e5be", padding: "15px", borderRadius: "10px" }}>
                    <Col span={12}><Button danger>Hapus</Button><Button type='link'>Tambahkan ke Favorit</Button></Col>
                    <Col span={8} style={{ textAlign: "right" }}><strong>Total ({cartItems.length} Produk):</strong></Col>
                    <Col span={2}><strong>Rp {totalAmount}</strong></Col>
                    <Col span={2}><Link to={`/checkout/${id}`}><Button type='primary'>Checkout</Button></Link></Col>
                </Row>
            </div>
            <Footer />
        </>
    );
};

export default Keranjang;
