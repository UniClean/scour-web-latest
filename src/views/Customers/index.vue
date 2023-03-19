<template>
    <div class="w-93% m-auto p-10">

        <div class="flex justify-end">
            <Button icon="pi pi-plus" label="Создать заказчика"
                class="b-[#060E28] bg-white color-[#060E28] font-medium hover:bg-[#060E28]"
                @click="redirectToCreateCustomerPage" />
        </div>

        <div class="mt-4">
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
                <Column field="uid" header="">
                    <template>
                        <div class="flex justify-between w-90%">
                            <Button class="b-[#060E28] bg-white color-[#060E28] font-medium hover:bg-[#060E28]"
                                icon="pi pi-ellipsis-h" />
                            <Button class="b-[#060E28] bg-white color-[#060E28] font-medium hover:bg-[#060E28]"
                                icon="pi pi-pencil" />
                            <Button class="b-[#FF0000] bg-white color-[#FF0000] font-medium hover:bg-[#FF0000]"
                                icon="pi pi-trash" />
                        </div>

                    </template>
                </Column>
            </DataTable>
        </div>


    </div>
</template>

<script>
import { getCustomerList } from '@/services//customers';
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
            });
        },
    },
    mounted() {
        this.getCustomerList();
    },
}
</script>