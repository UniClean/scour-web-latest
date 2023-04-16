<template>
    <div class="card p-10 p-t-6 shadow-xl w-30% flex flex-col m-3 rounded-md b-t b-[#060E28]">
        <div class="info flex justify-end">
        <Button class="text-[black] icon-info" icon="pi pi-info-circle"
        @click=" showInfoDialog(object.id)" /></div>
        
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
                    <p><span class="font-bold">Ответственный супервайзер:</span>{{ object.assigned_supervisor.lastt_name }} {{ object.assigned_supervisor.first_name }} </p>
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
  <div v-if="!loading"> 
            <Button :label="buttonLabel" class="bg-[#060E28] b-[#060E28] mt-5 mb-5 w-40" @click="validateAndPrepare" />
        </div></div>
                
            </div>
            <div v-if="loading">
                <ProgressSpinner />
            </div>
        </Dialog>
    </div>      
        </div>

        <div>
            <Dialog  :header="'Дополнительная информация по объекту: ' + object.name " v-model:visible="displayInfoDialog" 
            style="width: 400px !important; background-color: white;">


            <div>
                <h5 >Площадь объекта</h5>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-ellipsis-h text-[#060E28]"></i>
                    </span>
                    <InputNumber mode="decimal"  :value="object.area+ ' кв.м'"
                        suffix=" кв. м" readonly/>


                </div>
            </div>

           
            <div class="mt-3">
                <h5 class="p-mt-3">Дополнительная информация об объекте</h5>
                <Textarea v-model="body.additional_information" :value="object.additional_information"
               readonly  style="width: 350px !important;"/>
            </div>

<div class="mt-3">
            <DataTable :value="assignedEquipment">
                <Column field="name" header="Оборудование на объекте" class="column-custom " />
                <div v-if="loading" class="flex justify-center items-center">
            <ProgressSpinner /></div>
                </DataTable></div>


        </Dialog>
    </div>
    </div>
</template>

<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button'
import { createOrder, getOrder, getAssignedEquipment } from '@/services'
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ProgressSpinner from 'primevue/progressspinner';

export default {
    props: ['object', "deleteObject", "editObject", "openOrderCreationDialog"],
    components: {
        Button,
        Dialog,
        Calendar,
        Textarea,
        Dropdown,
        InputText,
        InputNumber,
        DataTable,
        Column,
        ProgressSpinner
    },

        data() {
        return {
            loading: false,
            displayDialog: false,
            displayInfoDialog: false,
            id: '',
            isEditing: false,
            selectedOption: null,
            assignedEquipment: [],
            options: [
                { value: 'DAILY', label: 'Ежедневная' },
                { value: 'WEEKLY', label: 'Еженедельная' },
                { value: 'MONTHLY', label: 'Ежемесячная' },
                { value: 'OTHER', label: 'Другое' }
                    ],
            body: {
                object_id: this.object.id,
                type: '',
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
    this.loading = true;
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

        getAssignedEquipment(objectID){
            getAssignedEquipment(objectID).then(res => {
                this.assignedEquipment = res;
                console.log(this.assignedEquipment);
                this.loading = false;
            });
        },
        
        showDialog() {
      this.displayDialog = true;  
    },

    showInfoDialog(objectID) {
    this.getAssignedEquipment(objectID);
    console.log(this.assignedEquipment);
      this.displayInfoDialog = true;  
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
            // this.$router.back()
            this.$router.push('/orders');
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

.icon-info {
  border: none !important;

}

.icon-info .pi {
  font-size: 24px;
}

.column-custom{
    display: flex;
  justify-content: center;
  align-items: center;
}

</style>