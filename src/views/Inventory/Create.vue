<template>
    <div class="main">
        <h2 class="title">{{ title }}</h2>
        <div class="mt-4">



            <div class="custom mt-3">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-inbox text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Название инвентаря" v-model="body.name" />
                </div>
            </div>

            <div class="custom mt-3">
                <div class="p-inputgroup w-40%">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-dollar text-[#060E28]"></i>
                    </span>
                    <InputNumber mode="decimal" placeholder="Стоимость инвентаря"
                        v-model="body.cost"/>                </div>
            </div>

           

            


            <Button :label="buttonLabel" class="bg-[#060E28] b-[#060E28] mt-5 mb-5 w-40" @click="validateAndPrepare" />
        </div>
    </div>
</template>

<script>
import { getInventory, updateInventory, createInventory } from '@/services'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';

export default {
    name: 'InventoryCreate',
    components: {
        Button,
        InputText,
        InputNumber
        
    },
    data() {
        return {
            id: '',
            isEditing: false,
            loading: false,
            
            body: {
                name: '',
                cost: null,                
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
            getInventory(this.id).then(res => {
                this.loading = false
                this.body = res
            })
        }
    },
    computed: {
        title() {
            return this.isEditing ? "Редактирование " : "Добавление нового инвентаря"
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
            createInventory(data).then(res => {
                this.closeOnLoadEnded(res)
            })
        },
        edit(data) {
            this.loading = true
            updateInventory(this.id, data).then(res => {
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