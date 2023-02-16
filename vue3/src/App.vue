<template>
  <div class='container'>
    <button class='add_btn' @click='openFormToAddNewEmployee'>
      Add more employee
    </button>
    <div class='table'>
      <div class='header'>
        <p style="width: 20%;">Name</p>
        <p style="width: 20%;">Country</p>
        <p style="width: 15%;">Salary</p>
        <p style="width: 35%;">Email</p>
        <p style="width: 15%;">Age</p>
        <p style="width: 20%;">Action</p>
      </div>
      <div class='item' v-for='(item, index) in employees' :key='index'>
        <p style="width: 20%;">{{ item.name }}</p>
        <p style="width: 20%;">{{ item.country }}</p>
        <p style="width: 15%;">{{ item.salary }}</p>
        <p style="width: 35%;">{{ item.email }}</p>
        <p style="width: 15%;">{{ item.age }}</p>
        <div class='actions' style="width: 20%;">
          <button class='btn edit-btn' @click='openFormToEditEmployee(item)'>
            Edit
          </button>
          <button class='btn del-btn' @click='deleteEmployee(item.id, index)'>
            Delete
          </button>
        </div>
      </div>
    </div>
    <AddOrUpdateEmployeeForm v-if='isShowForm' :isAddOrUpdate='isAddOrUpdate' 
      v-model:currentInputEmployeeName="currentEmployeeName"
      v-model:currentInputEmployeeEmail="currentEmployeeEmail"
      v-model:currentInputEmployeeCountry="currentEmployeeCountry"
      v-model:currentInputEmployeeAge="currentEmployeeAge"
      v-model:currentInputEmployeeSalary="currentEmployeeSalary"
      @saveEmployee="handleSaveEmployee"
    />
</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useEmployee } from "@/hooks/useEmployee.vue"
import AddOrUpdateEmployeeForm from "@/components/AddOrUpdateEmployeeForm.vue"
import type { Employee } from './types';

const { employees, currentEmployeeAge, currentEmployeeCountry, currentEmployeeEmail,currentEmployeeName, currentEmployeeSalary, showEmployee, resetForm, addNewEmployee, updateEmployee, deleteEmployee } = useEmployee()
const isAddOrUpdate = ref<boolean>(false)
const isShowForm = ref<boolean>(false)
const openFormToAddNewEmployee = () => {
  isShowForm.value = true // show add new form
  isAddOrUpdate.value = true
  resetForm()
}
const openFormToEditEmployee = (item: Employee) => {
  isShowForm.value = true
  isAddOrUpdate.value = false // show edit form
  showEmployee(item.id, item.name, item.email, item.country, item.age, item.salary)
}
const handleSaveEmployee = async () => {
  await isAddOrUpdate.value ? addNewEmployee() : updateEmployee()
  isShowForm.value = false
}
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
