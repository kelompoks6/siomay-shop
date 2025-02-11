import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCT } from "../../utils/Endpoint"; // Ganti dengan URL backend anda
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const params = useParams();
    const { id } = params;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios
            .get(`${URL_PRODUCT}/${id}`)
            .then((res) => {
                console.log(res);
                setProduct(res.data);
                form.setFieldsValue({
                    name: res.data.name,
                    price: res.data.price,
                });
                // Mengatur thumbnail saat ini 
                if (res.data.thumbnail) {
                    setFileList([
                        {
                            uid: "-1",
                            name: "thumbnail.png",
                            status: "done",
                            url: res.data.thumbnail,
                        },
                    ]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]); // Tambahkan id ke dependency array

    const navigate = useNavigate(); // Hook untuk navigasi

    // Fungsi untuk menangani submit Form
    const handleSubmit = async (values) => {
        setLoading(true);

        console.log("values", values);
        const data = new FormData();
        data.append("name", values.name);
        data.append("price", values.price);

        if (values.thumbnail && values.thumbnail.length > 0) {
            data.append("thumbnail", values.thumbnail[0].originFileObj);
        }

        try {
            await axios.patch(`${URL_PRODUCT}/${id}`, data);
            message.success("Product updated successfully!");
            form.resetFields();
            setFileList([]);
            navigate("/dashboard/products");
        } catch (error) {
            message.error("Failed to update product");
        } finally {
            setLoading(false);
        }
    };

    // Fungsi untuk menangani perubahan file upload
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    return (
        <div>
            <h1>Edit Product</h1>
            <Form
                form={form}
                layout='vertical'
                onFinish={handleSubmit}
                initialValues={{
                    category: "electronics", // Menentukan kategori default
                }}>
                <Form.Item
                    name='name'
                    label='Product Name'
                    rules={[{ required: true, message: "Please input product name!" }]}>
                    <Input placeholder='Enter product name' />
                </Form.Item>

                <Form.Item
                    name='price'
                    label='Price'
                    rules={[{ required: true, message: "Please input price!" }]}>
                    <Input type='number' placeholder='Enter product price' />
                </Form.Item>

                <Form.Item
                    name='thumbnail'
                    label='Thumbnail'
                    valuePropName='fileList'
                    getValueFromEvent={({ fileList }) => fileList}
                    rules={[{ required: false, message: "Please upload a thumbnail!" }]}>
                    <p>
                        Current:{" "}
                        {product && product.thumbnail ? (
                            <a href={product.thumbnail} target="_blank" rel="noopener noreferrer">{product.thumbnail}</a>
                        ) : (
                            "-"
                        )}
                    </p>
                    <Upload
                        action='/upload' // Atur sesuai endpoint upload file anda
                        listType='picture'
                        fileList={fileList}
                        onChange={handleChange}
                        maxCount={1}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' loading={loading} >
                        Edit Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateProduct;