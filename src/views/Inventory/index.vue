<template>
    <div class="w-93% m-auto">

        <div class="m-b-5 flex items-center justify-between">
            <div class="header ml-10 mt-5">Инвентарь</div>

        <div class="flex justify-end">
            <Button 
                class="border-[#060E28] bg-white text-[#060E28] font-medium mt-5 mr-5 " icon="pi pi-plus-circle"
                @click="redirectToCreatePage" />
            <Button label="Инвентарь"
                class="border-[#060E28] bg-white text-[#060E28] font-medium mt-5 mr-5"
                @click="redirectInventoryPage" />
                <Button label="Оборудование"
                class="border-[#060E28] bg-white text-[#060E28] font-medium  mt-5 mr-5"
                @click="redirectToEquipmentPage" />
        </div></div>
       
        

        <div class="mt-4 ml-10 mr-10">
            <DataTable :value="inventorytList" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50]"
                :responsive="true">
                <Column field="name" header="Наименование инвентаря" />
                <Column field="cost" header="Стоимость инвентаря, тг" />
                
                    <div v-if="loading" class="flex justify-center items-center">
            <ProgressSpinner /></div>
                   
              

                <Column class="w-1/7">
                    <template #body="rowData">
                        <div class="flex justify-end">

                            
                            <Button class="text-[green] border-[green] mr-1" icon="pi pi-pencil"
                                        @click="() => editInventory(rowData.data.id)" />
                            <Button class="text-[red] border-[red] mr-1 " icon="pi pi-trash"
                                        @click="() => deleteInventory(rowData.data.id)" />
                        </div>

                    

                    </template>
                </Column>
            </DataTable>
        </div>


    </div>
</template>

<script>
import { getInventoryList, deleteInventory } from '@/services';
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner';
import router from '../../router'
export default {
    name: 'InventoryPage',
    data() {
        return {
            inventorytList: [],
            loading: false,
        };
    },
    components: {
        DataTable,
        Column,
        Button,
        ProgressSpinner
    },
    methods: {
        getInventoryList() {
            getInventoryList().then(res => {
                this.inventorytList = res;
                this.loading = false;
            });
        },

        deleteInventory(inventoryId) {
            deleteInventory(inventoryId).then(res => {
                console.log(res)
            })
            this.getInventoryList()
        },

        editInventory(inventoryId) {
            router.push(`inventory/edit/${inventoryId}`)
        },

        redirectToCreatePage() {
        router.push('inventory/create')
        },
        
    redirectToEquipmentPage() {
        router.push('/equipments')
        },

        redirectInventoryPage() {
        router.push('/inventory')
        }
    },
    mounted() {
        this.loading = true;
        this.getInventoryList();
    },
}
</script>