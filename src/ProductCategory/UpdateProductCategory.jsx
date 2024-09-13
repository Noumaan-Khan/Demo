import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Typography,message } from 'antd';
import { InfoCircleOutlined, EditOutlined } from '@ant-design/icons';
import { getProductCategoryById } from './Action';
import { update } from './Action';

const { Title } = Typography;

const UpdateProductCategory = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
    fetchProductCategoryById();
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchProductCategoryById = async () => {
    try {
      const res = await getProductCategoryById(id);
      const productCategoryById = res.data;
      form.setFieldsValue(productCategoryById); 
    } catch (err) {
      console.error("Error fetching Product Category:", err);
    }
  };

  const onFinish = async (value) => {
    const payload={
        id:id,
        productCategoryCode: value.productCategoryCode || "",
        productCategoryName: value.productCategoryName || "",

    }
    console.log('Form values:', value);
    try {
      await update(payload);
      message.success("Product Category Updated successfully");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      message.error("Updated failed. Please try again.");
    }
  };

  // useEffect(() => {
  //   if (id) {
  //     fetchProductCategoryById();
  //   }
  // }, [id]);

  return (
    <>
      <Button className="col-md-3" htmlType="button" onClick={showModal}>
        <EditOutlined />
      </Button>
      <Modal
        title={
          <>
            <Title level={4} style={{ color: "#2064d8", margin: 0 }}>
              Update Product Category
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
          <Button key="submit" type="primary" onClick={handleOk}>
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
          <p style={{ color: '#888' }}>
            Note: If the product category is associated with a product, it cannot be deleted.
          </p>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateProductCategory;
