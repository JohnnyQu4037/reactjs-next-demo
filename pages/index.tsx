import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { login } from "@/pages/api/auth";
import React, { useEffect, useState } from "react";
export interface loginRequest {
  email: string;
  password: string;
}

export const FormContainer = styled.section`
  display: flex;
  width: 400px;
  height: 100%;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
`;

export const CustomizedForm = styled(Form)`
  width: 100%;
`;

export const LoginBox = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  padding-top: 240px;
  background-size: 100%;
  flex-direction: column;
  align-items: center;
`;
export const LoginTitle = styled.div`
  display: flex;
  margin-bottom: 30px;
  align-items: center;
`;

export default function Login() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userInfo,setUserInfo] = useState([])

  const submitForm = async (request: loginRequest) => {
    setLoading(true);
    const { access_token, refresh_token, ...rest } = await login(request);
    localStorage.setItem("access_token", JSON.stringify(access_token));
    localStorage.setItem("refresh_token",refresh_token)
    setUserInfo(rest);
    router.replace("/dashboard");
  };

  return (
    <>
      <LoginBox>
        <LoginTitle>
          <h1>RISK HUB</h1>
        </LoginTitle>

        <FormContainer>
          <CustomizedForm name="login_form" initialValues={{ remember: true }} onFinish={(value) => submitForm(value as loginRequest)} form={form}>
            <Form.Item name="email" rules={[{ required: true, message: "Please enter your email" }, { type: "email" }]}>
              <Input prefix={<UserOutlined />} type="email" placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password" },
                { min: 4, max: 16 },
              ]}
            >
              <Input prefix={<LockOutlined />} type="password" placeholder="Please input password" />
            </Form.Item>

            <Form.Item>
              <SubmitButton type="primary" htmlType="submit" loading={loading}>
                Login
              </SubmitButton>
            </Form.Item>
          </CustomizedForm>
        </FormContainer>
      </LoginBox>
    </>
  );
}
