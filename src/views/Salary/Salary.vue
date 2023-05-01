<template>
  <div class="w-93% mt-5">
      <div class="m-b-5 flex items-center justify-between">

        <div class="flex justify-between">
          <div class="header ml-10 ">Поиск сотрудника</div>
        
                
          <div class="justify-between ml-10">
                <Button class="border-[#060E28] bg-white text-[#060E28] font-medium " label="Все сотрудники"
                 @click="redirectToAllSalariesPage" outlined />
                 <Button class="border-[#060E28] bg-white text-[#060E28] font-medium ml-3" 
                icon="pi pi-search" @click="redirectToSalaryPage" outlined />
               </div></div>
   



          <div class="flex justify-end mr-10" >
            <Dropdown class="mr-2" v-model="employee_id" :options="employees" 
                :optionLabel="employee => `${employee.last_name} ${employee.first_name} `" 
                optionValue="id" placeholder="Cотрудник" />

                <Dropdown class="mr-2" v-model="month" :options="months" 
                optionLabel="name" optionValue="month" placeholder="Месяц" />

                <Dropdown class="mr-2" v-model="year" :options="years" 
                optionLabel="year" optionValue="year" placeholder="Год" />

                <Button label="Выбрать" class="border-[#060E28] bg-white text-[#060E28]" 
                @click="() => getSalaryOfOneEmployee(this.employee_id, this.month, this.year)"/>
        </div>
    </div></div>
    

      <div class="mt-4 ml-10 mr-10">
          <DataTable :value="salaries" removableSort >
              <Column field="dateOfMonth" header="Дата" footer="Итого" sortable />
              <Column field="worked_hours_amount" header="Отработано часов" sortable/>
              <Column field="object_name" header="Объект" :footer="'Оплачено: '+ this.paid" footer-style="color: green" sortable/>

              <Column header="Статус" :footer="'Не оплачено: ' + this.notPaid" footer-style="color: red" sortable>
                  <template #body="rowData">
                      <span v-if="rowData.data.is_paid"> Оплачено</span>
                      <span v-else >Не оплачено</span>
                  </template>
              </Column>
            
              <Column field="payout_per_order" header="Оплата, тг" :footer="'Всего: ' + this.total"  sortable/>

        


              <Column :footer-style="{ padding: 0, margin: 0 }">
                    <template #body="rowData">
                        <div class="flex justify-end" v-if="!rowData.data.is_paid">                 
                            <Button label="Оплатить" class="border-[#060E28] bg-white text-[#060E28]"
                                        @click="() => changeStatusOfOneSalary(rowData.data.id)" />
                        </div>
                    </template>  
                    <template #footer >
                        <Button v-if="this.notPaid != 0" label="Оплатить всё"
                                class="border-[green] bg-white text-[green] "
                                @click="changeStatusOfAllSalaries" />
                  </template>
                </Column>

              <div v-if="loading" class="flex justify-center items-center">
          <ProgressSpinner /></div>
         


          </DataTable>

        
      </div>
      <div>
        
  </div>

  
</template>

<script>
import {getSalaryOfOneEmployee, getAllEmployees, changeStatusOfSalary} from '@/services';
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ProgressSpinner from 'primevue/progressspinner';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import router from '../../router'

export default {
  name: 'SalaryPage',
  data() {
    const now = new Date();
    const defaultMonth = now.getMonth() + 1;
    const defaultYear = now.getFullYear();
      return {
        loading: false,
        employee_id: null,
        month: defaultMonth,
        year: defaultYear,
        salaries: [],
        employees: [],
        salaryID: {
  "employee_salary_ids": []
},
        salaryIDs: null,
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
      Dropdown
      

  },
  methods: {
    getEmployees() {
            getAllEmployees().then(res => {
                this.employees = res.filter(employee => employee.position.name === "cleaner");
                this.loading = false;
            });
        },

    
  
      getSalaryOfOneEmployee(employee_id, month, year) {
  getSalaryOfOneEmployee(employee_id, month, year).then(res => {
    this.salaries = res.map(salary => {
      const date = salary.dateOfMonth;
      const formattedDate = this.formatDate(date)
      return {
        ...salary,
        dateOfMonth: formattedDate
      };
    });
    this.calculateTotal(this.salaries);
    this.addingNotPaidIDs(this.salaries)
    this.loading = false;
  });
},


calculateTotal(salary) { 
    let total = 0;
    let paid = 0;
    let notPaid = 0;
  
   salary.forEach(item => {
     if (item.is_paid) {
       paid += item.payout_per_order;
     } else {
       notPaid += item.payout_per_order;
     }
      total += item.payout_per_order;
   });
   this.total = total;
   this.paid = paid;
   this.notPaid = notPaid
   return this.total, this.paid, this.notPaid;
  },

addingNotPaidIDs(salary) {
  let IDs = {
  "employee_salary_ids": []
};
 salary.forEach(item => {
   if (!item.is_paid) {
     IDs.employee_salary_ids.push(item.id);
   } 
 });
 this.salaryIDs = IDs
 return this.salaryIDs
},

changeStatusOfOneSalary(employee_salary_ids){
  this.salaryID.employee_salary_ids.push(employee_salary_ids);
  changeStatusOfSalary(this.salaryID);
  this.getSalaryOfOneEmployee(this.employee_id, this.month, this.year)

},

changeStatusOfAllSalaries(){
  changeStatusOfSalary(this.salaryIDs);
  this.getSalaryOfOneEmployee(this.employee_id, this.month, this.year)

},


formatDate(dateTime) {
            const date = new Date(dateTime);
            return date.toLocaleDateString();
        },

        redirectToAllSalariesPage() {
        router.push('/allsalaries')
        },
        redirectToSalaryPage() {
        router.push('/salary')
        },
  
    },

    


  mounted() {
      this.loading = true;
      this.getEmployees()
      
      
      
  },
 

}  
</script>