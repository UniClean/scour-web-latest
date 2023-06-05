<template>
    <div class="main">

        <h2 class="title">{{ title }}</h2>

        <div>
            <img src="../../assets/images/build_empty.png" class="w-40 " />

            <div class="custom mt-5">
                <h5>Выберите объект</h5>
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-building text-[#060E28]"></i>
                    </span>
                    <Dropdown v-model="body.object_id" :options="objectsList" optionLabel="name" optionValue="id"
                        placeholder="Объекты" />
                </div>
            </div>



            <div class="custom mt-5">
                <h5>Выберите тип заявки</h5>
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-ellipsis-h text-[#060E28]"></i>
                    </span>
                    <Dropdown v-model="body.type" :options="options" optionLabel="label" optionValue="value"
                        placeholder="Тип заявки" />
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
                    <Calendar placeholder="Дата дедлайна для отчета" v-model="body.report_deadline" showTime
                        format="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" />
                </div>
            </div>
            <div v-if="!loading">
                <Button :label="buttonLabel" class="bg-[#060E28] b-[#060E28] mt-5 mb-5 w-40" @click="showDialog" />
            </div>

            <div v-if="loading">
                <ProgressSpinner />
            </div>
        </div>

        <Dialog  :header="'Подтверждение'" v-model:visible="displayDialog" style="width: 400px !important;">
            <div class="dialog-content">
            <h1>Сохранить изменения?</h1>
            <div class="mt-3">
                        <Button label="Да" class="bg-[green] border-[green] w-20 mr-3" @click="validateAndPrepare"></Button>
                        <Button label="Нет" class=" bg-[grey] border-[grey] w-20" @click="closeDialog"></Button>
                    </div>
                </div>
         </Dialog>


    </div>

</template>

<script>
import { getOrder, updateOrder, getObjectsList, createOrder } from '@/services'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';

export default {
    name: 'OrderCreate',
    components: {
        Button,
        Dropdown,
        Calendar,
        Textarea,
        Dialog
    },
    data() {
        return {
            toast: false,
            displayDialog: false,
            id: '',
            isEditing: false,
            loading: false,
            objectsList: [],
            options: [
                { value: 'DAILY', label: 'Ежедневная' },
                { value: 'WEEKLY', label: 'Еженедельная' },
                { value: 'MONTHLY', label: 'Ежемесячная' },
                { value: 'OTHER', label: 'Другое' }
            ],
            body: {
                object_id: this.$route.params.object_id || 0,
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
        getObjectsList().then(res => {
            this.objectsList = res
        })

        if (this.isEditing) {
            this.loading = true
            getOrder(this.id).then(res => {
                this.loading = false
                this.body.object_id = res.object.id || 0,
                    this.body.type = res.type,
                    this.body.additional_information = res.additional_information,
                    this.body.report_deadline = res.report_deadline
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
            createOrder(data).then(res => {
                this.closeOnLoadEnded(res)
            })
        },
        edit(data) {
            this.loading = true
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

        showDialog() {
      this.displayDialog = true;  
    },

    closeDialog() {
      this.displayDialog = false;  
    },

    },

    
}
</script>

<style>
.main {
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

.dialog-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 20px;
}


</style>