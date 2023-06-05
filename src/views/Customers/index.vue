<template>
    <div class="w-93% m-auto">
        <div class="m-b-5 flex items-center justify-between">
            <div class="header ml-10 mt-5">Заказчики</div>

            <div class="flex justify-end">
                <Button icon="pi pi-plus" label="Добавить заказчика"
                    class="border-[#060E28] bg-white text-[#060E28] font-medium hover:bg-[#060E28] mt-5 mr-5"
                    @click="redirectToCreatePage" />
            </div>
        </div>


        <div class="mt-4 ml-10 mr-10">
            <DataTable :value="customerList" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50]"
                :responsive="true">
                <Column field="name" header="Название заказчика" />
                <Column field="website" header="Вебсайт заказчика" />
                <Column field="email" header="Email заказчика" />
                <Column field="is_vip" header="VIP">

                    <template #body="slotProps">
                        <i v-if="slotProps.data.is_vip === true" class="pi pi-check"></i>
                    </template>
                </Column>
                <div v-if="loading" class="flex justify-center items-center">
                    <ProgressSpinner />
                </div>
                <Column class="w-1/7">
                    <template #body="rowData">
                        <div class="flex justify-end">
                            <Button class="border-[#060E28] bg-white text-[#060E28] font-medium mr-1" icon="pi pi-file-edit"
                                @click="showFileDialog(rowData.data.id)"></Button>
                            <Button class="text-[green] border-[green] mr-1" icon="pi pi-pencil"
                                @click="() => editCustomer(rowData.data.id)" />
                            <Button class="text-[red] border-[red] mr-1 " icon="pi pi-trash"
                                @click="() => showDeleteDialog(rowData.data.id)" />
                        </div>



                    </template>
                </Column>
            </DataTable>
        </div>
        <div>
            <Dialog :header="'Добавление документов'" v-model:visible="displayDialog"
                style="width: 600px !important">

                <div v-if="loadingFiles" class="flex justify-center items-center">
            <ProgressSpinner />
        </div>
        <div>{{ emptyFiles }}</div>

                <div class="mb-3" v-for="(file, index) in loadedFiles" :key="index">
                    <embed v-if="!loadingFiles && loadedFiles.length > 0" :src="file" type="application/pdf" width="550px"
                        height="600px">
                </div>

                <div class="mt-3">
                    <input type="file" accept="application/pdf" ref="fileInput">
                </div>

                <Button label="Добавить" class="bg-[#060E28] b-[#060E28] mt-1 mb-5 w-40" @click="() => uploadFile()">
                </Button>

            </Dialog>
        </div>

        <Dialog  :header="'Подтверждение удаления'" v-model:visible="deleteDialog" style="width: 400px !important;">
            <div class="dialog-content" v-if="!loading">
            <h1>Удалить заказчика?</h1>
            <div class="mt-3" >
                        <Button label="Да" class="bg-[green] border-[green] w-20 mr-3" @click="deleteCustomer(this.chosenCustomerID)"></Button>
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
import { getCustomerList, deleteCustomer, uploadFile, getAllFiles, displayFile } from '@/services';
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner';
import Dialog from 'primevue/dialog';

import router from '../../router'
export default {
    name: 'CustomerPage',
    data() {
        return {
            loadingFiles: false,
            counter: 0,
            displayDialog: false,
            file: null,
            customerList: [],
            loading: false,
            customer_id: 0,
            customerFiles: null,
            previewFile: null,
            previewUrl: null,
            loadedFiles: [],       
            deleteDialog: false,
            chosenCustomerID: null,
            emptyFiles: ''
        };
    },
    components: {
        DataTable,
        Column,
        Button,
        ProgressSpinner,
        Dialog,
    },
    methods: {
        getCustomerList() {
            getCustomerList().then(res => {
                this.customerList = res;
                this.loading = false;
            });
        },

        async deleteCustomer(customerId) {
            this.loading = true;
            await deleteCustomer(customerId)
            this.getCustomerList();
            this.deleteDialog = false 
        },

        editCustomer(customerId) {
            router.push(`customers/edit/${customerId}`)
        },

        redirectToCreatePage() {
            router.push('customers/create')
        },

        showFileDialog(customerID) {  
            this.loadingFiles = true
            this.emptyFiles = ''   
            this.counter = 0
            this.loadedFiles = []
            this.customer_id = customerID     
            this.displayDialog = true;
            this.getAllFiles(this.customer_id).then(() => {
                this.customerFiles.forEach(element => {
                    this.getDocumentFile(element.id)
                })
        
            });
            
        },

        uploadFile() {
            this.loadingFiles = true
            const formData = new FormData()
            formData.append('customer_id', this.customer_id);
            const file = this.$refs.fileInput.files[0];
            formData.append('file', file)
            uploadFile(formData).then(res => {
                if (res) {
                    this.closeOnLoadEnded()
                }
            this.loadingFiles = false
            })
        },

        async getAllFiles(customer_id) {
            await getAllFiles(customer_id).then(res => {
                this.customerFiles = res;
                this.loading = false;
                if (this.customerFiles.length === 0)
                 {this.loadingFiles = false;
                    this.emptyFiles = 'Документы отсутствуют'
                }
            });

        },

        async getDocumentFile(id) {
            await displayFile(id).then(res => {
                if (res) {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                        this.previewUrl = fileReader.result;
                        this.loadedFiles.push(this.previewUrl)
                    };
                    this.counter ++;
                    if (this.counter === this.customerFiles.length) {
                    this.loadingFiles = false;}               
                    this.previewFile = new File([res], "document", { type: res.type })
                    fileReader.readAsDataURL(this.previewFile);
                }
                else {this.loadingFiles = false}
            })
        },
        closeOnLoadEnded() {
            this.loading = false
            this.displayDialog = false
        },

        showDeleteDialog(CustomerID){
            this.deleteDialog = true;
            this.chosenCustomerID = CustomerID
   
        }, 

       closeDeleteDialog(){
        this.confirmDialog = false
       },

    },
    mounted() {
        this.loading = true;
        this.getCustomerList();
    },
}   
</script>