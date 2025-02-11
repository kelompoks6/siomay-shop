import { useState } from "react";
import { Input, Button, Form, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { URL_SIGNIN } from "../utils/Endpoint";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (values) => {
        setLoading(true);
        const data = {
            email: values.email,
            password: values.password,
        };
        axios
         .post(URL_SIGNIN, data)
         .then((res) => {
            console.log("res", res);
            if (res.data.role !== "Admin") {
                setErrMsg("Anda tidak memiliki akses ke dalam dashboard admin");
            } else {
                navigate("/dashboard");
            }
            setLoading(false);
         })
         .catch((err) => {
            setErrMsg(err.response.data.message);
            setLoading(false);
         });
    };

    return (
        <>
          {errMsg && (
            <div className="mb-4">
                <Alert message={errMsg} type="error" />
            </div>
          )}

          <div className="flex items-center justify-center min-h-screen bg-white">
            {/* Bagian kiri untuk Typography */}
            <div className="flex-1 flex items-center justify-center p-12">
                <div className="text-center">
                    <h2 className="text-6xl font-semibold text-color4">NGULARAN</h2>
                    <h2 className="text-9xl font-semibold text-color4 mb-8">SHOP</h2>
                    <p className="text-3xl text-black">Website Warung Siomay Ngularan</p>
                </div>
            </div>

            {/* Bagian kanan untuk Form Login dalam kotak */}
            <div className="flex-1 flex items-center justify-center p-12">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border-2 border-color4">
                    <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Login</h2>

                    <Form
                      form={form}
                      onFinish={handleSubmit}
                      autoComplete="off"
                      layout="vertical"
                    >
                        <Form.Item
                          name="email"
                          rules={[{ required: true, message: "Please input your Email!" }]} 
                        >
                          <Input
                            prefix={<UserOutlined />}
                            placeholder="Email"
                            size="large"
                            autoComplete="off"
                            className="rounded-md shadow-lg bg-color3 border hover:border-color4 focus:border-color4 focus:ring-2 focus:ring-color4 focus:outline-none"
                          />
                        </Form.Item>

                        <Form.Item
                          name="password"
                          rules={[{ required: true, message: "Please input your Password!" }]} 
                        >
                          <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            size="large"
                            autoComplete="off"
                            className="rounded-md shadow-lg bg-color3 border hover:border-color4 focus:ring-6 focus:ring-color4 focus:outline-none"
                          />
                        </Form.Item>

                        <Form.Item>
                            <Button
                              type="primary"
                              htmlType="submit"
                              block
                              loading={loading}
                              size="large"
                              className="ant-btn !bg-color4 hover:!bg-color3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-black font-semibold"
                            >
                              Login
                            </Button>
                        </Form.Item>

                        {/* Lupa password */}
                        <div className="mb-10">
                          <Link to={`ForgotPassword`}>Lupa Password ?</Link>
                        </div>
                        

                        {/* Login Google */}
                        <p className="text-center text-color5">Login menggunakan akun google</p>
                        <div className="flex items-center ml-5">
                          <img className="w-8 ml-20" src="icon1.png" alt="icon" />
                          <p className="font-bold">
                            <Link to={`/Google`}>Google</Link>
                          </p>
                        </div>

                        {/* Sign up */}
                        <p className="text-center mt-5">Belum punya akun ? <span className="text-blue-600 font-bold"><Link to={`../Signup`}>SignUp</Link></span></p>
                        
                    </Form>
                </div>
            </div>
          </div>
        </>
    );
}

export default Login;
