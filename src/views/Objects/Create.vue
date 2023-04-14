<template>
    <div class="main">
        <h2 class="title">{{ title }}</h2>
        <div class="mt-4">

            <!-- <div class="customer_logo m-t-10 flex w-40% flex-col items-center"> -->
                <!-- <div> -->
                    <!-- TODO: :src="body.object_image_url.length > 0 ? body.object_image_url : '../assets/images/build_empty.png'" -->
                    <!-- <img class="w-40" :src="body.object_image_url" alt="">
                </div>
            </div> -->
            <div v-if="loading">
                <ProgressSpinner />
            </div>
            
            <div class="custom mt-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-camera text-[#060E28]"></i>
                    </span>
                    <InputText id="choose_image" class="h-90%" placeholder="Ссылка на url photo объекта" type="file"
                        accept="image/*" @change="handleImageUpload" />
                </div>
            </div>

            <div class="custom mt-3">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-building text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Название объекта" v-model="body.name" />
                </div>
            </div>

            <div class="custom mt-3">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-ellipsis-h text-[#060E28]"></i>
                    </span>
                    <InputNumber placeholder="Площадь объекта" v-model="body.area" mode="decimal" :minFractionDigits="1"
                        suffix=" кв. м" />
                </div>
            </div>

            <div class="custom mt-3">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-map-marker text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Адрес" v-model="body.address" />
                </div>
            </div>

            <div class="custom mt-3">
                <h5>Выберите заказчика</h5>
                <Dropdown class="custom" v-model="body.customer_id" :options="customerList" optionLabel="name"
                optionValue="id" placeholder="Заказчик" />

            </div>

            <div class="custom mt-3">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-users text-[#060E28]"></i>
                    </span>
                    <InputText mode="decimal" placeholder="Необходимое количество тех персонала на объекте"
                        v-model="body.required_worker_amount" />
                </div>
            </div>

            <div class="custom mt-3 ">
                <h5 class="m-t-3">Выберите ответственного супервайзера</h5>
                <Dropdown class="custom" v-model="body.assigned_supervisor_id" :options="supervisors" optionLabel="first_name"
                optionValue="id" placeholder="Супервайзер" />

            </div>

            <div class="custom mt-3">
                <h5 class="p-mt-3">Дополнительная информация об объекте</h5>
                <Textarea class="custom" v-model="body.additional_information" :autoResize="true" rows="5" cols="30" />
            </div>
           
            <Button :label="buttonLabel" class="bg-[#060E28] b-[#060E28] mt-5 mb-5 w-40" @click="validateAndPrepare" />
        </div>
        
    </div>
</template>

<script>
import { getObject, updateObject, getCustomerList, getAllEmployees, createObject } from '@/services'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
export default {
    name: 'ObjectCreate',
    components: {
        Button,
        Dropdown,
        InputNumber,
        InputText,
        Textarea
    },
    data() {
        return {
            id: '',
            isEditing: false,
            loading: false,
            customerList: [],
            supervisors: [],
            allEmployees: [],
            body: {
                customer_id: 0,
                name: '',
                address: '',
                area: 0,
                object_image_url: 'https://avatars.dzeninfra.ru/get-zen_doc/118604/pub_5b9fb43059419200ab7422f1_5bab1aee73b94800aa7f8802/scale_1200',
                additional_information: '',
                required_worker_amount: 0,
                assigned_supervisor_id: 0,
            }
        }
    },
    created() {
        this.id = this.$route.params.id
        this.isEditing = Boolean(this.$route.params.id)
    },
    mounted() {
        this.getAllEmployees()
        // TODO: переделать через store
        getCustomerList().then(res => {
            this.customerList = res
        })
        
        if (this.isEditing) {
            this.loading = true
            getObject(this.id).then(res => {
                this.loading = false
                this.body.customer_id = res.customer.id
                this.body.name = res.name
                this.body.address = res.address
                this.body.area = res.area
                this.body.additional_information = res.additional_information
                this.body.required_worker_amount = res.required_worker_amount
                this.body.assigned_supervisor_id = res.assigned_supervisor.id
            })
        }
    },
    computed: {
        title() {
            return this.isEditing ? "Редактирование объекта" : "Создание объекта"
        },
        buttonLabel() {
            return this.isEditing ? "Редактировать" : "Создать"
        }
    },
    methods: {

        getAllEmployees() {
            getAllEmployees().then(res => {
                this.allEmployees = res;
                this.supervisors = this.filterEmployeesByPosition('supervisor');
                this.isDownloading = false;
            });
        },

        filterEmployeesByPosition(position) {
            return this.allEmployees.filter(employee => employee.position.name === position);
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
            createObject(data).then(res => {
                this.closeOnLoadEnded(res)
            })
        },
        edit(data) {

            this.loading = true
            // TODO: сделать это менее ужасно
            if (Number.isInteger(data.customer_id.type)) {
                data.customer_id = data.customer_id.id
            }
            if (Number.isInteger(data.assigned_supervisor_id.type)) {
                data.assigned_supervisor_id = data.assigned_supervisor_id.id
            }
            updateObject(this.id, data).then(res => {
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