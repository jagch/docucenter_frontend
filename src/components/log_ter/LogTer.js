import "./logter.css";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, theme, Button, Radio, Space } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import MainHeader from "../main_header/MainHeader";
import ModalLogTer from "./ModalLogTer";
import TableLogTer from "./TableLogTer";
import { getAllClientesApi, getAllPETerrestresApi } from "../../api/api";
import Searcher from "./Searcher";
const { Content, Footer } = Layout;

const { Item } = Breadcrumb;

const LogTer = ({ setRefreshCheckLogin }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [open, setOpen] = useState(false);

  const [loadListPET, setLoadListPET] = useState(true);

  const [clientes, setClientes] = useState([]);

  const [pETerrestres, setPETerrestres] = useState([]);

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
    const loadPETerrestres = async () => {
      const response = await getAllPETerrestresApi();
      if (response.data !== null) {
        setPETerrestres(response.data);
      } else {
        setPETerrestres([]);
      }
    };
    loadPETerrestres().catch((e) => {
      console.log(e.toString());
    });
  }, [loadListPET]);

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
          <Item>Logística Terrestre</Item>
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
                {"Plan entrega Terrestre"}
              </Button>
            </Space>
            <ModalLogTer
              open={open}
              setOpen={setOpen}
              titleOfModal={"Crear Logística Terrestre"}
              operation="Crear"
              clientes={clientes}
              loadListPET={loadListPET}
              setLoadListPET={setLoadListPET}
            />
          </div>
          <div>
            <Searcher
              clientes={clientes}
              loadListPET={loadListPET}
              setLoadListPET={setLoadListPET}
              setPETerrestres={setPETerrestres}
            />
          </div>
          <TableLogTer
            data={pETerrestres}
            setData={setPETerrestres}
            clientes={clientes}
            loadListPET={loadListPET}
            setLoadListPET={setLoadListPET}
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
export default LogTer;
