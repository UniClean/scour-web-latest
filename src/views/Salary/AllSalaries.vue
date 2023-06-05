<template>
    <div class="w-93% mt-5">
        <div class="m-b-5 flex items-center justify-between">
          
          
            <div class="flex justify-between">
          <div class="header ml-10 ">Зарплаты</div>
        
                
          <div class="justify-between ml-10">
            <Button class="border-[#060E28] bg-white text-[#060E28] font-medium " label="Все сотрудники"
                 @click="redirectToAllSalariesPage" severity="secondary" 
                 active-class="p-button-secondary-active" outlined />
         

                <Button class="border-[#060E28] bg-white text-[#060E28] font-medium ml-3" 
                icon="pi pi-search" @click="redirectToSalaryPage" outlined /></div></div>


            <div class="flex justify-end mr-10" >
                  <Dropdown class="mr-2" v-model="month" :options="months" 
                  optionLabel="name" optionValue="month" placeholder="Месяц" />
  
                  <Dropdown class="mr-2" v-model="year" :options="years" 
                  optionLabel="year" optionValue="year" placeholder="Год" />
  
                  <Button label="Выбрать" class="border-[#060E28] bg-white text-[#060E28]" 
                  @click="() => getAllSalaries(this.month, this.year)"/>
          </div>
      </div></div>
      
  
        <div class="mt-4 ml-10 mr-10">
            <DataTable :value="salaries" removableSort >
                <Column field="employee" header="Сотрудник" footer="Итого" sortable />
                <Column field="total_payout" header="Оплата, тг" :footer="this.total" sortable/>
                <Column field="paid_payout" header="Оплачено, тг" :footer="this.paid" footer-style="color: green" sortable/>
                <Column field="not_paid_payout" header="Не оплачено, тг" :footer="this.notPaid" footer-style="color: red" sortable/>
  
  
  
          
  
  
                <Column>
                      <template #body="rowData">
                          <div class="flex justify-end" v-if="rowData.data.notPaidIDs.employee_salary_ids.length > 0">                 
                              <Button label="Оплатить" class="border-[#060E28] bg-white text-[#060E28]"
                                          @click="() => showConfirmDialog(rowData.data.notPaidIDs)" />
                          </div>
                      </template>            
                  </Column>
  
                <div v-if="loading" class="flex justify-center items-center">
            <ProgressSpinner /></div>
           
  
  
            </DataTable>
        </div>
        <div>

          <Dialog  :header="'Подтверждение'" v-model:visible="confirmDialog" style="width: 400px !important;">
            <div class="dialog-content">
            <h1>Подтвердите оплату</h1>
            <div class="mt-3">
                        <Button label="Подтвердить" class="bg-[green] border-[green]  mr-3" @click="changeStatusOfSalary(this.chosenSalaryId)"></Button>
                        <Button label="Отмена" class=" bg-[grey] border-[grey] " @click="closeConfirmDialog"></Button>
                    </div>
                </div>
         </Dialog>

    </div>
  
    
  </template>
  
  <script>
  import {getAllSalaries, changeStatusOfSalary} from '@/services';
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import ProgressSpinner from 'primevue/progressspinner';
  import Dropdown from 'primevue/dropdown';
  import Button from 'primevue/button';
  import router from '../../router'
  import Dialog from 'primevue/dialog';

  export default {
    name: 'AllSalariesPage',
    data() {
      const now = new Date();
      const defaultMonth = now.getMonth() + 1;
      const defaultYear = now.getFullYear();
        return {
          chosenSalaryId: 0,
          confirmDialog: false,
          loading: false,
          month: defaultMonth,
          year: defaultYear,
          salaries: [],     
          total: 0,
          paid: 0,
          notPaid: 0,
          months: [
            {month: 1, name:"январь"}, {month: 2, name:"февраль"}, {month: 3, name:"март"},
            {month: 4, name:"апрель"}, {month: 5, name:"май"}, {month: 6, name:"июнь"},
            {month: 7, name:"июль"}, {month: 8, name:"август"}, {month: 9, name:"сентябрь"},
            {month: 10, name:"октябрь"}, {month: 11, name:"ноябрь"}, {month: 12, name:"декабрь"}
          ],
          years: [{year: defaultYear}, {year: now.getFullYear()+1}],
        
      };
    },
    components: {
        DataTable,
        Column,
        Button,
        ProgressSpinner,
        Dropdown,
        Dialog
  
    },
    methods: {
      
     
 
getAllSalaries(month, year) {
  getAllSalaries(month, year).then(res => {
    this.salaries = res;
    this.loading = false;

    for (let employee of this.salaries) {
      let total = 0;
      let paid = 0;
      let not_paid = 0;

      for (let salary of employee.salaries) {
        total += salary.payout_per_order;
        if (salary.is_paid) {
          paid += salary.payout_per_order;
        } else {
          not_paid += salary.payout_per_order;
        }
      }

      employee.total_payout = total;
      employee.paid_payout = paid;
      employee.not_paid_payout = not_paid;
    }
    this.calculateTotal(this.salaries);
    this.getNotPaidIDs(this.salaries)
    this.loading = false;
  });
},

calculateTotal(salary) { 
  let total = 0;
  let paid = 0;
  let notPaid = 0;

 salary.forEach(item => {
    total += item.total_payout;
    paid += item.paid_payout;
    notPaid += item.not_paid_payout
 });
 this.total = total;
 this.paid = paid;
 this.notPaid = notPaid
 return this.total, this.paid, this.notPaid;
},



  getNotPaidIDs(salaries) {

    for (let employee of salaries) {
      let ids =  {
  "employee_salary_ids": []}
      for (let salary of employee.salaries) {        
        if (!salary.is_paid) {
          ids.employee_salary_ids.push(salary.id);
        } 
      }
      employee.notPaidIDs = ids;
    
    }
    this.loading = false;
  },

  
  async changeStatusOfSalary(notPaidIDs){  
    this.loading = true; 
    await changeStatusOfSalary(notPaidIDs)
    this.getAllSalaries(this.month, this.year)
    this.confirmDialog = false
  },
  
  
  formatDate(dateTime) {
              const date = new Date(dateTime);
              return date.toLocaleDateString();
          },

          redirectToSalaryPage() {
        router.push('/salary')
        },

        redirectToAllSalariesPage() {
        router.push('/allsalaries')
        },
  
        showConfirmDialog(salaryId){
            this.confirmDialog = true;
            this.chosenSalaryId = salaryId
        }, 

       closeConfirmDialog(){
        this.confirmDialog = false
       },
    
      },
      computed: {
    $route() {
      return this.$router.currentRoute;
    }
  },
   
  
  }  
  </script>

