<template>
    <div class="w-93% m-auto">

        <div class="m-b-5 flex items-center justify-between">
            <div class="header ml-10 mt-5">Страница работников</div>

        <div class="flex justify-end">
            <Button icon="pi pi-plus" label="Добавить сотрудника"
                class="border-[#060E28] bg-white text-[#060E28] font-medium hover:bg-[#060E28] mt-5 mr-5"
                @click="redirectToCreatePage" />
        </div></div>

        <TabView class="ml-10 mt-5">
            <TabPanel header="Клинеры">

                <div class="employee-container">
            <EmployeeCard v-for="employee in cleaners" :employee="employee" :editEmployee="editEmployee"
              :key="employee.id" @updateEmployees="getAllEmployees"/>
                </div>

            </TabPanel>

            <TabPanel header="Супервайзеры">
                <div class="employee-container">
                <EmployeeCard v-for="employee in supervisors" :employee="employee" :editEmployee="editEmployee"
                :key="employee.id" @updateEmployees="getAllEmployees"/>
                </div>
            </TabPanel>

        </TabView>

        <div v-if="loading" class="flex justify-center items-center">
            <ProgressSpinner />
        </div>
    
    </div>
</template>


<script>
import { getAllEmployees} from '@/services';
import Button from 'primevue/button'
import EmployeeCard from './components/EmployeeCard.vue';
import ProgressSpinner from 'primevue/progressspinner';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import router from '../../router'
export default {
    name: 'EmployeePage',
    data() {
        return {
            employeeList: [],
            loading: false,
            cleaners: [],
            supervisors: []
        };
    },
    components: {
        Button,
        EmployeeCard,
        ProgressSpinner,
        TabView,
        TabPanel,
    },
    methods: {
       
        getAllEmployees() {
            getAllEmployees().then(res => {
                this.employeeList = res;
                this.cleaners = this.filterEmployeesByPosition(2);
                this.supervisors = this.filterEmployeesByPosition(1);
                this.loading = false;
            });
        },

        editEmployee(employeeId) {
            router.push(`employees/edit/${employeeId}`)
        },

        
    getEmployee(employeeId) {
            router.push(`employees/edit/${employeeId}`)
        },
    redirectToCreatePage() {
        router.push('employees/create')
        },

    filterEmployeesByPosition(position) {
            return this.employeeList.filter(employee => employee.position_id === position);
        },
    
    
    
    },
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