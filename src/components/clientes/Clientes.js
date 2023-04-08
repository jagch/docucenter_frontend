import "./clientes.css";
import React, { useState } from "react";
import { Breadcrumb, Layout, theme, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import MainHeader from "../main_header/MainHeader";
import ModalCliente from "./ModalCliente";
const { Content, Footer } = Layout;

const Clientes = ({ setRefreshCheckLogin }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [open, setOpen] = useState(false);

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
          <Breadcrumb.Item>Clientes</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          <div>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
              }}
            >
              <PlusCircleOutlined />
              Cliente
            </Button>
            <ModalCliente
              titleOfModal="Crear Cliente"
              open={open}
              setOpen={setOpen}
            />
          </div>
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
export default Clientes;
