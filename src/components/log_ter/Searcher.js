import React from "react";
import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  theme,
  message,
} from "antd";
import dayjs from "dayjs";
import { searchPETerrestresApi } from "../../api/api";

const AdvancedSearchForm = ({
  clientes,
  setLoadListPET,
  loadListPET,
  setPETerrestres,
}) => {
  var utc = require("dayjs/plugin/utc");
  dayjs.extend(utc);
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const onFinish = (values) => {
    if (values.fecha_entrega !== undefined) {
      let dd = values.fecha_entrega.$D;
      let mm = values.fecha_entrega.$M + 1;
      let yyyy = values.fecha_entrega.$y;

      values.fecha_entrega = dayjs.utc(`${yyyy}-${mm}-${dd}`).format();
      values.fecha_registro = dayjs.utc().format();
    }

    let params = {
      placa_vehiculo: values.placa_vehiculo || "",
      id_cliente: values.id_cliente || "",
      fecha_entrega: values.fecha_entrega || "",
    };

    const page = 1;
    searchPETerrestresApi(params, page).then((res) => {
      if (res.estado) {
        if (res.data === null) {
          message.warning(res.mensaje);
          //setLoadListPET(!loadListPET);
          setPETerrestres([]);
        } else {
          message.success(res.mensaje);
          setPETerrestres(res.data);
        }
      } else {
        message.error(res.mensaje);
        setPETerrestres([]);
      }
    });
  };
  return (
    <Form
      form={form}
      name="advanced_search"
      style={formStyle}
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item name="id_cliente" label="Cliente">
            <Select allowClear>
              {clientes.map((cliente) => (
                <Select.Option key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="fecha_entrega" label="Fecha Entrega">
            <DatePicker />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="placa_vehiculo"
            label="Placa Vehículo"
            rules={[
              {
                required: false,
                message:
                  "Debe cumplir el formato (3 letras iniciales y 3 números finales)",
                pattern: /\b[a-zA-Z]{3}[0-9]{3}\b/gm,
              },
            ]}
          >
            <Input allowClear />
          </Form.Item>
        </Col>
        <Col
          span={6}
          style={{
            textAlign: "right",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "45%" }}
            icon={<SearchOutlined />}
          >
            Buscar
          </Button>
          <Button
            style={{
              margin: "0 8px",
              width: "45%",
            }}
            onClick={() => {
              form.resetFields();
            }}
            icon={<ClearOutlined />}
          >
            Limpiar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
const Searcher = ({
  clientes,
  setLoadListPET,
  loadListPET,
  setPETerrestres,
}) => (
  <AdvancedSearchForm
    clientes={clientes}
    loadListPET={loadListPET}
    setLoadListPET={setLoadListPET}
    setPETerrestres={setPETerrestres}
  />
);

export default Searcher;
