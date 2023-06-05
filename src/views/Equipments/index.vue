<template>
    <div class="w-93% m-auto ">

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
                
                    <div v-if="loading" class="flex justify-center items-center">
            <ProgressSpinner /></div>
                   
              

                <Column class="w-1/7">
                    <template #body="rowData">
                        <div class="flex justify-end">

                            
                           
                            <Button  label="" class="text-[#060E28] border-[#060E28] mr-1 " icon="pi pi-plus-circle"
                            @click=" showDialog(rowData.data)" />
                            <Button class="text-[green] border-[green] mr-1" icon="pi pi-pencil"
                                        @click="() => editEquipment(rowData.data.id)" />
                            <Button class="text-[red] border-[red] mr-1 " icon="pi pi-trash"
                                        @click="() => showDeleteDialog(rowData.data.id)" />
                        </div>

                    

                    </template>  
                </Column>
            </DataTable>

            <div>
            <Dialog  :header="'Прикрепление оборудования к объекту ' " v-model:visible="displayDialog" 
            style="width: 400px !important; background-color: white;">


            <div>
                <h5 >Выбранное оборудование</h5>
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-inbox text-[#060E28]"></i>
                    </span>
                    <InputText v-model="equipmentName" :value="equipmentName" readonly />
                </div>
            </div>

           
                       <div class="comment mt-5">
                        <div class=" mt-3">
                <h5>Выберите объект для прикрепления</h5>
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-building text-[#060E28]"></i>
                    </span>
                    <Dropdown v-model="assignedObject" :options="objectsList" optionLabel="name" optionValue="id"
                        placeholder="Объекты" />
                
            </div>
            <Button label="Прикрепить" class="bg-[#060E28] b-[#060E28] mt-5 mb-5 w-40" @click="() => assignObject(equipmentID, assignedObject)">
</Button>

                </div>
                
            </div>

        </Dialog>
    </div>
        </div>
        <Dialog  :header="'Подтверждение удаления'" v-model:visible="deleteDialog" style="width: 400px !important;">
            <div class="dialog-content" v-if="!loading">
            <h1>Удалить оборудование?</h1>
            <div class="mt-3" >
                        <Button label="Да" class="bg-[green] border-[green] w-20 mr-3" @click="deleteEquipment(this.chosenEquipmentID)"></Button>
                        <Button label="Нет" class=" bg-[grey] border-[grey] w-20" @click="closeDeleteDialog"></Button>
                    </div>
                </div>

                <div v-if="loading" class="flex justify-center items-center">
            <ProgressSpinner />
        </div>

         </Dialog>

    </div>
</template>

<script>
import { getEquipmentsList, deleteEquipment, assignObject, getObjectsList } from '@/services';
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner';
import router from '../../router'
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';


export default {
    name: 'EquipmentsPage',
    data() {
        return {
            chosenEquipmentID: 0,
            deleteDialog: false,
            equipmentList: [],
            objectsList: [],
            assignedObject: null,
            loading: false,
            displayDialog: false,
            equipmentID: null,
            equipmentName: '',

        };
    },
    components: {
        DataTable,
        Column,
        Button,
        ProgressSpinner, 
        Dialog,
        Dropdown,
        InputText
    },
    methods: {

        handleButtonClick() {
      console.log(this.assignedObject);
    },

    async getEquipmentsList() {
        await getEquipmentsList().then(res => {
                this.equipmentList = res;
                this.loading = false;
            });
        },

        async deleteEquipment(equipmentId) {
            this.loading = true;
            await deleteEquipment(equipmentId)
            this.getEquipmentsList()
            this.deleteDialog = false 
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


        assignObject(equipmentId, objectId) {
            const object = { objectId: objectId }; 
            assignObject(equipmentId, object).then(res => {
                console.log(res);
            });

            this.displayDialog = false; 


},

showDialog(equipmentID) {
  this.displayDialog = true;
  this.equipmentID = equipmentID.id;
  this.equipmentName = equipmentID.name;
},

showDeleteDialog(EquipmentID){
            this.deleteDialog = true;
            this.chosenEquipmentID = EquipmentID
   
        }, 

       closeDeleteDialog(){
        this.confirmDialog = false
       },


    },
    mounted() {
        this.loading = true;
        this.getEquipmentsList();

        getObjectsList().then(res => {
            this.objectsList = res
        })
    },
    
}
</script>

