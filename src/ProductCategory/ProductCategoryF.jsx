import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Popconfirm } from 'antd';
import { ProductOutlined, DeleteOutlined } from '@ant-design/icons';
import AddProductCategoryModalF from './AddProductCategoryModalF';
import { deleteProductCategory, getProductCategoryList } from './Action';
import UpdateProductCategory from './UpdateProductCategory';


import { ConfigProvider } from 'antd';
import ar_EG from 'antd/locale/ar_EG';

const ProductCategoryF = () => {
  const [sortedInfo, setSortedInfo] = useState({});
  const [getList, setGetList] = useState([]);

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const deleteProductCategoryList = async (id) => {
    try {
      await deleteProductCategory(id);
      fetchProductCategoryList(); 
    } catch (error) {
      console.error("Error deleting Product Category:", error);
    }
  };

  const confirm = (id) => {
    deleteProductCategoryList(id);
  };

  const columns = [
    {
      title: 'PRODUCT CATEGORY CODE',
      dataIndex: 'productCategoryCode',
      key: 'productCategoryCode',
      sorter: (a, b) => a.productCategoryCode - b.productCategoryCode,
      sortOrder: sortedInfo.columnKey === 'productCategoryCode' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'PRODUCT CATEGORY NAME',
      dataIndex: 'productCategoryName',
      key: 'productCategoryName',
      sorter: (a, b) => a.productCategoryName.localeCompare(b.productCategoryName),
      sortOrder: sortedInfo.columnKey === 'productCategoryName' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'action',
      
      render: (_, record) => (
        
        <div 
        style={{ 
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px' }}>
          <UpdateProductCategory id={record.id} />
          <Popconfirm
            title="Are you sure you want to delete"
            onConfirm={() => {confirm(record.id)
              console.log(record.id,'Idiot')
            }}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <Button
             className="col-md-3"
             htmlType="button">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const fetchProductCategoryList = async () => {
    try {
      const res = await getProductCategoryList();
      setGetList(res.data);
    } catch (error) {
      console.error("Error fetching Product Category List:", error);
    }
  };

  useEffect(() => {
    fetchProductCategoryList();
  }, []);

  return (
    <div>
      <ConfigProvider locale={ar_EG}>
      <h2 style={{ color: '#2064d8' ,marginRight:'70%' }}>
        <ProductOutlined /> <br/><br/>Product Category
      </h2>
      <hr />
      <AddProductCategoryModalF />
      <br />
      <Space style={{ marginBottom: 16 }} />
      <Table
        columns={columns}
        dataSource={getList}
        onChange={handleChange}
        rowKey="id"
      /></ConfigProvider>
    </div>
  );
};

export default ProductCategoryF;

