import React, { useEffect, useState } from 'react'
import { Modal, Button, ConfigProvider, Form, Input } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Components/Component-recyle/Header';


function Register() {

    const [data, setData] = useState("")
    const [open, setOpen] = useState(false)
    const pathName=window.location.pathname

    useEffect(() => {
        axios.get("http://localhost:8000/data/users")

            .then(res => {
                console.log(res.mess);
                let emailFilter = []
                for (let i = 0; i < res.data.mess.length; i++) {
                    emailFilter.push(res.data.mess[i].email)
                }
                console.log();
                setData(emailFilter)

            })
            .catch(error => console.log(error))


    }, [])



    return (
        <>
            <Header pathName={pathName}/>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#8c8c8c',
                    },
                }}
            >
                <div style={{ height: "100%", width: "100%" }} id="box">

                    <Form
                        id="form"
                        layout="vertical"
                        autoComplete='off'

                        onFinish={(value) => {
                            console.log(value);
                            axios.post("http://localhost:8000/auth/register", {
                                email: value.email,
                                username: value.username,
                                password: value.password
                            })
                                .then(function (response) {
                                    console.log(response);
                                })
                                .catch(function (error) {
                                    console.log(error);

                                })
                            setOpen(true)
                        }}
                    >
                        <Form.Item name="username" label="Tên người dùng"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên người dùng"
                                },
                                {
                                    whitespace: true,
                                    message: "Tên người dùng không được để trống "
                                },
                                { min: 4, message: "Tên người dùng tối thiểu 4 ký tự" }
                            ]}
                            hasFeedback>
                            <Input placeholder='Nhập tên người dùng' />
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập Email đăng ký"
                            },
                            { type: "email", message: "Vui lòng nhập email đúng định dạng" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (data.indexOf(value) === -1) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject("Email này đã được đăng ký ")
                                }
                            })
                        ]}
                            hasFeedback>
                            <Input placeholder='Nhập email đăng ký' />
                        </Form.Item>
                        <Form.Item name="password" label="Nhập mật khẩu"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu"
                                },
                                { whitespace: true },
                                { min: 6, message: "Yêu cầu nhập tối thiểu 6 ký tự" }
                            ]}
                            hasFeedback>
                            <Input.Password placeholder='Nhập mật khẩu' />
                        </Form.Item>
                        <Form.Item name="confirmPassword" label="Xác nhận mật khẩu"
                            rules={[
                                { required: true, },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject('Mật khẩu xác nhận không trùng khớp')
                                    }
                                })
                            ]}
                            hasFeedback>
                            <Input.Password placeholder='Xác nhận mật khẩu' />
                        </Form.Item>
                        <Form.Item style={{ textAlign: "center" }}>
                            <Button style={{ backgroundColor: "red" }} type='primary' htmlType='submit' >Register</Button>
                        </Form.Item>
                    </Form>
                    <div id="goto">Bạn đã có tài khoản ? <Link style={{ color: "red" }} to="/login">Đăng nhập</Link></div>
                </div>

                <Modal
                    closable={false}
                    open={open}
                    title="Thông báo"

                    footer={[


                        <Button
                            key="link"
                            href="http://localhost:3000/login"
                            type="primary"

                            danger
                        >
                            Đến trang đăng nhập
                        </Button>,
                    ]}
                >
                    <p>Đăng ký thành công</p>
                </Modal>
            </ConfigProvider>



        </>);
}

export default Register;