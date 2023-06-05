<template>
    <div class="w-93% m-auto">

        <div class="m-b-5 flex items-center justify-between">
            <div class="header ml-10 mt-5">Страница заявок</div>

            <div class="flex justify-end">
                <Button icon="pi pi-plus" label="Добавить заявку"
                    class="border-[#060E28] bg-white text-[#060E28] font-medium hover:bg-[#060E28] mt-5 mr-5"
                    @click="redirectToCreatePage" />
            </div>
        </div>

        <TabView class="ml-10 mt-5">


            <TabPanel header="Созданные заявки">

                <div class="order-container">
                    <OrderCard v-for="order in plannedOrders" :order="order" 
                        :editOrder="editOrder" :key="order.id" class="order-card" @updateOrders="updateOrders" />
                </div>

            </TabPanel>



            <TabPanel header="На выполнении">

                <div class="order-container">
                    <OrderCard v-for="order in inProgressOrders" :order="order" 
                        :editOrder="editOrder" :key="order.id" class="order-card" @updateOrders="updateOrders"/>
                </div>

            </TabPanel>


            <TabPanel header="Ждут подтверждения">

                <div class="order-container">
                    <OrderCard v-for="order in completedOrders" :order="order" 
                        :editOrder="editOrder" :getAssignedEmployees="getAssignedEmployees" 
                        :key="order.id" class="order-card" @updateOrders="updateOrders"/>
                </div>

            </TabPanel>

            <TabPanel header="Завершены">

                <div class="order-container">
                    <OrderCard v-for="order in confirmedOrders" :order="order" 
                        :editOrder="editOrder" :key="order.id" class="order-card" />
                </div>

            </TabPanel>

            <TabPanel header="Просрочены">

                <div class="order-container">
                    <OrderCard v-for="order in overdueOrders" :order="order" 
                        :editOrder="editOrder" :key="order.id" class="order-card" />
                </div>

            </TabPanel>

        </TabView>
        <div v-if="loading" class="flex justify-center items-center">
            <ProgressSpinner />
        </div>  

    </div>

   


</template>




<script>
import { getOrdersByStatus } from '@/services';
import Button from 'primevue/button'
import OrderCard from './components/OrderCard.vue';
import ProgressSpinner from 'primevue/progressspinner';
import router from '../../router'
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
export default {
    name: 'OrdersPage',
    data() {
        return {
            inProgressOrders: [],
            completedOrders: [],
            confirmedOrders: [],
            overdueOrders: [],
            plannedOrders: [],
            loading: false,
        };
    },
    components: {
        Button,
        OrderCard,
        ProgressSpinner,
        TabView,
        TabPanel,
        
    },
    methods: {

        getPlannedOrders(status) {
            getOrdersByStatus(status).then(res => {
                this.plannedOrders = res;
                this.loading = false;
            });
        },

        getInProgressOrders(status) {
            getOrdersByStatus(status).then(res => {
                this.inProgressOrders = res;
                this.loading = false;
            });
        },

        getCompletedOrders(status) {
            getOrdersByStatus(status).then(res => {
                this.completedOrders = res;
                this.loading = false;
            });
        },

          getConfirmedOrders(status) {
             getOrdersByStatus(status).then(res => {
                this.confirmedOrders = res;
                  this.loading = false;
            });
        },

        getOverdueOrders(status) {
            getOrdersByStatus(status).then(res => {
                this.overdueOrders = res;
                this.loading = false;
            });
        },

        updateOrders() {
            this.loading = true;
            this.getPlannedOrders('PLANNED');
            this.getInProgressOrders('IN_PROGRESS');
            this.getCompletedOrders('COMPLETED');
            this.loading = false;
        },

        editOrder(orderId) {
            router.push(`orders/edit/${orderId}`)
        },


        redirectToCreatePage() {
            router.push('orders/create')
        },
      
        
    
    },
    mounted() {
        this.loading = true;
        this.getPlannedOrders('PLANNED');
        this.getInProgressOrders('IN_PROGRESS');
        this.getCompletedOrders('COMPLETED');
        this.getConfirmedOrders('CONFIRMED');
        this.getOverdueOrders('OVERDUE')     
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

.header {
    font-weight: bold;
    font-size: 24px;
}


.order-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

}
</style>