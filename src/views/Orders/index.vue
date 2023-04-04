<!-- <script>
import { getOrdersList } from '@/services//orders';
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
export default {
    name: 'OrdersPage',
    data() {
        return {
            ordersList: [],
        };
    },
    components: {
        DataTable,
        Column,
        Button,
    },
    methods: {
        getOrdersList() {
            getOrdersList().then(res => {
                this.ordersList = res;
            });
        },
    },
    mounted() {
        this.getOrdersList();
    },
}
</script> -->

<template>
    <div class="w-93% m-auto">

        <div class="flex justify-end">
            <Button icon="pi pi-plus" label="Создать заявку"
                class="b-[#060E28] bg-white color-[#060E28] font-medium hover:bg-[#060E28]" @click="redirectToCreatePage" />
        </div>
        <div v-if="isDownloading" class="flex justify-center items-center">
            <ProgressSpinner />
        </div>
        <div class="flex flex-wrap">
            <OrderCard v-for="order in ordersList" :order="order" :deleteOrder="deleteOrder" :editOrder="editOrder"
                 :key="order.id" />
        </div>
    </div>
</template>


<script>
import { getOrdersList, deleteOrder } from '@/services';
import Button from 'primevue/button'
import OrderCard from './components/OrderCard.vue';
import ProgressSpinner from 'primevue/progressspinner';
import router from '../../router'
export default {
    name: 'OrdersPage',
    data() {
        return {
            ordersList: [],
            isDownloading: false,
        };
    },
    components: {
        Button,
        OrderCard,
        ProgressSpinner,
    },
    methods: {
        getOrdersList() {
            getOrdersList().then(res => {
                this.ordersList = res;
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
        }
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
</style>