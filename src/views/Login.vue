<template>
<div class='login'>
    <div class="logo">
<img src="../assets/images/scour_logo.png" alt="logo" class="" />
</div>

<div class="custom-login">
                <div class="p-inputgroup mt-10">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Введите логин"  class="mt-5"/>
                </div>

                <div class="p-inputgroup mt-5">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-lock text-[#060E28]"></i>
                    </span>
                    <InputText placeholder="Введите пароль"  />
                </div>
            </div>

            <div class="remember mt-5">
                <Checkbox  :class="checkboxClass" v-model="remember" class="mb-1"/>    
                <label class="ml-2 text-[white]">Запомнить меня</label>
            </div>
            
            <Button label="Войти" class="bg-[#eaedf0] border-[#060E28] text-[#060E28] mt-5 mb-0 w-40"  />
            
</div>


</template>

<script>
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button'

export default {
    name: 'LoginPage',

    components: {
        Checkbox, 
        InputText,
        Button
    },

    data() {
        return {
            remember: false
        }
    },
    
}
</script>

<style>
.login{
    background-color: #060E28;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 400px;
  width: 400px;
  display: flex;
  flex-direction: column;
 justify-content: center;
  align-items: center;
  border-radius: 30px;
}

.logo {
position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.custom-login {
  width: 300px !important;

  
}

.remember {

 

  margin-right: 148px;
}

</style>