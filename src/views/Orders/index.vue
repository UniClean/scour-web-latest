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

        <TabView class="ml-10 mt-5" >

            <TabPanel header="Созданные заявки" >
                
                    <div class="order-container" >
            <OrderCard v-for="order in plannedOrders" :order="order" :deleteOrder="deleteOrder" :editOrder="editOrder"
                 :key="order.id" class="order-card" :activeIndex="0"/>
                    </div>
                
            </TabPanel>

          

            <TabPanel header="На выполнении">
                
                <div class="order-container">
        <OrderCard v-for="order in inProgressOrders" :order="order" :deleteOrder="deleteOrder" :editOrder="editOrder"
             :key="order.id" class="order-card"/>
                </div>
            
            </TabPanel>


            <TabPanel header="Ждут подтверждения">
                
                <div class="order-container">
        <OrderCard v-for="order in completedOrders" :order="order" :deleteOrder="deleteOrder" :editOrder="editOrder"
             :key="order.id" class="order-card"/>
                </div>
            
            </TabPanel>

            <TabPanel header="Завершены">
                
                <div class="order-container">
        <OrderCard v-for="order in confirmedOrders" :order="order" :deleteOrder="deleteOrder" :editOrder="editOrder"
             :key="order.id" class="order-card"/>
                </div>
            
            </TabPanel>

            <TabPanel header="Просрочены">
                
                <div class="order-container">
        <OrderCard v-for="order in overdueOrders" :order="order" :deleteOrder="deleteOrder" :editOrder="editOrder"
             :key="order.id" class="order-card"/>
                </div>
            
            </TabPanel>
          
        </TabView>
        <div v-if="IsLoading" class="flex justify-center items-center">
            <ProgressSpinner />
        </div>
</div>
</template>




<script>
import { getOrdersList, deleteOrder } from '@/services';
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
            ordersList: [],
            isDownloading: false,
            createdOrders: [], 
            inProgressOrders: [],
            completedOrders: [],
            confirmedOrders: [],
            overdueOrders: []
            
        };
    },
    components: {
        Button,
        OrderCard,
        ProgressSpinner,
        TabView,
        TabPanel
    },
    methods: {
        getOrdersList() {
            getOrdersList().then(res => {
                this.ordersList = res;
                this.plannedOrders = this.filterOrdersByStatus('PLANNED');
                this.inProgressOrders =  this.filterOrdersByStatus('IN_PROGRESS');
                this.completedOrders =  this.filterOrdersByStatus('COMPLETED');
                this.confirmedOrders =  this.filterOrdersByStatus('CONFIRMED');
                this.overdueOrders = this.filterOrdersByStatus('OVERDUE');
                this.isDownloading = false;
            });
        },
        deleteOrder(orderId) {
            deleteOrder(orderId).then(res => {
                console.log(res)
            })
            this.getOrdersList()
        },
        editOrder(orderId) {
            router.push(`orders/edit/${orderId}`)
        },
        
        redirectToCreatePage() {
            router.push('orders/create')
        },
        filterOrdersByStatus(status) {
            return this.ordersList.filter(order => order.status === status);
        },
    },
    mounted() {
        this.isDownloading = true;
        this.getOrdersList();
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