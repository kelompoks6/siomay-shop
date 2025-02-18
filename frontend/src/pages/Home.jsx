import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Typography, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCT } from "../utils/Endpoint";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import siomay from "../assets/siomay.png";

// Ganti dengan endpoint produk anda

const { Title } = Typography;

const Home = () => {

    const [products, setProducts] = useState([]);

    // Fetch data produk saat halaman dibuat
    useEffect(() => {
        axios
            .get(URL_PRODUCT)
            .then((res) => {
                console.log("res", res.data);
                setProducts(res.data); // Simpan data produk ke state
            })
            .catch((err) => {
                console.log(err);
                message.error("Failed to fetch products");
            });
    }, []);

    // Fungsi untuk handle klik "Add to Cart"
    const handleAddToCart = (product) => {
        message.success(`${product.title} added to cart!`);
    };

    return (
        <>

            <Navbar />

            <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", marginTop: "50px" }}>
                <div style={{ flex: "1", padding: "10px" }}>
                    <Row gutter={32} align="middle" justify="center" style={{ background: 'linear-gradient(to right, #FAEDBA, #EED368)' }}>
                    <Col xs={12} sm={6} md={6} lg={12} xl={12} style={{ paddingLeft: '70px' }}>
                            <h2 style={{ fontSize: '40px', fontFamily: 'Figtree', marginBottom: '25px' }}>SIOMAY NGULARAN</h2>
                            <p style={{ fontSize: '20px', fontFamily: 'arial' }}>
                                siomay dengan kuah kacang spesial dengan rasa gurih manis <br />
                                dengan berbagai macam isian yang pas di lidah <br />
                                ditemani dengan irisan acar timun juga dengan taburan <br />
                                bawang goreng yang menambah cita rasa.
                            </p>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={12} xl={12} style={{ paddingLeft: '30%' }}>
                            <img
                                src={siomay}
                                style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
                                alt="Siomay"
                            />
                        </Col>
                    </Row>

                    <Row gutter={[10, 10]} style={{ marginTop: '50px' }}>
                        {products.map((product) => (
                            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={product.id}>
                                <Card
                                    hoverable
                                    style={{ width: '100%', margin: '10px', borderRadius: '20px', background: '#DDD9D0' }}
                                    cover={
                                        <img
                                            alt={product.name}
                                            src={product.thumbnail}
                                            style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                                            className="mb-1 rounded-md" />}>
                                    <Card.Meta
                                        title={product.name}
                                        description={`Rp ${product.price} / pcs `}
                                        className="text-center text-2xl font-semibold mb-2"
                                    />
                                    <Button
                                        type='primary'
                                        style={{ marginTop: "10px", backgroundColor: '#E39F0E' }}
                                        className="px-5 text-black"
                                    // onclick={() => handleAddTocart(product)}
                                    >
                                        <Link to={`/lihatproduct/${product._id}`}>Lihat Produk</Link>
                                    </Button>
                                    <Link to={`/keranjang/${product._id}`}>
                                        <ShoppingCartOutlined className="px-3" style={{ fontSize: '25px' }} />
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            <Footer />

        </>
    );
};

export default Home;
