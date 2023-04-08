import React from "react";
import { Form, Input, message, Modal } from "antd";
import { createClienteApi } from "../../api/api";

const ModalCliente = ({ titleOfModal, open, setOpen }) => {
  const [form] = Form.useForm();
  const onCreate = (values) => {
    createClienteApi(values).then((res) => {
      if (res.estado) {
        if (res.data === null) {
          message.warning(res.mensaje);
        } else {
          message.success(res.mensaje);
        }
      } else {
        message.error(res.mensaje);
      }
    });
    setOpen(false);
  };
  const onCancel = () => {
    form.resetFields();
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      title={titleOfModal}
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="nombre"
          label="Nombre"
          rules={[
            {
              required: true,
              message: "Porfavor ingrese un nombre",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCliente;
