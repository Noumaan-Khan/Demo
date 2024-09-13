import React, { useState } from 'react';
import { Button, Modal, Form, Input, message, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { save } from './Action';

const { Title } = Typography;

const AddProductCategoryModalF = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();


  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    console.log('Form values:', values);
    try {
      await save(values);
      message.success("Product Category Saved successfully");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      message.error("Save failed. Please try again.");
    }
  };

  return (
    <>
      <Button
        type="primary"
        shape="round"
        style={{
          maxWidth: "200px",
          marginLeft: "80%",
          marginBottom: "1%",
        }}
        onClick={showModal}
      >
        Create Product Category
      </Button>
      <Modal
        title={
          <>
            <Title level={4} style={{ color: "#2064d8", margin: 0 }}>
              Add Product Category
            </Title>
            <hr />
          </>
        }
        visible={isModalOpen}
        onCancel={handleCancel}
        width={700}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            style={{ marginTop: '5%' }}
            name="productCategoryCode"
            label="Product Category Code"
            tooltip={{
              title: 'Product Category Code - unique identifier code of the product',
              icon: <InfoCircleOutlined />,
            }}
            rules={[{ required: true, message: "Please enter Product Category Code" }]}
          >
            <Input placeholder="Enter product category code" />
          </Form.Item>
          <Form.Item
            name="productCategoryName"
            label="Product Category Name"
            rules={[{ required: true, message: "Please enter Product Category Name" }]}
          >
            <Input placeholder="Enter product category name" />
          </Form.Item>
          <p style={{ fontStyle: 'italic', color: '#888' }}>
            Note: If the product category is associated with a product, it cannot be deleted.
          </p>
        </Form>
      </Modal>
    </>
  );
};

export default AddProductCategoryModalF;
