<template>
    <div class="flex flex-col items-center justify-start w-full ">
        <img src="../assets/images/scour_logo.png" alt="logo" class="w-30 p-b-15" />
        <router-link :active-class="linkActive" :class="link" to="/"><i class="pi pi-home p-r-5"></i> Главная</router-link>
        <router-link :active-class="linkActive" :class="link" to="/orders"><i class="pi pi-id-card p-r-5"></i> Заявки
        </router-link>
        <router-link :active-class="linkActive" :class="link" to="/customers"> <i class="pi pi-shopping-bag p-r-5"></i>
            Заказчики
        </router-link>
        <router-link :active-class="linkActive" :class="link" to="/employees"><i class="pi pi-user p-r-5"></i> Сотрудники
        </router-link>
        <router-link :active-class="linkActive" :class="link" to="/objects"><i class="pi pi-building p-r-5"></i> Объекты
        </router-link>

        <router-link :active-class="linkActive" :class="link" to="/reports"><i class="pi pi-chart-line p-r-5"></i> Отчеты
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'CustomSidebar',
    data() {
        return {
            link: 'decoration-none block w-full text-white px-6 py-4 rounded-md text-sm font-medium',
            linkActive: 'bg-white text-black',
        };
    },
};

</script>
<style>
.sidebar {
    background-color: #060E28;
}
</style>