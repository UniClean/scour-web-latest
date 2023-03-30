<template>
    <div>
        <h2 class="text-md">{{ title }}</h2>
        <div class="mt-4">

            <div class="object_name m-t-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-building text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Имя сотрудника" v-model="body.first_name" />
                </div>
            </div>

            <div class="object_area m-t-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-stop text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Фамилия сотрудника" v-model="body.last_name" />
                </div>
            </div>

            <div class="object_address m-t-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-flag text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Отчество сотрудника" v-model="body.surname" />
                </div>
            </div>

            <div class="object_address m-t-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-flag text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Номер телефона сотрудника" v-model="body.phone" />
                </div>
            </div>

            <div class="object_address m-t-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-flag text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="E-mail сотрудника" v-model="body.email" />
                </div>
            </div>

            <div class="object_address m-t-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-flag text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Дата рождения сотрудника" v-model="body.date_of_birth" />
                </div>
            </div>

            <div class="object_address m-t-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-flag text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Дата найма сотрудника" v-model="body.date_of_employment" />
                </div>
            </div>

            <div class="object_address m-t-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-flag text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Адрес сотрудника" v-model="body.address" />
                </div>
            </div>

            <div class="object_address m-t-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-flag text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Город" v-model="body.city" />
                </div>
            </div>

            <div class="object_customer m-t-5 w-40% ">
                <h5 class="m-t-3">Выберите должность сотрудника</h5>
                <Dropdown class="m-t-1 w-100%" v-model="body.position_id" :options="positionList" optionLabel="name"
                    placeholder="Должность" />

            </div>

            

            <div class="object_plan m-t-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-users text-[#060E28]"></i>
                    </span>
                    <InputNumber mode="decimal" placeholder="Зарплата сотрудника"
                        v-model="body.salary" />
                </div>
            </div>


        


            <Button :label="buttonLabel" class="bg-[#060E28] b-[#060E28] m-t-5" @click="validateAndPrepare" />
        </div>
    </div>
</template>

<script>
import { getEmployee, updateEmployee, createEmployee, getAllPositions } from '@/services'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

export default {
    name: 'EmployeeCreate',
    components: {
        Button,
        InputNumber,
        InputText,
        Dropdown,

    },
    data() {
        return {
            id: '',
            isEditing: false,
            loading: false,
            employeeList: [],
            positionList: [],
            body: {
                first_name: '',
                last_name: '',
                surname: '',
                phone: '',
                email: '',
                date_of_birth: '',
                date_of_employment: '',
                salary: 0,
                address: '',
                city: '',
                position_id: 0,
            
            }
        }
    },
    created() {
        this.id = this.$route.params.id
        this.isEditing = Boolean(this.$route.params.id)
    },
    mounted() {
        // TODO: переделать через store

        getAllPositions().then(res => {
            this.positionList = res
        })
        if (this.isEditing) {
            this.loading = true
            getEmployee(this.id).then(res => {
                this.loading = false
                this.body = res
            })
        }
    },
    computed: {
        title() {
            return this.isEditing ? "Редактирование страницы сотрудника" : "Создание страницы сотрудника"
        },
        buttonLabel() {
            return this.isEditing ? "Редактировать" : "Создать"
        }
    },
    methods: {
        validateAndPrepare() {
            const data = { ...this.body }
            if (this.isEditing) {
                this.edit(data)
            } else {
                this.create(data)
            }
        },
        create(data) {
            this.loading = true
            // TODO: сделать это менее ужасно
            data.position_id = data.position_id.id
            createEmployee(data).then(res => {
                this.closeOnLoadEnded(res)
            })
        },
        edit(data) {
            this.loading = true
            // TODO: сделать это менее ужасно
            if (Number.isInteger(data.position_id.type)) {
                data.position_id = data.position_id.id
            }
            updateEmployee(this.id, data).then(res => {
                this.closeOnLoadEnded(res)
            })
        },
        closeOnLoadEnded() {
            this.loading = false
            this.$router.back()
        },
    },
}
</script>

