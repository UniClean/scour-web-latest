import { api } from "@/plugins/api";

export const getInventoryList = () => api
    .get('/api/inventory/')
    .then(res => res.data);

export const getInventory = (id) => api
    .get(`/api/inventory/${id}/`)
    .then(res => res.data);

export const createInventory = (inventory) => api
    .post('/api/inventory/', inventory)
    .then(res => res.data);

export const updateInventory = (id, inventory) => api
    .put(`/api/inventory/${id}/update/`, inventory)
    .then(res => res.data);

export const deleteInventory = (id) => api
    .delete(`/api/inventory/${id}/delete/`)
    .then(res => res.data);

export const getInventoryOrders = () => api
    .get('/api/inventory-orders/')
    .then(res => res.data);