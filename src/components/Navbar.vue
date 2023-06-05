<template>
  <div class="navbar w-100% h-10% border-b border-[#B0B6B0] flex justify-end">
    <Button class="text-[black] mt-2 mb-2 mr-10 logout" icon="pi pi-sign-out" @click="showConfirmDialog"/>  
  </div>

  <Dialog  :header="'Подтверждение выхода'" v-model:visible="confirmDialog" style="width: 400px !important;">
            <div class="dialog-content">
            <h1>Выйти из учетной записи?</h1>
            <div class="mt-3">
                        <Button label="Да" class="bg-[green] border-[green] w-20 mr-3" @click="logout"></Button>
                        <Button label="Нет" class=" bg-[grey] border-[grey] w-20" @click="closeConfirmDialog"></Button>
                    </div>
                </div>
         </Dialog>

</template>
  
<script>
import Button from 'primevue/button'
import Dialog from 'primevue/dialog';

export default {
  name: 'CustomNavbar',
  components: {
        Button,  
        Dialog
    },
    data() {
        return {
            confirmDialog: false,
        }
    },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },

    showConfirmDialog(){
            this.confirmDialog = true;
        }, 

       closeConfirmDialog(){
        this.confirmDialog = false
       },
  }
};
</script>
  
<style>
.logout {
  border: none !important;
  font-size: 24px;
}

.logout .pi {
  font-size: 24px;
}
  
</style>

