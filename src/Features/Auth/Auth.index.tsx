import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { LockFilled, MailFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Auth.index.css";
import myImage from "Assets/images/Login.png";
import Logo from "Assets/images/Logo.png";
import { authenticateUser } from "Utilities/authenticate";
const Authentication: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Unable to login, Invalid credentials",
    });
  };

  const onFinish = (values: any) => {
    if (authenticateUser(values)) {
      const jsonString = JSON.stringify(values);
      const base64String = btoa(jsonString);
      localStorage.setItem("token", base64String);
      navigate("/Home");
      return;
    }
    error();
  };
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {contextHolder}
      <div
        style={{
          flex: "0.6",
          backgroundImage: `url(${myImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1 className="login-cover-heading1">Elevating</h1>
        <h1 className="login-cover-heading2">Healthcare</h1>
        <h4 className="login-cover-heading3">IMPROVING LIVES</h4>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form
          style={{ width: "40%" }}
          onFinish={onFinish}
          initialValues={{ email: "", password: "" }}
          autoComplete="off"
        >
          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <img src={Logo} alt="" height={80} />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input
              size="large"
              prefix={
                <MailFilled style={{ marginRight: "5px", color: "grey" }} />
              }
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please enter your password!" }]}
            name={"password"}
          >
            <Input.Password
              prefix={
                <LockFilled
                  style={{ marginRight: "5px", color: "grey" }}
                  color={"grey"}
                />
              }
              size="large"
              placeholder="Password"
            />
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a style={{ marginTop: "5px" }}>Forgot Password</a>
          </div>
          <Form.Item>
            <Button
              style={{
                height: "40px",
                fontSize: "16px",
                backgroundColor: "#e93139",
                fontWeight: "bold",
                width: "100%",
              }}
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Authentication;
