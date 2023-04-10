<template>
    <div class="card flex-1 max-w-sm mx-2 my-2 bg-white rounded-lg shadow-md p-5">
        <div class="card-body">
            <div class="flex justify-between mb-3" >
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
                    <p><span class="font-bold">Статус:</span> {{ 
                    order.status === 'PLANNED' ? 'Создана' : 
                    (order.status === 'IN_PROGRESS' ? 'На выполнении' : 
                    (order.status === 'COMPLETED' ? 'Ждет подтверждения' : 
                    (order.status === 'CONFIRMED' ? 'Завершена' : 
                    (order.status === 'OVERDUE' ? 'Просрочена' : order.status))))}} </p>
                </div>
                <div class="card-body__item__content">
                </div>
            </div>
            <div v-if="order.status == 'COMPLETED'" class="flex justify-end">
    <Button label="Подтвердить" class="mt-5 border-1 border-black text-black hover:bg-green-500"
    @click="deleteData(rowData)" />
</div>

        </div>
</div>
</template>


<script>
import Button from 'primevue/button'
export default {
    components: {
        Button,
    },
    methods: {
        formatDate(dateTime) {
            const date = new Date(dateTime);
            return date.toLocaleString(); // You can customize the format as needed
        }
    },
    props: ['order', 'deleteOrder', 'editOrder'],
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
    }
}
</script>

<style>


.card-body {
    text-align: left; 
}

</style>