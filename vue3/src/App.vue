<template>
  <div class="container">
    <button class="add_btn" @click="openFormToAddNewEmployee">
      Add more employee
    </button>
    <div class="table">
      <div class="header">
        <p style="width: 20%;">Name</p>
        <p style="width: 20%;">Country</p>
        <p style="width: 15%;">Salary</p>
        <p style="width: 35%;">Email</p>
        <p style="width: 15%;">Age</p>
        <p style="width: 20%;">Action</p>
      </div>
      <div class="item" v-for="(employee, index) in employees" :key="index">
        <p style="width: 20%;">{{ employee.name }}</p>
        <p style="width: 20%;">{{ employee.country }}</p>
        <p style="width: 15%;">{{ employee.salary }}</p>
        <p style="width: 35%;">{{ employee.email }}</p>
        <p style="width: 15%;">{{ employee.age }}</p>
        <div class="actions" style="width: 20%;">
          <button class="btn edit-btn" @click="openFormToEditEmployee(employee)">
            Edit
          </button>
          <button class="btn del-btn" @click="deleteEmployee(employee.id, index)">
            Delete
          </button>
        </div>
      </div>
    </div>
    <AddOrUpdateEmployeeForm v-if="isShowForm" :isAddOrUpdate="isAddOrUpdate" 
      v-model:currentInputEmployeeName="currentEmployeeName"
      v-model:currentInputEmployeeEmail="currentEmployeeEmail"
      v-model:currentInputEmployeeCountry="currentEmployeeCountry"
      v-model:currentInputEmployeeAge="currentEmployeeAge"
      v-model:currentInputEmployeeSalary="currentEmployeeSalary"
      @saveEmployee="handleSaveEmployee"
    />
</div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import { useEmployee } from "@/hooks/useEmployee.vue"
import AddOrUpdateEmployeeForm from '@/components/AddOrUpdateEmployeeForm.vue'
import type { Employee } from '@/types';

export default defineComponent({
  setup(props, context) {
    console.log("context", context)
    return useEmployee()
    // { employees, currentEmployeeAge, currentEmployeeCountry, currentEmployeeEmail,currentEmployeeName, currentEmployeeSalary, showEmployee, resetCurrentEmployee, addNewEmployee, updateEmployee, deleteEmployee }
  },
  components: {AddOrUpdateEmployeeForm},
  data() {
    return {
      isAddOrUpdate: false,
      isShowForm: false
    }
  },
  methods: {
    openFormToAddNewEmployee(){
      this.isShowForm = true 
      this.isAddOrUpdate = true // show add new form
      this.resetCurrentEmployee()
    },
    openFormToEditEmployee(employee: Employee) {
      this.isShowForm = true
      this.isAddOrUpdate = false // show edit form
      this.showEmployee(employee.id, employee.name, employee.email, employee.country, employee.age, employee.salary)
    },
    async handleSaveEmployee() {
      await this.isAddOrUpdate ? this.addNewEmployee() : this.updateEmployee()
      this.isShowForm = false
    }
  },
})
</script>
<style scoped lang="scss">
.container {
  max-width: 900px;
  margin: 0 auto;
  margin-top: 40px;

  .add_btn {
    display: block;
    background-color: #4ade80;
    padding: 4px 8px;
    border-radius: 5px;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
    transition: background-color 0.25s;

    &:hover {
      background-color: #22c55e;
    }
  }

  .table {
    display: flex;
    flex-direction: column;
    width: 100%;

    .header {
      display: flex;
      gap: 5px;
      color: #000;
      font-size: 18px;
      width: 100%;
    }

    .item {
      display: flex;
      gap: 5px;
      margin: 8px 0;

      .actions {
        display: flex;
        gap: 10px;

        .btn {
          outline: none;
          border: none;
          cursor: pointer;
          border-radius: 5px;
          padding: 8px 16px;
          height: fit-content;
        }

        .edit-btn {
          color: #fff;
          background-color: #3b82f6;
        }

        .del-btn {
          color: #fff;
          background-color: #ef4444;
        }
      }
    }
  }
}
</style>
