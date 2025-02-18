import React, { useEffect, useState } from "react";
import { Card, Button, Input, Col, Row } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCT } from "../utils/Endpoint";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LihatProduct = () => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        axios.get(`${URL_PRODUCT}/${id}`)
            .then((res) => setProduct(res.data))
            .catch((err) => console.log("err", err.response));
    }, [id]);

    return (
        <>
            <Navbar />

            <div style={{ padding: "40px", backgroundColor: "#F8F8F8" }}>
                <Row gutter={32} align="middle" justify="center" style={{ backgroundColor: '#FBECD3', padding: '50px' }}>
                    <Col span={10} style={{ textAlign: "center", marginRight: '200px' }}>
                        <img
                            alt="product"
                            src={product?.thumbnail}
                            style={{ width: '100%', height: '350px', objectFit: 'cover' }}
                            className="mb-1 rounded-md"
                        />
                    </Col>
                    <Col span={10}>
                        <h2 style={{ fontSize: "32px", fontWeight: "bold" }}>{product?.name}</h2>
                        <h3 style={{ color: "#D48806", fontSize: "24px" }}>Harga</h3>
                        <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>Rp {product?.price}</h1>
                        <div style={{ marginBottom: "20px", fontSize: "18px" }}>
                            <span>Kuantitas </span>
                            <Button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1} style={{ margin: "0 10px" }}>-</Button>
                            <Input value={quantity} style={{ width: "60px", textAlign: "center", fontSize: "15px" }} readOnly />
                            <Button onClick={() => setQuantity(quantity + 1)} style={{ margin: "0 10px" }}>+</Button>
                        </div>
                        <h3 style={{ fontSize: "24px", fontWeight: "bold" }} >Total: Rp {product?.price * quantity}</h3>
                        <a href={`/cart?product=${id}&quantity=${quantity}`}>
                            <Button type="primary" icon={<ShoppingCartOutlined />} style={{ marginRight: "15px", fontSize: "18px", padding: "10px 20px" }}>
                                Masukkan Keranjang
                            </Button>
                        </a>
                        <a href={`/checkout/${id}?quantity=${quantity}`}>
                     <Button type="primary" danger style={{ fontSize: "18px", padding: "10px 20px" }}>
                     Beli Sekarang
                     </Button>
                    </a>

                    
                    </Col>
                </Row>
            </div>

            <Footer />
        </>
    );
};

export default LihatProduct;