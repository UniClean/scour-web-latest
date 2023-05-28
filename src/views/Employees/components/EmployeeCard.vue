<template>
    <div class="card p-10 p-t-6 shadow-xl w-30% flex flex-col m-3 rounded-md b-t b-[#060E28]">
       

        <div class="icon-main">
                        <i class="pi pi-user icon-user text-4xl text-[#060E28]"></i>
                </div> 

                <div class="flex justify-center card-header m-t-3 font-bold" style="font-size: 20px; color: #060E28;">
            <h2> {{ employee.last_name }} {{ employee.first_name }} {{ employee.surname }}</h2>
        </div>

<div class="inform mt-4">
        
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
                    <p><span class="font-bold">Дата рождения:</span> {{ formatDate(employee.date_of_birth) }}</p>
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
                    <p><span class="font-bold">Дата найма:</span> {{ formatDate(employee.date_of_employment) }}</p>
                </div>
            </div>

            <div class="mt-5">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Должность:</span> {{ employee.position.name }}</p>
                </div>
            </div>
       

            <div class="card-body__item">
    <div class="card-body__item__title">
        <p v-if="employee.rate === 'HOUR'"><span class="font-bold">Зарплата:</span> {{ employee.salary }} тг/час</p>
        <p v-if="employee.rate === 'MONTH'"><span class="font-bold">Зарплата:</span> {{ employee.salary }} тг/месяц</p>
    </div>
    <div class="card-body__item__content">
    </div>
</div>


            <div class="flex justify-end mt-4">            
                <Button class="text-[green] border-[green] mr-1" icon="pi pi-pencil"
                    @click="() => editEmployee(employee.id)" />
                <Button class="text-[red] border-[red] mr-1 " icon="pi pi-trash"
                    @click="() => deleteEmployee(employee.id)" />
        </div>
        </div>
    </div> </div>
</template>

<script>

import Button from 'primevue/button'
export default {
    props: ['employee', "deleteEmployee", "editEmployee"],
    components: {
        Button
    },
    methods: {
        formatDate(dateTime) {
            const date = new Date(dateTime);
            return date.toLocaleDateString();
        }
    },

}

</script>

