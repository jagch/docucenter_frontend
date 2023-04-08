import React, { useEffect } from "react";
import { Form, Input, Modal, DatePicker, Select, message } from "antd";
import dayjs from "dayjs";
import { createLogMarApi, editLogMarApi, deleteLogMarApi } from "../../api/api";

const ModalLogMar = ({
  titleOfModal,
  open,
  setOpen,
  clientes,
  activeRow = {},
  operation = "",
  loadListPEM,
  setLoadListPEM,
}) => {
  var utc = require("dayjs/plugin/utc");
  dayjs.extend(utc);
  const [form] = Form.useForm();
  const onCreate = (values) => {
    let dd = values.fecha_entrega.$D;
    let mm = values.fecha_entrega.$M + 1;
    let yyyy = values.fecha_entrega.$y;

    values.fecha_entrega = dayjs.utc(`${yyyy}-${mm}-${dd}`).format();
    values.fecha_registro = dayjs.utc().format();

    let reqBody = {
      id_puerto_entrega: values.id_puerto_entrega,
      nro_flota: values.nro_flota,
      id_cliente: values.id_cliente,
      tipo_producto: values.tipo_producto,
      cantidad_producto: Number(values.cantidad_producto),
      fecha_registro: values.fecha_registro,
      fecha_entrega: values.fecha_entrega,
      precio_envio: Number(Number(values.precio_envio).toFixed(2)),
      nro_guia: values.nro_guia,
      dscto: Number(Number(values.dscto).toFixed(2)),
    };

    createLogMarApi(reqBody).then((res) => {
      if (res.estado) {
        if (res.data === null) {
          message.warning(res.mensaje);
        } else {
          message.success(res.mensaje);
          setLoadListPEM(!loadListPEM);
        }
      } else {
        message.error(res.mensaje);
      }
    });
    setOpen(false);
  };
  const onEdit = (values) => {
    let dd = values.fecha_entrega.$D;
    let mm = values.fecha_entrega.$M + 1;
    let yyyy = values.fecha_entrega.$y;

    values.fecha_entrega = dayjs.utc(`${yyyy}-${mm}-${dd}`).format();
    values.fecha_registro = dayjs.utc().format();
    let reqBody = {
      id: values.id,
      id_puerto_entrega: values.id_puerto_entrega,
      nro_flota: values.nro_flota,
      id_cliente: values.id_cliente,
      tipo_producto: values.tipo_producto,
      cantidad_producto: Number(values.cantidad_producto),
      fecha_registro: values.fecha_registro,
      fecha_entrega: values.fecha_entrega,
      precio_envio: Number(Number(values.precio_envio).toFixed(2)),
      nro_guia: values.nro_guia,
      dscto: Number(Number(values.dscto).toFixed(2)),
    };

    editLogMarApi(reqBody).then((res) => {
      if (res.estado) {
        if (res.data === null) {
          message.warning(res.mensaje);
        } else {
          message.success(res.mensaje);
          setLoadListPEM(!loadListPEM);
        }
      } else {
        message.error(res.mensaje);
      }
    });
    setOpen(false);
  };
  const onDelete = (values) => {
    deleteLogMarApi(values.id).then((res) => {
      if (res.estado) {
        message.success(res.mensaje);
        setLoadListPEM(!loadListPEM);
      } else {
        message.error(res.mensaje);
      }
    });
    setOpen(false);
  };
  const dateFormat = "DD/MM/YYYY";
  const onCancel = () => {
    form.resetFields();
    setOpen(false);
  };
  const calcularDscto = () => {
    let cantidadProducto = form.getFieldValue("cantidad_producto");
    if (cantidadProducto > 10) {
      let precioEnvio = form.getFieldValue("precio_envio") | 0;
      form.setFieldValue("dscto", (precioEnvio * 0.03).toFixed(2));
    } else {
      form.setFieldValue("dscto", 0);
    }
  };

  useEffect(() => {
    form.setFieldValue("tipo_producto", "marítimo");
    if (operation === "Editar" || operation === "Eliminar") {
      form.setFieldsValue(activeRow);
    } else {
      return () => {
        operation = "Crear";
      };
    }
  });

  return (
    <Modal
      open={open}
      title={titleOfModal}
      okText={operation}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            switch (operation) {
              case "Editar":
                onEdit(values);
                break;
              case "Crear":
                onCreate(values);
                break;
              case "Eliminar":
                onDelete(values);
                break;
              default:
                console.log("there is not operation to call");
            }
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        name="form_log_mar"
        labelCol={{
          span: 9,
        }}
        wrapperCol={{
          span: 20,
        }}
        layout="horizontal"
        size="small"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item name="id" label="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          name="id_cliente"
          label="Cliente"
          rules={[
            {
              required: true,
              message: "Porfavor seleccione un cliente",
            },
          ]}
        >
          <Select>
            {clientes.map((cliente) => (
              <Select.Option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="tipo_producto"
          label="Tipo producto"
          rules={[
            {
              required: true,
              message: "Porfavor ingrese un tipo de producto",
            },
          ]}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          name="cantidad_producto"
          label="Cantidad producto"
          rules={[
            {
              required: true,
              message: "Porfavor ingrese una cantidad",
            },
          ]}
        >
          <Input onChange={calcularDscto} type="number" />
        </Form.Item>
        <Form.Item
          name="fecha_entrega"
          label="Fecha entrega"
          rules={[
            {
              required: true,
              message: "Porfavor seleccione una fecha de entrega",
            },
          ]}
        >
          <DatePicker format={dateFormat} />
        </Form.Item>
        <Form.Item
          name="id_puerto_entrega"
          label="Puerto entrega"
          rules={[
            {
              required: true,
              message: "Porfavor seleccione un puerto de entrega",
            },
          ]}
        >
          <Select>
            <Select.Option value={1}>Puerto A</Select.Option>
            <Select.Option value={2}>Puerto B</Select.Option>
            <Select.Option value={3}>Puerto C</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="precio_envio"
          label="Precio de envío"
          rules={[
            {
              required: true,
              message: "Porfavor ingrese una precio de envío",
            },
          ]}
        >
          <Input onChange={calcularDscto} />
        </Form.Item>
        <Form.Item
          name="dscto"
          label="Dscto."
          rules={[
            {
              required: true,
              message: "El dscto. debe ser calculado",
            },
          ]}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          name="nro_flota"
          label="Nro. flota"
          rules={[
            {
              required: true,
              message:
                "Debe cumplir el formato (3 letras iniciales, seguidas de 4 números y finalizando con una letra)",
              pattern: /\b[a-zA-Z]{3}[0-9]{4}[a-zA-Z]{1}\b/gm,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="nro_guia"
          label="Nro. guía."
          rules={[
            {
              required: true,
              message:
                "Debe cumplir el formato (Numero único alfanumérico de 10 dígitos)",
              pattern: /\b[a-zA-Z0-9]{10}\b/gm,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalLogMar;
