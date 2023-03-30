<template>
    <div class="w-93% m-auto">

        <div class="flex justify-end">
            <Button icon="pi pi-plus" label="Добавить сотрудника"
                class="b-[#060E28] bg-white color-[#060E28] font-medium hover:bg-[#060E28]" @click="redirectToCreatePage" />
        </div>
        <div v-if="isDownloading" class="flex justify-center items-center">
            <ProgressSpinner />
        </div>
        <div class="flex flex-wrap">
            <EmployeeCard v-for="employee in employeeList" :employee="employee" :editEmployee="editEmployee"
             :deleteEmployee="deleteEmployee" :key="employee.id" />
        </div>
    </div>
</template>


<script>
import { getAllEmployees, deleteEmployee } from '@/services';
import Button from 'primevue/button'
import EmployeeCard from './components/EmployeeCard.vue';
import ProgressSpinner from 'primevue/progressspinner';
import router from '../../router'
export default {
    name: 'EmployeePage',
    data() {
        return {
            employeeList: [],
            isDownloading: false,
        };
    },
    components: {
        Button,
        EmployeeCard,
        ProgressSpinner,
    },
    methods: {
        getAllEmployees() {
            getAllEmployees().then(res => {
                this.employeeList = res;
                this.isDownloading = false;
            });
        },

        deleteEmployee(employeeId) {
            deleteEmployee(employeeId).then(res => {
                console.log(res)
            })
            this.getAllEmployees()
        },

        editEmployee(employeeId) {
            router.push(`employees/edit/${employeeId}`)
        },

        
    getEmployee(employeeId) {
            router.push(`employees/edit/${employeeId}`)
        },
    redirectToCreatePage() {
        router.push('employees/create')
        }},
    mounted() {
        this.isDownloading = true;
        this.getAllEmployees();
    },
}
</script>

  
<style>
@keyframes p-progress-spinner-color {

    100%,
    0% {
        stroke: #060E28;
    }

    40% {
        stroke: #060E28;
    }

    66% {
        stroke: #060E28;
    }

    80%,
    90% {
        stroke: #060E28;
    }
}
</style>