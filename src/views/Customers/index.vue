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
                            <!-- <Button class="border-[#060E28] bg-white text-[#060E28] font-medium mr-1"
                                icon="pi pi-ellipsis-h" @click="showDetail(rowData.data.id)"></Button> -->
                            <Button class="text-[green] border-[green] mr-1" icon="pi pi-pencil"
                                        @click="() => editCustomer(rowData.data.id)" />
                            <Button class="text-[red] border-[red] mr-1 " icon="pi pi-trash"
                                        @click="() => deleteCustomer(rowData.data.id)" />
                        </div>

                    

                    </template>
                </Column>
            </DataTable>
        </div>


    </div>
</template>

<script>
import { getCustomerList, deleteCustomer } from '@/services';
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner';
import router from '../../router'
export default {
    name: 'CustomerPage',
    data() {
        return {
            customerList: [],
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
        getCustomerList() {
            getCustomerList().then(res => {
                this.customerList = res;
                this.loading = false;
            });
        },

        
        deleteCustomer(customerId) {
            deleteCustomer(customerId).then(res => {
                console.log(res)
            })
            this.getCustomerList()
        },

        editCustomer(customerId) {
            router.push(`customers/edit/${customerId}`)
        },

        
    redirectToCreatePage() {
        router.push('customers/create')
        }
    },
    mounted() {
        this.loading = true;
        this.getCustomerList();
    },
}   
</script>