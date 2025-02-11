import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Typography, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCT } from "../utils/Endpoint";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

        <div style={{ display: "flex", flexDirection:"column", minHeight: "100vh" }}>
            <div style={{ flex: "1", padding: "10px" }}>
            <Title level={2}>Product List</Title>
            <Row gutter={[10, 10]}>
                {products.map((product) => (
                    <Col xs={24} sm={12} md={8} lg={6} xl={4} key={product.id}>
                        <Card
                            hoverable
                            style={{ width: '100%', margin: '10px', borderRadius: '20px', background: '#DDD9D0' }}
                            cover={
                            <img 
                            alt={product.name} 
                            src={product.thumbnail} 
                            style={{ width: '100%', height: '180px', objectFit: 'cover'}}
                            className="mb-1 rounded-md"/>}>
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
                            <Link to={`/checkout/${product._id}`}>
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
