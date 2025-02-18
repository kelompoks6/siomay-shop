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

const { Option } = Select;

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState(null);
    const [midtransUrl, setMidtransUrl] = useState("");
    const [form] = Form.useForm();
    const params = useParams();
    const { id } = params;
    const navigate = useNavigate();

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
            amount: product.price,
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

    const totalAmount = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

    return (
        <div style={{ padding: "20px" }}>
           <Card className="mb-4 p-4">
                <h2 className="text-lg font-bold">Produk Dipesan</h2>
                <Row style={{ marginTop: "20px", backgroundColor: "#f8e5be", padding: "15px", borderRadius: "10px" }}>
                    {/* Card Produk */}
                    { cartItems.length > 0 ? (
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
                    ))}                                    
                        </>
                    ):(
                        <p>Keranjang Anda kosong.</p> 
                    )}
                    {/* Card Pembayaran */}
                <Col span={6}>
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
                            loading={loading}>
                            Complete Checkout
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
                </Row>
            </Card>     
      </div>
    );
};

export default Checkout;