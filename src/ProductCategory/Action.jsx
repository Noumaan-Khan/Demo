import authApi from "../utils/auth_api";
import api from "../utils/api";

export const save =  (obj) => {
    let data = {
        method: 'POST',
        url: '/rest/productcategory/save',
        data: obj,
    };
  return (  
      authApi(data)
          .then((res) => {
              return res;
          })
          .catch((err) => {
              throw err;
          })
        )
};

export const getProductCategoryList =  (obj) => {
    let data = {
        method: 'GET',
        url: '/rest/productcategory/getList',
        data: obj,
    };
  return (  
      authApi(data)
          .then((res) => {
              return res;
          })
          .catch((err) => {
              throw err;
          })
        )
};


export const deleteProductCategory =  (id) => {
    let data = {
        method: 'DELETE',
        url: `/rest/productcategory/delete?id=${id}`,
    };
  return (  
      authApi(data)
          .then((res) => {
              return res;
          })
          .catch((err) => {
              throw err;
          })
        )
};



export const getProductCategoryById =  (id) => {
    let data = {
        method: 'GET',
        url: `/rest/productcategory/getById?id=${id}`,
    };
  return (  
      authApi(data)
          .then((res) => {
              return res;
          })
          .catch((err) => {
              throw err;
          })
        )
};


export const update =  (obj) => {
    let data = {
        method: 'POST',
        url: '/rest/productcategory/update',
        data: obj,
    };
  return (  
      authApi(data)
          .then((res) => {
              return res;
          })
          .catch((err) => {
              throw err;
          })
        )
};