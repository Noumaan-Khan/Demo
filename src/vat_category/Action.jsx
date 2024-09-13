import authApi from "../utils/auth_api";
import api from "../utils/api";

export const getVatCategory = () => {
    let data = {
        method: 'GET',
        url: 'rest/vat/getList',
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