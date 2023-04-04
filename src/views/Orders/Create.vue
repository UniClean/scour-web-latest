<template>
    <div>
        <h2 class="text-md">{{ title }}</h2>
        <div class="mt-4">

            <div class="object_customer m-t-5 w-40% ">
                <h5 class="m-t-3">Выберите объект</h5>
                <Dropdown class="m-t-1 w-100%" v-model="body.object_id" :options="objectsList" optionLabel="name"
                    placeholder="Выберите объект" />

            </div>

         

            <div class="object_name m-t-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-building text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Тип заявки" v-model="body.type" />
                </div>
            </div>



            <div class="customer_additional_information m-t-5 ">
                <h5 class="p-mt-3">Дополнительная информация</h5>
                <Textarea class="w-40% h-20" v-model="body.additional_information" :autoResize="true" rows="5" cols="30" />
            </div>

            <div class="object_address m-t-5">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-flag text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Дата дедлайна для отчета" v-model="body.report_deadline" />
                </div>
            </div>

            <Button :label="buttonLabel" class="bg-[#060E28] b-[#060E28] m-t-5" @click="validateAndPrepare" />
        </div>
    </div>
</template>

<script>
import { getOrder, updateOrder, getObjectsList, createOrder } from '@/services'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown';
// import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
export default {
    name: 'OrderCreate',
    components: {
        Button,
        Dropdown,
        
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
            return this.isEditing ? "Редактирование заявки" : "Создание заявки"
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