<template>
    <div class="card flex-1 max-w-sm mx-2 my-2 bg-white rounded-lg shadow-md p-5">
        <div class="card-body">
            <div class="flex justify-between mb-3">
                <div :class="circleClass"></div>
                <div :class="circleClass"></div>
            </div>

            <div class="card-body__item m-t-10">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Объект:</span> {{ order.object.name }}</p>
                </div>
            </div>
            <div class="card-body__item">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Адрес:</span> {{ order.object.address }}</p>
                </div>
            </div>
            <div class="card-body__item">
                <div class="card-body__item__title">
                    <p><span class="font-bold">План:</span> {{ order.object.required_worker_amount }} тех-персонала</p>
                </div>
                <div class="card-body__item__content">
                </div>
            </div>
            <div class="card-body__item">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Дополнительная информация:</span> {{ order.additional_information }} </p>
                </div>
                <div class="card-body__item__content">
                </div>
            </div>
            <div class="card-body__item">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Дедлайн отчета:</span> {{ formatDate(order.report_deadline) }}</p>
                </div>
                <div class="card-body__item__content">
                </div>
            </div>

            <div class="card-body__item mt-4">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Ответственный супервайзер:</span> {{
                        order.object.assigned_supervisor.last_name }}
                        {{ order.object.assigned_supervisor.first_name }} </p>
                </div>
                <div class="card-body__item__content">
                </div>
            </div>

            <div v-if="order.status == 'PLANNED' || order.status === 'IN_PROGRESS'" class="flex justify-end">
                <Button class="text-[green] border-[green] mr-1" icon="pi pi-pencil" @click="() => editOrder(order.id)" />
                <Button class="text-[red] border-[red] mr-1 " icon="pi pi-trash" @click="() => deleteOrder(order.id)" />
            </div>

            <div v-if="order.status == 'COMPLETED' || order.status === 'CONFIRMED'" class="report mt-5">

                <div class="flex justify-end">

                    <Button label="Отчет" class="mt-2 mr-3 border-1 border-black text-black"
                        @click=" showDialog(order.id)" />

                    <div v-if="order.status == 'COMPLETED'"> <Button label="Подтвердить"
                            class="mt-2 border-1 border-black text-black " @click="confirmOrder(order.id)" /></div>
                </div>

                <div>
                    <Dialog :header="'Отчет по уборке объекта: ' + order.object.name" v-model:visible="displayDialog"
                        style="width: 400px !important; background-color: white;">

                        <div class="content">

                            <DataTable :value="assignedEmployees">
                                <Column field="employee.first_name" header="Клинер" />
                                <Column field="worked_hours_amount" header="Отработано часов" class="column-custom" />
                                <div v-if="loading" class="flex justify-center items-center">
                                    <ProgressSpinner />
                                </div>
                            </DataTable>

                            <div class="comment mt-5">
                                <div class="article-header">
                                    <div class="frame">
                                        <p class="header-text">Комментарий:</p>

                                        <p>{{ order.supervisor_comments }}</p>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </Dialog>
                </div>


            </div>




        </div>
    </div>
</template>


<script>
import { getAssignedEmployees } from '@/services';
import Button from 'primevue/button'
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ProgressSpinner from 'primevue/progressspinner';

export default {
    data() {
        return {
            loading: false,
            displayDialog: false,
            assignedEmployees: null,
        };
    },
    components: {
        Button,
        Dialog,
        DataTable,
        Column,
        ProgressSpinner
    },
    methods: {
        formatDate(dateTime) {
            const date = new Date(dateTime);
            return date.toLocaleString();
        },

        getAssignedEmployees(orderID) {
            getAssignedEmployees(orderID).then(res => {
                this.assignedEmployees = res;
                this.loading = false;
            });
        },

        showDialog(orderID) {
            this.getAssignedEmployees(orderID)
            this.displayDialog = true;

        },

    }
    ,
    props: ['order', 'deleteOrder', 'editOrder', 'confirmOrder'],
    computed: {
        circleClass() {
            const status = this.order.status;
            if (status === 'PLANNED') {
                return 'w-3 h-3 bg-blue-500 rounded-full border-2 border-black';
            } else if (status === 'IN_PROGRESS') {
                return 'w-3 h-3 bg-yellow-500 rounded-full border-2 border-black';
            } else if (status === 'COMPLETED') {
                return 'w-3 h-3 bg-purple-500 rounded-full border-2 border-black';
            } else if (status === 'OVERDUE') {
                return 'w-3 h-3 bg-red-500 rounded-full border-2 border-black';
            } else if (status === 'CONFIRMED') {
                return 'w-3 h-3 bg-green-500 rounded-full border-2 border-black';
            } else {
                return '';
            }
        }
    },
    mounted() {
        this.loading = true;
    },
}
</script>

<style>
.card-body {
    text-align: left;
}

.article-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;
    border: 1px solid #060E28;
}

.column-custom {
    display: flex;
    justify-content: center;
    align-items: center;
}


.header-text {
    font-weight: bold;
    text-align: center;
}
</style>