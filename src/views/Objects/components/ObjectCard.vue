<template>
    <div class="card p-10 p-t-6 shadow-xl w-30% flex flex-col m-3 rounded-md b-t b-[#060E28]">
        
        
        <div class="flex justify-center card-header font-bold" style="font-size: 20px; color: #060E28;">
            <h2>{{ object.name }}</h2>
        </div>

        <div class="images">
            <img class="object-fit object-center h-full w-full" :src="object.object_image_url" alt="">
        </div>


        <div class="card-body mt-3">
            <div class="card-body__item">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Заказчик:</span> {{object.customer.name}}</p>
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

            <div class="card-body__item mt-3">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Ответственный супервайзер:</span>{{ object.assigned_supervisor.lastt_name }} {{ object.assigned_supervisor.first_name }} тех-персонала</p>
                </div>
                <div class="card-body__item__content">
                </div>
            </div>

            <div class="flex justify-end mt-4">
            <div class="flex justify-between ">
                <Button class="text-[#060E28] border-[#060E28] bg-white mr-1" icon="pi pi-plus-circle"
                    @click="openOrderCreationDialog" />
                <Button class="text-[green] border-[green] mr-1" icon="pi pi-pencil"
                    @click="() => editObject(object.id)" />
                <Button class="text-[red] border-[red] " icon="pi pi-trash" @click="() => deleteObject(object.id)" />
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

<style>
.images {
  max-width: 400px; 
  height: auto;
}

</style>