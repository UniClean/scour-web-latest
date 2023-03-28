<template>
    <div>
        <h2 class="text-md">{{ title }}</h2>
        <div class="mt-4">

            <div class="customer_logo m-t-10 flex w-40% flex-col items-center">
                <div>
                    <!-- TODO: :src="body.object_image_url.length > 0 ? body.object_image_url : '../assets/images/build_empty.png'" -->
                    <img class="w-40" :src="body.object_image_url" alt="">
                </div>
            </div>

            <div class="object_photoLink">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-camera text-[#060E28]"></i>
                    </span>
                    <InputText id="choose_image" class="h-90%" placeholder="Ссылка на url photo объекта" type="file"
                        accept="image/*" @change="handleImageUpload" />
                </div>
            </div>

            <div class="object_name m-t-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-building text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Название объекта" v-model="body.name" />
                </div>
            </div>

            <div class="object_area m-t-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-stop text-[#060E28]"></i>
                    </span>
                    <InputNumber placeholder="Площадь объекта" v-model="body.area" mode="decimal" :minFractionDigits="1"
                        suffix=" кв. м" />
                </div>
            </div>

            <div class="object_address m-t-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-flag text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Адрес" v-model="body.address" />
                </div>
            </div>

            <div class="object_customer m-t-5 w-40% ">
                <h5 class="m-t-3">Выберите заказчика</h5>
                <Dropdown class="m-t-1 w-100%" v-model="body.customer_id" :options="customerList" optionLabel="name"
                    placeholder="Select a Customer" />

            </div>

            <div class="object_plan m-t-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-users text-[#060E28]"></i>
                    </span>
                    <InputText mode="decimal" placeholder="Необходимое количество тех персонала на объекте"
                        v-model="body.required_worker_amount" />
                </div>
            </div>

            <div class="object_customer m-t-5 w-40% ">
                <h5 class="m-t-3">Выберите ответственного супервайзера</h5>
                <Dropdown class="m-t-1 w-100%" v-model="body.supervisor_id" :options="supervisors" optionLabel="first_name"
                    placeholder="Select a Supervisor" />

            </div>

            <div class="customer_additional_information m-t-5 ">
                <h5 class="p-mt-3">Дополнительная информация об объекте</h5>
                <Textarea class="w-40% h-20" v-model="body.additional_information" :autoResize="true" rows="5" cols="30" />
            </div>

            <Button :label="buttonLabel" class="bg-[#060E28] b-[#060E28] m-t-5" @click="validateAndPrepare" />
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
            body: {
                customer_id: 0,
                name: '',
                address: '',
                area: 0,
                object_image_url: 'https://avatars.dzeninfra.ru/get-zen_doc/118604/pub_5b9fb43059419200ab7422f1_5bab1aee73b94800aa7f8802/scale_1200',
                additional_information: '',
                required_worker_amount: 0,
                supervisor_id: 0,
            }
        }
    },
    created() {
        this.id = this.$route.params.id
        this.isEditing = Boolean(this.$route.params.id)
    },
    mounted() {
        // TODO: переделать через store
        getCustomerList().then(res => {
            this.customerList = res
        })
        getAllEmployees().then(res => {
            this.supervisors = res
        })
        if (this.isEditing) {
            this.loading = true
            getObject(this.id).then(res => {
                this.loading = false
                this.body = res
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
            data.customer_id = data.customer_id.id
            data.supervisor_id = data.supervisor_id.id
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
            if (Number.isInteger(data.supervisor_id.type)) {
                data.supervisor_id = data.supervisor_id.id
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

