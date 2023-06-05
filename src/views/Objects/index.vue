<template>
    <div class="w-93% m-auto">
      
        <div class="m-b-5 flex items-center justify-between">
            <div class="header ml-10 mt-5">Страница объектов</div>

            
            
        <div class="flex justify-end">
            <Button icon="pi pi-plus" label="Добавить объект"
                class="border-[#060E28] bg-white text-[#060E28] font-medium hover:bg-[#060E28] mt-5 mr-5"
                @click="redirectToCreatePage" />
        </div></div>

        <div v-if="loading" class="flex justify-center items-center">
            <ProgressSpinner />
        </div>
        

        <div class="order-container">
            <ObjectCard v-for="object in objectsList" :object="object" :editObject="editObject"
                :openOrderCreationDialog="openOrderCreationDialog" :key="object.id" @updateObjects="getObjectsList"/>
        </div>
        
    </div>
</template>


<script>
import { getObjectsList } from '@/services';
import Button from 'primevue/button'
import ObjectCard from './components/ObjectCard.vue';
import ProgressSpinner from 'primevue/progressspinner';
import router from '../../router'
export default {
    name: 'ObjectsPage',
    data() {
        return {
            objectsList: [],
            loading: false,
        };
    },
    components: {
        Button,
        ObjectCard,
        ProgressSpinner,
    },
    methods: {
        getObjectsList() {
            getObjectsList().then(res => {
                this.objectsList = res;
                this.loading = false;
            });
        },
       
        editObject(objectId) {
            router.push(`objects/edit/${objectId}`)
        },
        openOrderCreationDialog() {
            router.push('orders/create')
        },

        redirectToCreatePage() {
            router.push('objects/create')
        }
    },
    mounted() {
        this.loading = true;
        this.getObjectsList();
        
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