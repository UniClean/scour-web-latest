<template>
    <div class="w-93% m-auto">

        <div class="flex justify-end">
            <Button icon="pi pi-plus" label="Добавить заказчика"
                class="border-[#060E28] bg-white text-[#060E28] font-medium hover:bg-[#060E28] mt-5 mr-5"
                @click="redirectToCreatePage" />
        </div>

        <div class="mt-4 ml-10 mr-10">
            <DataTable :value="customerList" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50]"
                :responsive="true">
                <Column field="name" header="Название заказчика" />
                <Column field="website_customer" header="Вебсайт заказчика" />
                <Column field="email_customer" header="Email заказчика" />
                <Column field="is_vip" header="VIP">
                    <template #body="slotProps">
                        <i v-if="slotProps.data.is_vip === true" class="pi pi-check"></i>
                    </template>
                </Column>
                <Column class="w-1/7">
                    <template #body="rowData">
                        <div class="flex justify-between">
                            <Button class="border-[#060E28] bg-white text-[#060E28] font-medium"
                                icon="pi pi-ellipsis-h" @click="showDetail(rowData)"></Button>
                            <Button class="border-[#228B22] bg-white text-[#228B22] hover:bg-[#228B22] font-medium"
                                icon="pi pi-pencil" @click="editData(rowData)"></Button>
                            <Button class="border-[#FF0000] bg-white text-[#FF0000] font-medium  "
                                icon="pi pi-trash" @click="deleteData(rowData)"></Button>
                        </div>

                    </template>
                </Column>
            </DataTable>
        </div>


    </div>
</template>

<script>
import { getCustomerList } from '@/services';
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
export default {
    name: 'CustomerPage',
    data() {
        return {
            customerList: [],
        };
    },
    components: {
        DataTable,
        Column,
        Button,
    },
    methods: {
        getCustomerList() {
            getCustomerList().then(res => {
                this.customerList = res;
                console.log(this.customerList, "kdmiiks")
            });
        },
    },
    mounted() {
        this.getCustomerList();
    },
}
</script>