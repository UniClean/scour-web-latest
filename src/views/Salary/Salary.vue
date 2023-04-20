<template>
  <div class="ml-5 mr-52">
  <div class="header ml-10 mt-5">Зарплаты</div>
  <DataTable :value="equipmentList" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50]"
                :responsive="true">
                <Column field="date" header="Даты" />
                <Column field="hour" header="Мария" />
                <Column field="hour2" header="Татьяна" />
                <Column field="hour3" header="Мурат" />
              </DataTable></div>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

import 'primevue/resources/themes/mdc-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

export default {
  name: 'CalculatSalary',
  components: {
    DataTable,
    Column,
  },
  data() {
    return {
      equipmentList: [
        { date: '01.04.2023', hour: '1 час', hour2: '2 часа', hour3: '5 часов'},
        { date: '02.04.2023',  hour: '3 часa', hour2: '1 час', hour3: '4 часа' },
        { date: '03.04.2023',  hour: '5 часов', hour2: '4 часа', hour3: '1 час'},
        { date: '04.04.2023',  hour: '8 часов',hour2: '6 часов', hour3: '2 часа'},
        { date: '05.04.2023',  hour: '5 часов', hour2: '3 часа', hour3: '7 часов'},
        { date: '6.04.2023',  hour: '5 часов', hour2: '2 часа', hour3: '1 час'},
        { date: 'Итого',  hour: '40 500 тг', hour2: '30 000 тг', hour3: '31 500 тг'},

        // add more dates here...
      ],
      names: ['Мария', 'Мурат', 'Татьяна'],
    };
  },
};
</script>

<style scoped>
h3 {
  margin-bottom: 1rem;
}
</style>
