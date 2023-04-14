<template>
    <div class="flex flex-col items-center justify-start w-full ">
        <img src="../assets/images/scour_logo.png" alt="logo" class="w-29 p-b-5 mb-10" />
        <router-link :class="[link, { 'linkActive': $route.path === '/' }]" to="/"><i class="pi pi-home p-r-5" ></i> Главная</router-link>
        <router-link :class="[link, { 'linkActive': $route.path === '/orders' }]" to="/orders"><i class="pi pi-id-card p-r-5"></i> Заявки</router-link>
        <router-link :class="[link, { 'linkActive': $route.path === '/customers' }]" to="/customers"><i class="pi pi-shopping-bag p-r-5"></i> Заказчики</router-link>
        <router-link :class="[link, { 'linkActive': $route.path === '/employees' }]" to="/employees"><i class="pi pi-user p-r-5"></i> Сотрудники</router-link>
        <router-link :class="[link, { 'linkActive': $route.path === '/objects' }]" to="/objects"><i class="pi pi-building p-r-5"></i>Объекты</router-link>
        <router-link :class="[link, { 'linkActive': $route.path === '/equipments' }]" to='/equipments'><i class="pi pi-inbox p-r-5"></i> Инвентарь и оборудование</router-link>

    </div>
</template>

<script>
export default {
    name: 'CustomSidebar',
    data() {
        return {
            link: 'decoration-none block w-full text-white px-6 py-4 rounded-md text-sm font-medium',
        };
    },
};
</script>

<style scoped>
.sidebar {
    background-color: #060E28;
}

.linkActive {
    background-color: #ffffff;
    color: #000000;
}

.pi{
    font-size:larger;
}
</style>


