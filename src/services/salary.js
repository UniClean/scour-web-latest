import { api } from "@/plugins/api";

export const getSalaryOfOneEmployee = (employee_id, month, year) => 
api.get(`/api/salary/${employee_id}/${month}/${year}/`)
    .then(res => res.data);

export const getAllSalaries = (month, year) => 
api.get(`/api/salary/all_employees/${month}/${year}/`)
    .then(res => res.data);
    

export const changeStatusOfSalary = (employee_salary_ids) =>
api.post(`/api/salary/change_paid_status/`, employee_salary_ids)
.then(res => res.data);

