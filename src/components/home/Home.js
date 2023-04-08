import "./home.css";
import React from "react";
import { Breadcrumb, Layout, theme, Typography } from "antd";
import MainHeader from "../main_header/MainHeader";
const { Content, Footer } = Layout;

const { Title } = Typography;

const Home = ({ setRefreshCheckLogin }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <MainHeader setRefreshCheckLogin={setRefreshCheckLogin} />
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          <Title>Bienvenido a DOCUCENTER!</Title>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        DOCUCENTER ©2023 Created by JOSE GUZMAN CHUMAN
      </Footer>
    </Layout>
  );
};
export default Home;
