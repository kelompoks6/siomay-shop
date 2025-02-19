import React, { useEffect, useState } from "react";
import {
    Card,
    Button,
    Input,
    Form,
    Col,
    Row,
    Divider,
    message,
    Select,
} from "antd";
import {
    ShoppingCartOutlined,
    CreditCardOutlined,
    HomeOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCT, URL_TRANSACTION } from "../utils/Endpoint";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const { Option } = Select;

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState(null);
    const [midtransUrl, setMidtransUrl] = useState("");
    const [form] = Form.useForm();
    const params = useParams();
    const { id } = params;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const quantity = searchParams.get("quantity") || 1;


    useEffect(() => {
        axios
            .get(`${URL_PRODUCT}/${id}`)
            .then((res) => {
                console.log("res", res.data);
                setProduct(res.data);
                setMidtransUrl(res.data.midtrans_url);
            })
            .catch((err) => {
                console.log("err", err.response);
            });
    }, []);

    // Fungsi untuk handle submit form checkout
    const handleCheckout = (values) => {
        setLoading(true);
        console.log("values", values);
        console.log("midtransurl", midtransUrl);

        const data = {
            first_name: values.first_name,
            amount: product.price * quantity,
            quantity: quantity,
        };
        axios
            .post(URL_TRANSACTION, data)
            .then((res) => {
                console.log("res", res.data);
                if (res.data.midtrans_url) {
                    window.location.href = res.data.midtrans_url;
                }
            })
            .catch((err) => {
                console.log("err", err);
            });

        // Misalnya anda mengirim data checkout ke backend disini
        // setTime{() => {
        //   message.success("Checkout successful");
        //   setLoading(false);
        //   form.resetFields(); // Reset form after success
        // }, 2000}; / Simulate delay for async request
    };

    return (
        <>

            <Navbar />
            <div style={{ padding: "20px" }}>
                <Card className="mb-4 p-4">
                    <h2 className="text-lg font-bold">Produk Dipesan</h2>
                    <Row style={{ marginTop: "20px", backgroundColor: "#f8e5be", padding: "15px", borderRadius: "10px" }}>
                        {/* Card Produk */}
                        <Col span={18}>
                            <Card
                                title='Product Details'
                                bordered={false}
                                style={{ width: "100%" }}
                                extra={<ShoppingCartOutlined />}>
                                <p><strong>Product Name:</strong> {product?.name}</p>
                                <p><strong>Price:</strong> Rp {product?.price}</p>
                                <p><strong>Quantity:</strong>
                                    <Input value={quantity} style={{ width: "60px", textAlign: "center" }} readOnly />
                                </p>
                                <Divider />
                                <p><strong>Total Amount:</strong> Rp {product?.price * quantity}</p>
                            </Card>
                        </Col>
                        <Divider />

                        {/* Card Pembayaran */}
                        <Col span={14}>
                            <Card
                                title='Shipping & Payment'
                                bordered={false}
                                style={{ width: "100%" }}
                                extra={<CreditCardOutlined />}>
                                <Form
                                    form={form}
                                    layout='vertical'
                                    onFinish={handleCheckout}
                                    initialValues={{
                                        paymentMethod: "credit-card", // Default payment method
                                    }}>
                                    <Form.Item
                                        name='first_name'
                                        label='Your Name'
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter your your name!",
                                            },
                                        ]}>
                                        <Input placeholder='Enter your name' />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            type='primary'
                                            htmlType='submit'
                                            block
                                            loading={loading}
                                            style={{ marginTop: "10px", backgroundColor: '#E39F0E' }}
                                            className="px-5 text-black">
                                            Buat Pesan
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </div>

            <Footer />
        </>
    );
};

export default Checkout;