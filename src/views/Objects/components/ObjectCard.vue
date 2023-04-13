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
                @click=" showDialog(object.id)" />

                <Button class="text-[green] border-[green] mr-1" icon="pi pi-pencil"
                    @click="() => editObject(object.id)" />
                    
                <Button class="text-[red] border-[red] " icon="pi pi-trash" @click="() => deleteObject(object.id)" />
            </div>
        </div>

        <div>
            <Dialog  :header="'Создание заявки на объект: '+  object.name " v-model:visible="displayDialog" 
            style="width: 500px !important; background-color: white;">

            <div class="content">

                <div>

            <div class="custom mt-3">
                <h5 >Выбранный объект</h5>
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-home text-[#060E28]"></i>
                    </span>
                    <InputText v-model="body.object_id" :value="object.name" />
                </div>
            </div>
         

            <div class="custom mt-5">
                <h5 >Выберите тип заявки</h5>
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-ellipsis-h text-[#060E28]"></i>
                    </span>
                    <Dropdown v-model="selectedOption" :options="options" optionLabel="label" placeholder="Тип заявки" />
                </div>
            </div>



            <div class="custom mt-5 ">
                <h5 class="p-mt-3">Дополнительная информация</h5>
                <Textarea class="custom" v-model="body.additional_information" :autoResize="true" rows="5" cols="30" />
            </div>

            <div class="custom mt-5">
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

            <Button :label="buttonLabel" class="bg-[#060E28] b-[#060E28] mt-5 mb-5 w-40" @click="validateAndPrepare" />
        </div>
                
            </div>

        </Dialog>
    </div>

        
        </div>
    </div>
</template>

<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button'
import { createOrder, getOrder } from '@/services'
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
export default {
    props: ['object', "deleteObject", "editObject", "openOrderCreationDialog"],
    components: {
        Button,
        Dialog,
        Calendar,
        Textarea,
        Dropdown,
        InputText
    },

        data() {
        return {
            isDownloading: false,
            displayDialog: false,
            id: '',
            isEditing: false,
            loading: false,
            selectedOption: null,
            options: [
                { value: 'DAILY', label: 'Ежедневная' },
                { value: 'WEEKLY', label: 'Еженедельная' },
                { value: 'MONTHLY', label: 'Ежемесячная' },
                { value: 'OTHER', label: 'Другое' }
                    ],
            body: {
                object_id: this.object.id,
                type: '',
                additional_information: '',
                report_deadline: '',
            }
        }
    },

    watch: {
    selectedOption(value) {
      if (value) {
        this.body.type = value.value;
      }
    }}
  ,

  created() {
        this.id = this.$route.params.id
        this.isEditing = Boolean(this.$route.params.id)
    },
        

mounted() {
        this.isDownloading = true;
      
        if (this.isEditing) {
            this.loading = true
            getOrder(this.id).then(res => {
                this.loading = false
                this.body = res
            })
        }
    },

    computed: {
        buttonLabel() {
            return this.isEditing ? "Редактировать" : "Создать"
        }
    },

    methods: {
        showDialog() {
      this.displayDialog = true;
      
    },

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
            // data.object_id = data.object_id.id
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
         
        },
        closeOnLoadEnded() {
            this.loading = false
            this.$router.back()
        },
        
    }
}
</script>

<style>
.images {
  max-width: 400px; 
  height: auto;
}
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