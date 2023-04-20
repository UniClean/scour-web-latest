<template>
    <div class="w-93% m-auto">
        <div class="m-b-5 flex items-center justify-between">
            <div class="header ml-10 mt-5">Заказчики</div>

        <div class="flex justify-end">
            <Button icon="pi pi-plus" label="Добавить заказчика"
                class="border-[#060E28] bg-white text-[#060E28] font-medium hover:bg-[#060E28] mt-5 mr-5"
                @click="redirectToCreatePage" />
        </div></div>
        

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
            <ProgressSpinner /></div>
                <Column class="w-1/7">
                    <template #body="rowData">
                        <div class="flex justify-end">
                            <Button class="border-[#060E28] bg-white text-[#060E28] font-medium mr-1"
                                icon="pi pi-file-edit" @click=" showDialog(rowData.data.id)"></Button>
                            <Button class="text-[green] border-[green] mr-1" icon="pi pi-pencil"
                                        @click="() => editCustomer(rowData.data.id)" />
                            <Button class="text-[red] border-[red] mr-1 " icon="pi pi-trash"
                                        @click="() => deleteCustomer(rowData.data.id)" />
                        </div>

                    

                    </template>
                </Column>
            </DataTable>
        </div>
        <div>
            <Dialog  :header="'Добавление документов' " v-model:visible="displayDialog" 
            style="width: 400px !important; background-color: white;">

            <div>
                <input type="file" ref="fileInput">
    </div>

                        
         
            <Button label="Добавить" class="bg-[#060E28] b-[#060E28] mt-5 mb-5 w-40" @click="() => uploadFile()">
</Button>
      
        </Dialog>
    </div>

    </div>
</template>

<script>
import { getCustomerList, deleteCustomer, uploadFile } from '@/services';
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
            displayDialog: false,
            file: null,
            customerList: [],
            loading: false,
            customer_id: 0,
        };
    },
    components: {
        DataTable,
        Column,
        Button,
        ProgressSpinner,
        Dialog
    },
    methods: {
        getCustomerList() {
            getCustomerList().then(res => {
                this.customerList = res;
                this.loading = false;
            });
        },

        
        deleteCustomer(customerId) {
            deleteCustomer(customerId)
            this.getCustomerList()
        },

        editCustomer(customerId) {
            router.push(`customers/edit/${customerId}`)
        },

        
    redirectToCreatePage() {
        router.push('customers/create')
        },

        showDialog(customerID) {
        this.customer_id = customerID
        this.displayDialog = true;
},

  uploadFile() {
      const formData = new FormData()
      formData.append('customer_id', this.customer_id);
      const file = this.$refs.fileInput.files[0];
      
      formData.append('file', file)
      console.log(file)
      uploadFile(formData).then(res => {
        if (res) {
          this.closeOnLoadEnded()
        }
        this.loading = false
      })
    },

    closeOnLoadEnded() {
            this.loading = false
            this.displayDialog = false
        },
    },
    mounted() {
        this.loading = true;
        this.getCustomerList();
    },
}   
</script>