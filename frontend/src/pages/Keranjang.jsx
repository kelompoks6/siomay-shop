import React, { useEffect, useState } from "react";
import {
    Card,
    Button,
    InputNumber,
    Row,
    Col,
    Checkbox,
} from "antd";
import {
    DeleteOutlined,
} from "@ant-design/icons";
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
        axios
            .get(`${URL_PRODUCT}/${id}`)
            .then((res) => {
                setCartItems([res.data]); // Simpan produk ke dalam keranjang (sementara)
            })
            .catch((err) => {
                console.log("err", err.response);
            });
    }, []);

    const handleQuantityChange = (index, value) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity = value;
        setCartItems(updatedCart);
    };

    const handleRemoveItem = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
    };

    const totalAmount = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

    return (
        <>
            <Navbar />
            <div style={{ padding: "20px" }}>
                <h1 style={{ fontSize: '35px' }}>Keranjang Belanja</h1>
                <Row gutter={16} style={{ backgroundColor: "#DDD9D0", padding: "10px", borderRadius: "10px" }}>
                    <Col span={24}>
                        {cartItems.length > 0 ? (
                            <>
                                <Row style={{ fontWeight: "bold", padding: "10px 0" }}>
                                    <Col span={1}></Col>
                                    <Col span={4}>Produk</Col>
                                    <Col span={6}></Col>
                                    <Col span={4}>Harga Satuan</Col>
                                    <Col span={4}>Kuantitas</Col>
                                    <Col span={3}>Total Harga</Col>
                                    <Col span={2}></Col>
                                </Row>
                                {cartItems.map((item, index) => (
                                    <Card
                                        key={index}
                                        bordered={false}
                                        style={{ marginBottom: "10px", backgroundColor: "#FBECD3" }}
                                    >
                                        <Row align="middle">
                                            <Col span={1}>
                                                <Checkbox defaultChecked />
                                            </Col>
                                            <Col span={4}>
                                                <img src={item.thumbnail} alt={item.name} style={{ width: "80px", borderRadius: "5px" }} />
                                            </Col>
                                            <Col span={6}>
                                                <strong>{item.name}</strong>
                                            </Col>
                                            <Col span={4}>Rp {item.price}</Col>
                                            <Col span={4}>
                                                <InputNumber
                                                    min={1}
                                                    defaultValue={1}
                                                    onChange={(value) => handleQuantityChange(index, value)}
                                                />
                                            </Col>
                                            <Col span={3}>Rp {item.price * (item.quantity || 1)}</Col>
                                            <Col span={2}>
                                                <Button type='text' icon={<DeleteOutlined />} danger onClick={() => handleRemoveItem(index)} />
                                            </Col>
                                        </Row>
                                    </Card>
                                ))}
                            </>
                        ) : (
                            <p>Keranjang Anda kosong.</p>
                        )}
                    </Col>
                </Row>
                <Row style={{ marginTop: "20px", backgroundColor: "#f8e5be", padding: "15px", borderRadius: "10px" }}>
                    <Col span={12}>
                        <Button danger>Hapus</Button>
                        <Button type='link'>Tambahkan ke Favorit</Button>
                    </Col>
                    <Col span={8} style={{ textAlign: "right" }}>
                        <strong>Total ( {cartItems.length} Produk ) :</strong>
                    </Col>
                    <Col span={2}>
                        <strong>Rp {totalAmount}</strong>
                    </Col>
                    <Col span={2}>
                        <a href={`/checkout/${id}?quantity=${quantity}`}>
                        <Button type='primary'>Checkout</Button>
                        </a>
                    </Col>
                </Row>
            </div>
            <Footer />
        </>
    );
};

export default Keranjang;
