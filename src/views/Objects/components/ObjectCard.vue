<template>
    <div class="card p-10 p-t-6 shadow-xl w-30% flex flex-col m-3 rounded-md b-t b-[#060E28]">

        <div class="flex justify-end">
            <div class="flex w-45% justify-between">
                <Button class="text-green b-green b-1  bg-white" icon="pi pi-plus-circle"
                    @click="openOrderCreationDialog" />
                <Button class="text-[#060E28] b-[#060E28] b-1  bg-white" icon="pi pi-pencil"
                    @click="() => editObject(object.id)" />
                <Button class="text-red b-red b-1  bg-white" icon="pi pi-trash" @click="() => deleteObject(object.id)" />
            </div>
        </div>

        <div class="flex flex-col items-center m-t-5 h-64">
            <img class="object-fit object-center h-full w-full" :src="object.object_image_url" alt="">
        </div>
        <div class="flex justify-center card-header m-t-3">
            <h3>{{ object.name }}</h3>
        </div>
        <div class="card-body m-t-5">
            <div class="card-body__item">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Заказчик:</span> object.customer.name</p>
                </div>
            </div>
            <div class="card-body__item">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Адрес:</span> {{ object.address }}</p>
                </div>
            </div>
            <div class="card-body__item">
                <div class="card-body__item__title">
                    <p><span class="font-bold">План:</span> {{ object.required_worker_amount }} тех-персонала</p>
                </div>
                <div class="card-body__item__content">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from 'primevue/button'
export default {
    props: ['object', "deleteObject", "editObject", "openOrderCreationDialog"],
    components: {
        Button
    },
}
</script>