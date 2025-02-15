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
import { Link } from "react-router-dom";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        axios
        .get(`${URL_PRODUCT}`) // Mengambil semua produk yang ada di keranjang
        .then((res) => {
            setCartItems(res.data); // Menyimpan semua produk ke dalam state
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
        <div style={{ padding: "20px" }}>
            <h1>Keranjang Belanja</h1>
            <Row gutter={16} style={{ backgroundColor: "#f8e5be", padding: "10px", borderRadius: "10px" }}>
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
                                style={{ marginBottom: "10px", backgroundColor: "#faebd7" }}
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
                                            defaultValue={item.quantity || 1}
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
                <Link to="/checkoutall">
                        <Button type='primary'>Checkout</Button>
                    </Link>
                </Col>
            </Row>
        </div>
    );
};

export default Cart;