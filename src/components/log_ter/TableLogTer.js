import React, { useState } from "react";
import { Space, Table, Button, Popconfirm, message } from "antd";
import dayjs from "dayjs";
import ModalLogTer from "./ModalLogTer";
import { deleteLogTerApi } from "../../api/api";

const TableLogTer = ({
  data,
  setData,
  clientes,
  loadListPET,
  setLoadListPET,
}) => {
  var utc = require("dayjs/plugin/utc");
  dayjs.extend(utc);
  const [activeRow, setActiveRow] = useState({});
  const onEdit = (values) => {
    setOpen(false);
  };
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showPopconfirm = () => {
    setOpenPop(true);
  };
  const [openPop, setOpenPop] = useState(false);
  const [titleOfModal, setTitleOfModal] = useState(
    "Editar Logística Terrestre"
  );
  const [operation, setOperation] = useState("Editar");
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Cliente",
      dataIndex: "cliente",
      key: "cliente",
    },
    {
      title: "Tipo Prod.",
      dataIndex: "tipo_producto",
      key: "tipo_producto",
    },
    {
      title: "Cantidad Prod.",
      dataIndex: "cantidad_producto",
      key: "cantidad_producto",
    },
    {
      title: "Fecha Registro",
      dataIndex: "fecha_registro",
      key: "fecha_registro",
      render: (value) => {
        let fr = dayjs.utc(value).format("DD-MM-YYYY");
        return <>{fr}</>;
      },
    },
    {
      title: "Fecha Entrega",
      dataIndex: "fecha_entrega",
      key: "fecha_entrega",
      render: (value) => {
        let fe = dayjs.utc(value).format("DD-MM-YYYY");
        return <>{fe}</>;
      },
    },
    {
      title: "Bodega Entrega",
      dataIndex: "bodega_entrega",
      key: "bodega_entrega",
    },
    {
      title: "Precio envio",
      dataIndex: "precio_envio",
      key: "precio_envio",
    },
    {
      title: "Dscto.",
      dataIndex: "dscto",
      key: "dscto",
    },
    {
      title: "Placa Vehiculo",
      dataIndex: "placa_vehiculo",
      key: "placa_vehiculo",
    },
    {
      title: "Nro. Guía",
      dataIndex: "nro_guia",
      key: "nro_guia",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        const ar = record;
        ar.fecha_entrega = dayjs(ar.fecha_entrega, "YYYY-MM-DD");
        ar.fecha_registro = dayjs(ar.fecha_registro, "YYYY-MM-DD");
        record = ar;
        return (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setActiveRow(record);
                setTitleOfModal("Editar Logística Terrestre");
                setOperation("Editar");
              }}
            >
              Editar
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                setOpen(true);
                setActiveRow(record);
                setTitleOfModal("Eliminar Logística Terrestre");
                setOperation("Eliminar");
              }}
            >
              Eliminar
            </Button>
            {/* <Popconfirm
            title="Eliminar el registro"
            description="¿Está seguro que desea eliminar este registro?"
            onConfirm={confirm}
            okButtonProps={{
              loading: confirmLoading,
            }}
            open={openPop}
          >
            <Button
              type="primary"
              danger
              onClick={() => {
                showPopconfirm();
                setActiveRow(record);
              }}
            >
              Eliminar
            </Button>
          </Popconfirm> */}
          </Space>
        );
      },
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <>
      <Table columns={columns} dataSource={data} />
      <ModalLogTer
        titleOfModal={titleOfModal}
        open={open}
        onCreate={onEdit}
        onCancel={() => {
          setOpen(false);
        }}
        setOpen={setOpen}
        clientes={clientes}
        activeRow={activeRow}
        operation={operation}
        loadListPET={loadListPET}
        setLoadListPET={setLoadListPET}
      />
    </>
  );
};

export default TableLogTer;
