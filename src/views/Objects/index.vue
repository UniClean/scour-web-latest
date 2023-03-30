<template>
    <div class="w-93% m-auto">

        <div class="flex justify-end">
            <Button icon="pi pi-plus" label="Создать объект"
                class="b-[#060E28] bg-white color-[#060E28] font-medium hover:bg-[#060E28]" @click="redirectToCreatePage" />
        </div>
        <div v-if="isDownloading" class="flex justify-center items-center">
            <ProgressSpinner />
        </div>
        <div class="flex flex-wrap">
            <ObjectCard v-for="object in objectsList" :object="object" :deleteObject="deleteObject" :editObject="editObject"
                :openOrderCreationDialog="openOrderCreationDialog" :key="object.id" />
        </div>
    </div>
</template>


<script>
import { getObjectsList, deleteObject } from '@/services';
import Button from 'primevue/button'
import ObjectCard from './components/ObjectCard.vue';
import ProgressSpinner from 'primevue/progressspinner';
import router from '../../router'
export default {
    name: 'ObjectsPage',
    data() {
        return {
            objectsList: [],
            isDownloading: false,
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
                this.isDownloading = false;
            });
        },
        deleteObject(objectId) {
            deleteObject(objectId).then(res => {
                console.log(res)
            })
            this.getObjectsList()
        },
        editObject(objectId) {
            router.push(`objects/edit/${objectId}`)
        },
        openOrderCreationDialog() {
            console.log("open dialog")
        },
        redirectToCreatePage() {
            router.push('objects/create')
        }
    },
    mounted() {
        this.isDownloading = true;
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
</style>