 <template>
    <div class="flex items-start h-screen">
      <div class="flex items-start h-screen">
        <div class="flex flex-col items-center justify-start h-screen sidebar">
          <div class="sidebar-header p-[1rem] flex-col">
            <img src="../assets/images/scour_short_logo.png" alt="logo" class="w-10 pb-10" />
            <Button class="bg-[#060E28] border-[#060E28]" icon="pi pi-bars" @click="visibleLeft = true" />
          </div>
          <div class="sidebar-content p-[1rem] ">
            <!-- <router-link :class="[link, { 'link-active': $route.path === '/' }]" to="/"><i class="pi pi-home"></i></router-link> -->
<router-link :class="[link, { 'link-active': $route.path === '/orders' }]" to="/orders"><i class="pi pi-id-card"></i></router-link>
<router-link :class="[link, { 'link-active': $route.path === '/customers' }]" to="/customers"><i class="pi pi-shopping-bag"></i></router-link>
<router-link :class="[link, { 'link-active': $route.path === '/employees' }]" to="/employees"><i class="pi pi-user"></i></router-link>
<router-link :class="[link, { 'link-active': $route.path === '/objects' }]" to="/objects"><i class="pi pi-building"></i></router-link>
<router-link :class="[link, { 'link-active': $route.path === '/equipments' }]" to="/equipments"><i class="pi pi-inbox"></i></router-link>
<router-link :class="[link, { 'link-active': $route.path === '/allsalaries' }]" to="/allsalaries"><i class="pi pi-calculator"></i></router-link>
          </div>
        </div>
        <Sidebar :modal="false" v-model:visible="visibleLeft" class="p-sidebar-sm bg-[#060E28] ">
          <CustomSidebar />
        </Sidebar>
      </div>
  
      <div class="w-screen">
        <CustomNavbar />
  
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import CustomSidebar from '../components/Sidebar.vue';
  import CustomNavbar from '../components/Navbar.vue';
  import Sidebar from 'primevue/sidebar';
  import Button from 'primevue/button';
  export default {
    name: "MainPage",
    components: { CustomNavbar, CustomSidebar, Sidebar, Button },
    data() {
      return {
        visibleLeft: false,
        link: 'decoration-none block w-full text-white px-6 py-4 rounded-md text-sm font-medium',
        linkActive: 'bg-white text-black',
      };
    },
  }
  </script>
  
  <style scoped>
.sidebar {
  background-color: #060E28;
}

.link-active {
  background-color: #ffffff;
  color: #000000;
}
</style>