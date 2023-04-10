<template>
    <div class="main">
     
      <h2 class="title">{{ title }}</h2>

          <div>
            <img src="../../assets/images/build_empty.png" class="w-40 "/>

            <div >
                <h5 >Выберите объект</h5>
                <Dropdown class="mt-1 custom-dropdown" v-model="body.object_id" :options="objectsList" optionLabel="name"
                    placeholder="Объекты" />

            </div>

         

            <div class="custom-dropdown mt-5">
                <h5 >Выберите тип заявки</h5>
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-building text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Тип заявки" v-model="body.type" />
                </div>
            </div>



            <div class="custom-dropdown mt-5 ">
                <h5 class="p-mt-3">Дополнительная информация</h5>
                <Textarea class="custom-dropdown h-20" v-model="body.additional_information" :autoResize="true" rows="5" cols="30" />
            </div>

            <div class="custom-dropdown mt-5">
    <h5 class="p-mt-3">Выберите время дедлайна для отчета</h5>
    <div class="p-inputgroup w-40%">
      <span class="p-inputgroup-addon">
        <i class="pi pi-flag text-[#060E28]"></i>
      </span>
      <Calendar
        placeholder="Дата дедлайна для отчета"
        v-model="body.report_deadline"
        showTime
        format="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
      />
    </div>
  </div>

            <Button :label="buttonLabel" class="bg-[#060E28] b-[#060E28] mt-5 w-40" @click="validateAndPrepare" />
        </div>
    </div>
</template>

<script>
import { getOrder, updateOrder, getObjectsList, createOrder } from '@/services'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';
export default {
    name: 'OrderCreate',
    components: {
        Button,
        Dropdown,
        Calendar,
        InputText,
        Textarea
    },
    data() {
        return {
            id: '',
            isEditing: false,
            loading: false,
            objectsList: [],
            
            body: {
                object_id: 0,
                type: '',
                additional_information: '',
                report_deadline: '',
            }
        }
    },
    created() {
        this.id = this.$route.params.id
        this.isEditing = Boolean(this.$route.params.id)
    },
    mounted() {
        // TODO: переделать через store
        getObjectsList().then(res => {
            this.objectsList = res
        })
       
        if (this.isEditing) {
            this.loading = true
            getOrder(this.id).then(res => {
                this.loading = false
                this.body = res
            })
        }
    },
    computed: {
        title() {
            return this.isEditing ? "Редактирование заявки" : "Создание новой заявки"
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
            data.object_id = data.object_id.id
            createOrder(data).then(res => {
                this.closeOnLoadEnded(res)
            })
        },
        edit(data) {
            this.loading = true
            // TODO: сделать это менее ужасно
            if (Number.isInteger(data.object_id.type)) {
                data.object_id = data.object_id.id
            }
            
            updateOrder(this.id, data).then(res => {
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

<style>

.main{
    width: 50%;
    text-align: left;
    margin-left: 10px;
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

.custom-dropdown {
  width: 450px; 
}
</style>