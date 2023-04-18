<template>
        <div class="m-b-5 flex items-center justify-between">
            <div class="header ml-10 mt-5">Рабочие часы сотрудников</div>

        </div>


        <div>
    <div class="p-d-flex p-ai-center">
      <label for="column-name" class="p-mr-2">Column Name:</label>
      <input type="text" id="column-name" v-model="columnName" class="p-inputtext" />
      <Button @click="addColumn" class="p-ml-2" label="Add Column" />
    </div>

    <DataTable :value="data">
      <Column v-for="column in columns" :field="column.field" :header="column.header" :key="column.field" />
      <Column field="actions" header="Actions" />
    </DataTable>
  </div>

</template>

<script>
// export default {
//     name: 'CalculatSalary',
// }

import { DataTable, Column } from "primevue/datatable";
import Button from "primevue/button";

export default {
    name: 'CalculatSalary',
  components: {
    DataTable,
    Column,
    Button
  },
  data() {
    return {
      columnName: "",
      columns: [],
      data: []
    };
  },
  methods: {
    addColumn() {
      if (this.columnName) {
        const column = {
          field: this.columnName,
          header: this.columnName
        };
        this.columns.push(column);
        this.data.forEach(row => {
          this.$set(row, this.columnName, ""); // Initialize the new column with empty string value for each row
        });
        this.columnName = "";
      }
    }
  }
};
</script>