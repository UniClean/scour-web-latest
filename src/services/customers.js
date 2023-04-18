import { api } from "@/plugins/api";

export const getCustomerList = () =>
    api.get('/api/customers/')
    .then(res => res.data);

    export const getCustomer = (id) => 
    api.get(`/api/customers/${id}/`)
    .then(res => res.data);
    
    export const createCustomer = (customer) => 
    api.post('/api/customers/', customer)
        .then(res => res.data);
    
    export const updateCustomer = (id, customer) => 
    api.put(`/api/customers/${id}/update/`, customer)
        .then(res => res.data);
    
    export const deleteCustomer = (id) => 
    api.delete(`/api/customers/${id}/delete/`)
        .then(res => res.data);

    export const uploadFile = (fileFormData) => 
    api.post(`/api/customers/upload_contract_file/`, fileFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => res.data)
        