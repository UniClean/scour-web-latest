import { api } from "@/plugins/api";

export const login = (credentials) =>
    api.post('/api/accounts/login/', credentials)
        .then(res => res.data);