<template>
    <div class="main">
        <h2 class="title">{{ title }}</h2>
        <div class="mt-4">



            <div class="custom mt-3">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Имя заказчика" v-model="body.name" />
                </div>
            </div>

            <div class="custom mt-3">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-phone text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Номер телефона заказчика" v-model="body.phone_number" />
                </div>
            </div>


            <div class="custom mt-3">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-envelope text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="E-mail заказчика" v-model="body.email" />
                </div>
            </div>

            <div class="custom mt-3">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-link text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Website заказчика" v-model="body.website" />
                </div>
            </div>


            <div class="custom mt-3">
                <h5>Дополнительная информация о заказчике</h5>
                <Textarea class="custom" v-model="body.additional_information" :autoResize="true" rows="5" cols="30" />
            </div>

            <div class="is_vip_check_box w-60% ">
                <Checkbox v-model="body.is_vip" :binary="true" :class="checkboxClass" class="mb-1"/>
                <i class="pi pi-star pl-3 text-xl mt-5 text-[#FCD12A]"></i>
                <label class="ml-2 text-xl">VIP</label>
            </div>

            <!-- <FileUpload name="demo[]" url="./upload.php" @upload="onAdvancedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000">
        <p>Переместите файл для загрузки в это поле</p>
</FileUpload> -->


<template>
    <div class="card flex justify-content-center">
        <Toast />
        <FileUpload mode="basic" name="demo[]" url="./upload.php" accept="image/*" :maxFileSize="1000000" @upload="onUpload" />
    </div>
</template>


<template>
    <div class="card">
        <Toast />
        <FileUpload name="demo[]" url="./upload.php" @upload="onAdvancedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000">
            <template #empty>
                <p>Drag and drop files to here to upload.</p>
            </template>
        </FileUpload>
    </div>
</template>

<!-- <script setup>
import { useToast } from "primevue/usetoast";
const toast = useToast();

const onAdvancedUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};
</script> -->
           

            <Button :label="buttonLabel" class="bg-[#060E28] b-[#060E28] mt-5 mb-5 w-40" @click="validateAndPrepare" />
        </div>
    </div>
</template>

<script>
import { getCustomer, updateCustomer, createCustomer } from '@/services'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Checkbox from 'primevue/checkbox';
import FileUpload from 'primevue/fileupload';


export default {
    name: 'CustomerCreate',
    components: {
        Button,
        InputText,
        Textarea,
        Checkbox,
        FileUpload
    },
    data() {
        return {
            id: '',
            isEditing: false,
            loading: false,
            
            body: {
                name: '',
                is_vip: false,
                additional_information: '',
                email: null,
                website: null,
                phone_number: '',
                image_url: '',
                
            }
        }
    },
    created() {
        this.id = this.$route.params.id
        this.isEditing = Boolean(this.$route.params.id)
    },
    mounted() {

        if (this.isEditing) {
            this.loading = true
            getCustomer(this.id).then(res => {
                this.loading = false
                this.body = res
            })
        }
    },
    computed: {
        title() {
            return this.isEditing ? "Редактирование страницы заказчика" : "Добавление нового заказчика"
        },
        buttonLabel() {
            return this.isEditing ? "Редактировать" : "Создать"
        },
        checkboxClass() {
        return this.body.is_vip ? 'color-yellow' : ''; // Add this line
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
            createCustomer(data).then(res => {
                this.closeOnLoadEnded(res)
            })
        },
        edit(data) {
            this.loading = true
            updateCustomer(this.id, data).then(res => {
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

.color-yellow {
    color: yellow;
}

.p-fileupload-file-remove{
    background-color: black;
}
</style>