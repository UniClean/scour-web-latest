import { api } from "@/plugins/api";

export const getAllEmployees = () => api
    .get('/api/employees/')
    .then(res => res.data);

export const getEmployee = (id) => api
.get(`/api/employees/${id}/`)
.then(res => res.data);

export const createEmployee = (employee) => api
    .post('/api/employees/', employee)
    .then(res => res.data);

export const updateEmployee = (id, employee) => api
    .put(`/api/employees/${id}/update/`, employee)
    .then(res => res.data);

export const deleteEmployee = (id) => api
    .delete(`/api/employees/${id}/delete/`)
    .then(res => res.data);