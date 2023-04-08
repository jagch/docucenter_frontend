import React from "react";
import { Button, message, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../api/api";
import { setTokenApi } from "../../utils/utils";

const { Title } = Typography;

const Login = (props) => {
  const { setRefreshCheckLogin } = props;
  const onFinish = (values) => {
    loginApi(values).then((res) => {
      if (res.data !== null) {
        message.success(res.mensaje);
        setTokenApi(res.data.token);
        setRefreshCheckLogin(true);
      } else {
        message.error("Usuario o clave inválidas");
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div
        style={{
          margin: "0 auto",
          width: "50%",
          border: "1px #e3e3e3 solid",
          justifyContent: "center",
          marginTop: "150px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Title>DOCUCENTER LOGIN</Title>
        </div>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="usuario"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="clave"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Acceder
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default Login;
