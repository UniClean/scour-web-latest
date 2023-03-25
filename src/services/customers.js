import { api } from "@/plugins/api";

export const getCustomerList = () => api
    .get('/api/customers/')
    .then(res => res.data);

