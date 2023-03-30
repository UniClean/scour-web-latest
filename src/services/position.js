import { api } from "@/plugins/api";

export const getAllPositions = () => api
    .get('/api/position/')
    .then(res => res.data);