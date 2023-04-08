import "./logMar.css";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, theme, Button, Radio, Space } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import MainHeader from "../main_header/MainHeader";
import ModalLogMar from "./ModalLogMar";
import TableLogMar from "./TableLogMar";
import { getAllClientesApi, getAllPEMaritimosApi } from "../../api/api";
import Searcher from "./Searcher";
const { Content, Footer } = Layout;

const { Item } = Breadcrumb;

const LogMar = ({ setRefreshCheckLogin }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [open, setOpen] = useState(false);

  const [loadListPEM, setLoadListPEM] = useState(true);

  const [clientes, setClientes] = useState([]);

  const [pEMaritimos, setPEMaritimos] = useState([]);

  useEffect(() => {
    const loadClientes = async () => {
      const response = await getAllClientesApi();
      let data = [];
      if (response.data !== null) {
        for (let i = 0; i < response.data.length; ++i) {
          data.push({
            id: response.data[i].id,
            nombre: response.data[i].nombre,
          });
        }
        setClientes(data);
      }
    };
    loadClientes().catch((e) => {
      console.log(e.toString());
    });
  }, []);

  useEffect(() => {
    const loadPEMaritimo = async () => {
      const response = await getAllPEMaritimosApi();
      if (response.data !== null) {
        setPEMaritimos(response.data);
      } else {
        setPEMaritimos([]);
      }
    };
    loadPEMaritimo().catch((e) => {
      console.log(e.toString());
    });
  }, [loadListPEM]);

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
          <Item>DOCUCENTER</Item>
          <Item>Logística Maritima</Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          <div>
            <Space size={"large"}>
              <Button
                type="primary"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <PlusCircleOutlined />
                {"Plan entrega Marítimo"}
              </Button>
            </Space>
            <ModalLogMar
              open={open}
              setOpen={setOpen}
              titleOfModal={"Crear Logística Marítima"}
              operation="Crear"
              clientes={clientes}
              loadListPEM={loadListPEM}
              setLoadListPEM={setLoadListPEM}
            />
          </div>
          <div>
            <Searcher
              clientes={clientes}
              loadListPEM={loadListPEM}
              setLoadListPEM={setLoadListPEM}
              setPEMaritimos={setPEMaritimos}
            />
          </div>
          <TableLogMar
            data={pEMaritimos}
            setData={setPEMaritimos}
            clientes={clientes}
            loadListPEM={loadListPEM}
            setLoadListPEM={setLoadListPEM}
          />
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
export default LogMar;
