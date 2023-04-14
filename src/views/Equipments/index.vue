<template>
    <div class="w-93% m-auto">

        <div class="m-b-5 flex items-center justify-between">
            <div class="header ml-10 mt-5">Оборудование</div>

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
            <DataTable :value="equipmentList" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50]"
                :responsive="true">
                <Column field="name" header="Наименование оборудования" />
                <Column field="cost" header="Стоимость оборудования, тг" />
                <Column field="amount" header="Количество оборудования, шт" />
                
                    <div v-if="loading" class="flex justify-center items-center">
            <ProgressSpinner /></div>
                   
              

                <Column class="w-1/7">
                    <template #body="rowData">
                        <div class="flex justify-end">

<!--                             
                            <Button  label="" class="text-[#060E28] border-[#060E28] mr-1 " icon="pi pi-plus-circle"
                            @click=" showDialog(rowData.data.id)" /> -->
                            <Button class="text-[green] border-[green] mr-1" icon="pi pi-pencil"
                                        @click="() => editEquipment(rowData.data.id)" />
                            <Button class="text-[red] border-[red] mr-1 " icon="pi pi-trash"
                                        @click="() => deleteEquipment(rowData.data.id)" />
                        </div>

                    

                    </template>  3330-
                </Column>
            </DataTable>

            <!-- <div>
            <Dialog  :header="'Прикреплени оборудования к объекту: '  " v-model:visible="displayDialog" 
            style="width: 400px !important; background-color: white;">

            <div class="content">
                       <div class="comment mt-5">
                 коммент

                </div>
                
            </div>

        </Dialog>
    </div> -->
        </div>


    </div>
</template>

<script>
import { getEquipmentsList, deleteEquipment, assignObject } from '@/services';
// getEquipmentsList,deleteEquipment, getInventory, getEquipment
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner';
import router from '../../router'
// import Dialog from 'primevue/dialog';

export default {
    name: 'EquipmentsPage',
    data() {
        return {
            equipmentList: [],
            loading: false,
            displayDialog: false,
        };
    },
    components: {
        DataTable,
        Column,
        Button,
        ProgressSpinner, 
        // Dialog
    },
    methods: {
        getEquipmentsList() {
            getEquipmentsList().then(res => {
                this.equipmentList = res;
                this.loading = false;
            });
        },

        deleteEquipment(equipmentId) {
            deleteEquipment(equipmentId).then(res => {
                console.log(res)
            })
            this.getEquipmentsList()
        },

        editEquipment(equipmentId) {
            router.push(`equipments/edit/${equipmentId}`)
        },

        redirectToCreatePage() {
        router.push('equipments/create')
        },
        
    redirectToEquipmentPage() {
        router.push('/equipments')
        },

        redirectInventoryPage() {
        router.push('/inventory')
        },

        assignObject(equipmentId){
            assignObject(equipmentId).then(res => {
                console.log(res)
            })
        },

        showDialog(equipmentId) {
    this.assignObject(equipmentId)
      this.displayDialog = true;
      
    },
    },
    mounted() {
        this.loading = true;
        this.getEquipmentsList();
    },
}
</script>