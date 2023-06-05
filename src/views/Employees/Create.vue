<template>
    <div class="main">
        <h2 class="title">{{ title }}</h2>
        <div class="mt-4">

            <div class="custom mt-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Имя сотрудника" v-model="body.first_name" />
                </div>
            </div>

            <div class="custom mt-3">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-ellipsis-h text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Фамилия сотрудника" v-model="body.last_name" />
                </div>
            </div>

            <div class="custom mt-3">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-ellipsis-h text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Отчество сотрудника" v-model="body.surname" />
                </div>
            </div>

            <div class="custom mt-3">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-phone text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Номер телефона сотрудника" v-model="body.phone" />
                </div>
            </div>

            <div class="custom mt-3">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-envelope text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="E-mail сотрудника" v-model="body.email" />
                </div>
            </div>


            <div class="custom mt-3">
    <h5 class="p-mt-3">Укажите день рождения сотрудника</h5>
    <div class="p-inputgroup w-40%">
      <span class="p-inputgroup-addon">
        <i class="pi pi-calendar-times text-[#060E28]"></i>
      </span>
      <Calendar
        placeholder="День рождения сотрудника"
        v-model="body.date_of_birth"
        format="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
      />
    </div>
    </div>



            <div class="custom mt-3">
    <h5 class="p-mt-3">Укажите дату найма сотрудника</h5>
    <div class="p-inputgroup w-40%">
      <span class="p-inputgroup-addon">
        <i class="pi pi-calendar text-[#060E28]"></i>
      </span>
      <Calendar
        placeholder="Дата найма сотрудника"
        v-model="body.date_of_employment"
        format="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" />
    </div>

            <div class="custom mt-3">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-home text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Адрес сотрудника" v-model="body.address" />
                </div>
            </div>

            <div class="custom mt-3">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-ellipsis-h text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Город" v-model="body.city" />
                </div>
            </div>

            <div class="custom mt-3 ">
                <h5 class="m-t-3">Укажите должность сотрудника</h5>
                <Dropdown class="custom w-100%" v-model="body.position_id" :options="positionList" optionLabel="name"
                optionValue="id"  placeholder="Должность" />
                    

            </div>

            

            <div class="custom mt-3">
                <h5 class="m-t-3">Укажите зарплату сотрудника</h5>
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-dollar text-[#060E28]"></i>
                    </span>
                    <InputNumber mode="decimal" placeholder="Зарплата сотрудника"
                        v-model="body.salary"/>

                    <Dropdown v-model="body.rate" :options="rates" optionLabel="label" optionValue="value" placeholder="ставка" class="ml-2"/>
                


           
                </div>
            </div>

            <Button :label="buttonLabel" class="bg-[#060E28] b-[#060E28] mt-5 mb-5 w-40" @click="showConfirmDialog" />
        </div>
    </div>

    <Dialog  :header="'Подтверждение'" v-model:visible="confirmDialog" style="width: 400px !important;">
            <div class="dialog-content">
            <h1>Сохранить изменения?</h1>
            <div class="mt-3">
                        <Button label="Да" class="bg-[green] border-[green] w-20 mr-3" @click="validateAndPrepare"></Button>
                        <Button label="Нет" class=" bg-[grey] border-[grey] w-20" @click="closeConfirmDialog"></Button>
                    </div>
                </div>
         </Dialog>

</div>
    
</template>

<script>
import { getEmployee, updateEmployee, createEmployee, getAllPositions } from '@/services'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Dialog from 'primevue/dialog';

export default {
    name: 'EmployeeCreate',
    components: {
        Button,
        InputNumber,
        InputText,
        Dropdown,
        Calendar,
        Dialog
    },
    data() {
        return {
            confirmDialog: false,
            id: '',
            isEditing: false,
            loading: false,
            employeeList: [],
            positionList: [],
            selectedRate: null,
            rates: [
                { value: 'HOUR', label: 'тг в час' },
                { value: 'MONTH', label: 'тг в месяц' }
                    ],
            body: {
                first_name: '',
                last_name: '',
                surname: '',
                phone: '',
                email: '',
                date_of_birth: '',
                date_of_employment: '',
                salary: null,
                address: '',
                city: '',
                position_id: null,
                rate:''
            },

            
        }
    },


  
    created() {
        this.id = this.$route.params.id
        this.isEditing = Boolean(this.$route.params.id)
    },
    mounted() {

        getAllPositions().then(res => {
            this.positionList = res
        })
        if (this.isEditing) {
            this.loading = true


            getEmployee(this.id).then(res => {
                this.loading = false
                this.body.first_name = res.first_name,

                this.body.last_name = res.last_name,
                this.body.surname = res.surname,
                this.body.phone = res.phone,
                this.body.email = res.email,
                this.body.date_of_birth = res.date_of_birth,
                this.body.date_of_employment = res.date_of_employment,
                this.body.salary = res.salary,
                this.body.address = res.address,
                this.body.city = res.city,
                this.body.position_id = res.position_id,
                this.body.rate = res.rate
                
            })
        }
    },
    computed: {
        
        title() {
            return this.isEditing ? "Редактирование страницы сотрудника" : "Добавление нового сотрудника"
        },
        buttonLabel() {
            return this.isEditing ? "Редактировать" : "Создать"
        },
  
        
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
            createEmployee(data).then(res => {
                this.closeOnLoadEnded(res)
            })

    
        },
        edit(data) {
            this.loading = true
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

        showConfirmDialog(){
            this.confirmDialog = true;
        }, 

       closeConfirmDialog(){
        this.confirmDialog = false
       },
        
    },
}
</script>


<style>

.main{
    width: 50%;
    text-align: left;
    margin-left: 20px;
    color: black;
}

.title {
    text-align: left; 
    margin-left: 10px;
    font-size: 24px;
    color: black;
    font-weight: bold;
    margin-top: 15px;
}

.custom {
  width: 450px; 
}

</style>