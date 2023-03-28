import { api } from "@/plugins/api";

export const getObjectsList = () => api
    .get('/api/objects/')
    .then(res => res.data);

export const getObject = (id) => api
    .get(`/api/objects/${id}/`)
    .then(res => res.data);

export const createObject = (object) => api
    .post('/api/objects/', object)
    .then(res => res.data);

export const updateObject = (id, object) => api
    .put(`/api/objects/${id}/update/`, object)
    .then(res => res.data);

export const deleteObject = (id) => api
    .delete(`/api/objects/${id}/delete/`)
    .then(res => res.data);