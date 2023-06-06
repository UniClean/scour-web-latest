<template>
    <div class="w-93% m-auto">

        <div class="m-b-5 flex items-center justify-between">
            <div class="header ml-10 mt-5">Страница заявок на инвентарь</div>

            <div class="flex justify-end">
            <Button label="Инвентарь"
                class="border-[#060E28] bg-white text-[#060E28] font-medium mt-5 mr-3"
                @click="redirectInventoryPage" />
                <Button label="Оборудование"
                class="border-[#060E28] bg-white text-[#060E28] font-medium  mt-5 mr-3"
                @click="redirectToEquipmentPage" />
        </div></div>


        <TabView class="ml-10 mt-5">


            <TabPanel header="Созданные заявки">

                <div class="order-container">
                    <inventoryOrderCard v-for="inventoryOrder in createdOrders" :inventoryOrder="inventoryOrder" 
                        :key="inventoryOrder.id"  class="order-card" />
                </div>

            </TabPanel>



            <TabPanel header="На выполнении">

                <div class="order-container">
                    <inventoryOrderCard v-for="inventoryOrder in inProgressOrders" :inventoryOrder="inventoryOrder" 
                    :key="inventoryOrder.id" class="order-card"/>
                </div>

            </TabPanel>


            <TabPanel header="Завершенные заявки">

                <div class="order-container">
                    <inventoryOrderCard v-for="inventoryOrder in completedOrders" :inventoryOrder="inventoryOrder" 
                    :key="inventoryOrder.id" class="order-card" />
                </div>

            </TabPanel>


        </TabView>
        <div v-if="loading" class="flex justify-center items-center">
            <ProgressSpinner />
        </div>  

    </div>

   


</template>




<script>
import { getInventoryOrders } from '@/services';
import Button from 'primevue/button'
import inventoryOrderCard from './components/inventoryOrderCard.vue';
import ProgressSpinner from 'primevue/progressspinner';
import router from '../../router'
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
export default {
    name: 'InventoryOrders',
    data() {
        return {
            allOrders: [],
            createdOrders: [],
            inProgressOrders: [],
            completedOrders: [],
            loading: false,
        };
    },
    components: {
        Button,
        inventoryOrderCard,
        ProgressSpinner,
        TabView,
        TabPanel,
        
    },
    methods: {

        getInventoryOrders() {
            getInventoryOrders().then(res => {
                this.allOrders = res;
                this.createdOrders = this.filterOrdersByStatus('CREATED');
                this.inProgressOrders =  this.filterOrdersByStatus('IN_PROGRESS');
                this.completedOrders =  this.filterOrdersByStatus('COMPLETED');
                this.loading = false;
            });
        },

        filterOrdersByStatus(status) {
            return this.allOrders.filter(order => order.status === status);
        },


        redirectToEquipmentPage() {
        router.push('/equipments')
        },

        redirectInventoryPage() {
        router.push('/inventory')
        },
      
    
    },
    mounted() {
        this.loading = true;
        this.getInventoryOrders()
            
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

