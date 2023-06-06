<template>
    <div class="card flex-1 max-w-sm mx-2 my-2 bg-white rounded-lg shadow-md p-5">
        <div class="card-body">

            <!-- <div class="flex justify-between mb-3">
                <div :class="circleClass"></div>
            </div> -->

            <div class="card-body__item m-t-10">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Заявка для объекта:</span> {{ inventoryOrder.object.name }}</p>
                </div>
            </div>

            <div class="card-body__item">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Адрес объекта:</span> {{ inventoryOrder.object.address }}</p>
                </div>
            </div>

            <div class="card-body__item">
                <div class="card-body__item__title">
                    <p><span class="font-bold">Дедлайн выполнения:</span> {{ formatDate(inventoryOrder.deadline) }}</p>
                </div>
            </div>

        </div>
  

    </div>
</template>


<script>


export default {
    data() {
        return {
        };
    },
    components: {
      
    },

    methods: {
        formatDate(dateTime) {
            const date = new Date(dateTime);
            return date.toLocaleString();
        },

    }
    ,
    props: ['inventoryOrder'],
    // computed: {

    //     circleClass() {
    //         const status = this.inventoryOrder.status;
    //         if (status === 'CREATED') {
    //             return 'w-3 h-3 bg-blue-500 rounded-full border-2 border-black';
    //         } else if (status === 'IN_PROGRESS') {
    //             return 'w-3 h-3 bg-yellow-500 rounded-full border-2 border-black';
    //         } else if (status === 'COMPLETED') {
    //             return 'w-3 h-3 bg-purple-500 rounded-full border-2 border-black';
    //         } 
    //     }
    // }
    
}
</script>

<style>

.card-body {
    text-align: left;
    display: flex;
    flex-direction: column;
  height: 100%;
}

.Buttons{
margin-top: auto;
  display: flex;
  justify-content: flex-end;
}

.article-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;
    border: 1px solid #060E28;
}

.column-custom {
    display: flex;
    justify-content: center;
    align-items: center;
}


.header-text {
    font-weight: bold;
    text-align: center;
}


</style>