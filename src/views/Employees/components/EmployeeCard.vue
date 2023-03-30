<template>
    <div class="card p-10 p-t-6 shadow-xl w-30% flex flex-col m-3 rounded-md b-t b-[#060E28]">

        <div class="flex justify-end">
            <div class="flex w-45% justify-between">
                
                <Button class="text-[#060E28] b-[#060E28] b-1  bg-white" icon="pi pi-pencil"
                    @click="() => editEmployee(employee.id)" />
                <Button class="text-red b-red b-1  bg-white" icon="pi pi-trash" @click="() => deleteEmployee(employee.id)" />
            </div>
        </div>


        <div class="flex justify-center card-header m-t-3 font-bold">
            <h2>{{ employee.first_name }} {{ employee.last_name }} {{ employee.surname }}</h2>
        </div>
        <div class="card-body m-t-5">
            <div class="card-body__item">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Номер телефона:</span> {{ employee.phone }}</p>
                </div>
            </div>
            <div class="card-body__item">
                <div class="card-body__item__title">
                    <p><span class="font-bold">E-mail:</span> {{ employee.email }}</p>
                </div>
            </div>
            <div class="card-body__item">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Дата рождения:</span> {{ employee.date_of_birth }}</p>
                </div>
            </div>
            <div class="card-body__item">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Город:</span> {{ employee.city }}</p>
                </div>
            </div>
            <div class="card-body__item">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Адрес:</span> {{ employee.address }}</p>
                </div>
            </div>
            <div class="card-body__item">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Дата найма:</span> {{ employee.date_of_employment }}</p>
                </div>
            </div>
            <div class="card-body__item">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Зарплата:</span> {{ employee.salary }} тг</p>
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
    props: ['employee', "deleteEmployee", "editEmployee"],
    components: {
        Button
    },

}

</script>
