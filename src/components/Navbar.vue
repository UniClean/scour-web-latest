<template>
  <div class="navbar w-100% h-10% border-b border-[#B0B6B0] flex justify-end">
    <div @click="logout" class="w-90% flex justify-end mt-3 mb-3">
      <i class="pi pi-sign-out text-2xl ml-auto mr-10 text-black"></i>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'CustomNavbar',
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
};
</script>
  

  


