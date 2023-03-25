import { api } from "@/plugins/api";

export const getObjectsList = () => api
    .get('/api/objects/')
    .then(res => res.data);