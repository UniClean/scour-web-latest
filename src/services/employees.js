import { api } from "@/plugins/api";

export const getAllEmployees = () => api
    .get('/api/employees/')
    .then(res => res.data);