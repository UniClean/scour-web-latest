import { api } from "@/plugins/api";

export const getOrdersList = () => api
    .get('/api/orders/')
    .then(res => res.data);

export const getOrdersByStatus= (status) => api
.get(`/api/orders/status/${status}/`)
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

export const confirmOrder = (order_id) => api
    .post(`/api/orders/${order_id}/confirm/`)
    .then(res => res.data);

export const getAssignedEmployees = (order_id) => api
    .get(`/api/orders/${order_id}/assigned_employees`)
    .then(res => res.data);

export const displayOrderFile = (id) =>
    api.get(`/api/orders/attachment_evidence/${id}/file/`, { responseType: 'blob' })
        .then(res => res.data);