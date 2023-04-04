<template>
    <div class="card flex-1 max-w-sm mx-2 my-2 bg-white rounded-lg shadow-md p-5">
        <div class="card-body">
            <!-- <div class="flex justify-between">
                <div v-if="status == 'Создана'" class="w-3 h-3 bg-blue-500 rounded-full b-2"></div>
                <div v-if="status == 'Создана'" class="w-3 h-3 bg-blue-500 rounded-full b-2 b-black"></div>
                <div v-if="status == 'На выполнении'" class="w-3 h-3 bg-yellow-500 rounded-full b-2"></div>
                <div v-if="status == 'На выполнении'" class="w-3 h-3 bg-yellow-500 rounded-full b-2 b-black"></div>
                <div v-if="status == 'Ждет подтверждения'" class="w-3 h-3 bg-purple-500 rounded-full b-2"></div>
                <div v-if="status == 'Ждет подтверждения'" class="w-3 h-3 bg-purple-500 rounded-full b-2 b-black"></div>
                <div v-if="status == 'Просрочена'" class="w-3 h-3 bg-red-500 rounded-full b-2"></div>
                <div v-if="status == 'Просрочена'" class="w-3 h-3 bg-red-500 rounded-full b-2 b-black"></div>
                <div v-if="status == 'Завершена'" class="w-3 h-3 bg-green-500 rounded-full b-2"></div>
                <div v-if="status == 'Завершена'" class="w-3 h-3 bg-green-500 rounded-full b-2 b-black"></div>
            </div> -->

            <div class="card-body__item m-t-2">
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
                    <p><span class="font-bold">Дедлайн отчета:</span> {{ order.report_deadline }}</p>
                </div>
                <div class="card-body__item__content">
                </div>
            </div>

            <div class="card-body__item">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Статус:</span> {{ order.status }} </p>
                </div>
                <div class="card-body__item__content">
                </div>
            </div>
            <!-- <div v-if="status == 'Ждет подтверждения'" class="flex justify-end">
                <Button label="Подтвердить" class="bg-[#FFFFFF] b-[#060E28] color-[#060E28] m-t-5"
                    @click="() => confirmationFunction(uid)" />
            </div> -->
        </div>
</div>
</template>

<script>
// import Button from 'primevue/button'
export default {
    props: ['order', "deleteOrder", "editOrder"],
    components: {
        // Button
    },
}
</script>