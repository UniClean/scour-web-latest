import { api } from "@/plugins/api";

export const getEquipmentsList = () => api
    .get('/api/equipments/')
    .then(res => res.data);

export const getEquipment = (id) => api
    .get(`/api/equipments/${id}/`)
    .then(res => res.data);

export const createEquipment = (equipment) => api
    .post('/api/equipments/', equipment)
    .then(res => res.data);

export const updateEquipment = (id, equipment) => api
    .put(`/api/equipments/${id}/update/`, equipment)
    .then(res => res.data);

export const deleteEquipment = (id) => api
    .delete(`/api/equipments/${id}/delete/`)
    .then(res => res.data);

export const assignObject = (id, object) => api
    .post(`/api/equipments/${id}/assign_object/`, object)
    .then(res => res.data);

export const getAssignedEquipment = (object_id) => api
    .get(`/api/equipments/object/${object_id}/`)
    .then(res => res.data);