<template>
    <div class="w-93% m-auto">

        <div class="m-b-5 flex items-center justify-between">
            <div class="header ml-10 mt-5">Страница работников</div>

        <div class="flex justify-end">
            <Button icon="pi pi-plus" label="Добавить сотрудника"
                class="border-[#060E28] bg-white text-[#060E28] font-medium hover:bg-[#060E28] mt-5 mr-5"
                @click="redirectToCreatePage" />
        </div></div>

        <div v-if="isDownloading" class="flex justify-center items-center">
            <ProgressSpinner />
        </div>
        <div class="employee-container">
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
            loading: false,
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
                this.loading = false;
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
        this.loading = true;
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

.employee-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 20px; 
   
  
}
</style>