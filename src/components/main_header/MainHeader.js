import React from "react";
import { Layout, Menu, Button } from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  CarOutlined,
  ContainerOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { logoutApi } from "../../utils/utils";
const { Header } = Layout;

const MainHeader = ({ setRefreshCheckLogin }) => {
  const logout = () => {
    logoutApi();
    setRefreshCheckLogin(true);
  };
  return (
    <>
      <Header>
        <div className="logo" />
        <span style={{ float: "right" }}>
          <Link to="/">
            <Button
              onClick={logout}
              type="link"
              block
              icon={<ImportOutlined />}
            >
              Logout
            </Button>
          </Link>
        </span>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={[
            {
              label: <Link to="/">Home</Link>,
              key: "home",
              icon: <HomeOutlined />,
            },
            {
              label: <Link to="/clientes">Clientes</Link>,
              key: "clientes",
              icon: <TeamOutlined />,
            },
            {
              label: <Link to="/logTer">Logística Terrestre</Link>,
              key: "logTer",
              icon: <CarOutlined />,
            },
            {
              label: <Link to="/logMar">Logística Marítima</Link>,
              key: "logMar",
              icon: <ContainerOutlined />,
            },
          ]}
        />
      </Header>
    </>
  );
};

export default MainHeader;
