import { api } from "@/plugins/api";

export const getOrdersList = () => api
    .get('/api/orders/')
    .then(res => res.data);

export const getOrder = (id) => api
.get(`/api/orders/${id}/`)
.then(res => res.data);

export const createOrder = (order) => api
    .post('/api/orders/', order)
    .then(res => res.data);

export const updateOrder = (id, order) => api
    .put(`/api/orders/${id}/update/`, order)
    .then(res => res.data);

export const deleteOrder = (id) => api
    .delete(`/api/orders/${id}/delete/`)
    .then(res => res.data);