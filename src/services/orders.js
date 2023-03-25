import { api } from "@/plugins/api";

export const getOrdersList = () => api
    .get('/api/orders/')
    .then(res => res.data);