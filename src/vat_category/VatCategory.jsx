import React, { useEffect, useState } from 'react';
import { Space, Table } from 'antd';
import {BarChartOutlined } from '@ant-design/icons';
import { getVatCategory } from './Action';

// const data = [
//   {
//     key: '1',
//     name: 'STANDARD RATED TAX (15%)',
//     percent: 15,
//   },
//   {
//     key: '2',
//     name: 'ZERO RATED TAX (0%)',
//     percent: 0,
//   },
//   {
//     key: '3',
//     name: 'EXEMPT',
//     percent: 0,
//   },
//   {
//     key: '4',
//     name: 'OUT OF SCOPE',
//     percent: 0,
//   },
//   {
//     key: '5',
//     name: 'STANDARD RATED - CUSTOMS (15%) ',
//     percent: 15,
//   },
//   {
//     key: '6',
//     name: 'ZERO RATED – EXPORTS (0%)',
//     percent: 0,
//   },
//   {
//     key: '7',
//     name: 'REVERSE CHARGE (15%)',
//     percent: 15,
//   },
//   {
//     key: '8',
//     name: 'N/A',
//     percent: 0,
//   },
// ];

const VatCategory = () => {
    const[ vatCategoryList, setVatCategoryList]=useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setSortedInfo(sorter);
  };

  
  const fetchVatCategory = async () => {
    try {
      const res = await getVatCategory();
      const vatCategoryList = res.data;
      setVatCategoryList(vatCategoryList);
      console.log(vatCategoryList[0]);
    } catch (error) {
      console.error("Error fetching Vat Cat:", error);
    }
  };

  
  useEffect(() => {
    fetchVatCategory();
  }, []);


  const columns = [
    {
      title: 'VAT NAME',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'VAT PERCENTAGE',
      dataIndex: 'vat',
      key: 'vat',
      sorter: (a, b) => a.percent - b.percent,
      sortOrder: sortedInfo.columnKey === 'percent' ? sortedInfo.order : null,
      ellipsis: true,
      render: (text) => `${text}%`, 
    },
  ];

  return (
    <>
    <div>
   <h2 style={{color:'#2064d8'}}><BarChartOutlined />&nbsp;&nbsp;VAT Category</h2>
      <hr/>
      <br/>

    </div>

      <Table columns={columns}
       dataSource={vatCategoryList} 
       onChange={handleChange} />
    </>
  );
};

export default VatCategory;
