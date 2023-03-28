<template>
    <div class="w-93% m-auto p-10">


        <div class="mt-4">
            <DataTable :value="employeeList" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50]"
                :responsive="true">
                <Column field="first_name" header="Имя сотрудника" />
                <Column field="last_name" header="Фамилия сотрудника" />
                <Column field="email" header="Email сотрудника" />

            </DataTable>
        </div>


    </div>
</template>

<script>
import { getAllEmployees } from '@/services';


import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

export default {
    name: 'EmployeePage',
    data() {
        return {
            employeeList: [],
        };
    },
    components: {
        DataTable,
        Column
    },
    methods: {
        getAllEmployees() {
            getAllEmployees().then(res => {
                this.employeeList = res;
            });
        },
    },
    mounted() {
        this.getAllEmployees();
    },
}

</script>
