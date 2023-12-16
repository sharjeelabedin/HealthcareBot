import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { LockFilled, MailFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Auth.index.css"
import myImage from "Assets/images/Login.png";

const Authentication: React.FC = () => {
  // Replace this with your image URL
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          flex: "1",
          backgroundImage: `url(${myImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display : "flex",
          alignItems : "center",
          flexDirection :"column",
          justifyContent : "center"
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
        <Form style={{ width: "40%" }}>
          <Form.Item>
            <h1 style={{ textAlign: "center" }}>Login</h1>
          </Form.Item>
          <Form.Item>
            <Input
              size="large"
              prefix={
                <MailFilled style={{ marginRight: "5px", color: "grey" }} />
              }
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item>
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
            <a style={{ marginTop: "5px" }} href="">
              Forgot Password
            </a>
          </div>
          <Form.Item>
            <Button
              style={{
                height: "40px",
                fontSize: "16px",
                backgroundColor: "#e93139",
                fontWeight: "bold",
              }}
              type="primary"
              block
              onClick={() => {
                navigate("/Home");
              }}
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
