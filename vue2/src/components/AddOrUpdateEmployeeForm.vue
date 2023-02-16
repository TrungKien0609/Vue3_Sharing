<template>
  <div class='container'>
    <h1 class='title'>{{ isAddOrUpdate ? 'Add New Employee' : 'Update Employee' }} Form</h1>
    <div class='form'>
      <input type='text' v-model='currentInputEmployeeName' placeholder='Name'>
      <input type='email' v-model='currentInputEmployeeEmail' placeholder='Email'>
      <input type='text' v-model='currentInputEmployeeCountry' placeholder='Country'>
      <input type='number' v-model='currentInputEmployeeAge' placeholder='Age'>
      <input type='number' v-model='currentInputEmployeeSalary' placeholder='Salary'>
    </div>
    <button @click='save' class='save-btn bg-green-400 text-white px-3 py-2 rounded-md mt-3 hover:bg-green-600'>Save</button>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { type PropType } from 'vue'
import axios from 'axios'
import { Employee } from '@/types'

interface EmployeeInfo {
  id: number,
  name: string,
  email: string,
  country: string,
  age: number,
  salary: number
}

export default Vue.extend({
  name: 'AddOrUpdateEmployeeForm',
  props: {
    employeeInfor: {
      type: Object as PropType<EmployeeInfo>,
      required: true
    },
    isAddOrUpdate: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      currentInputEmployeeId: this.employeeInfor.id,
      currentInputEmployeeName: this.employeeInfor.name,
      currentInputEmployeeEmail: this.employeeInfor.email,
      currentInputEmployeeCountry: this.employeeInfor.country,
      currentInputEmployeeAge: this.employeeInfor.age,
      currentInputEmployeeSalary: this.employeeInfor.salary
    }
  },
  methods: {
    async save() {
      const data = {
        name: this.currentInputEmployeeName,
        email: this.currentInputEmployeeEmail,
        country: this.currentInputEmployeeCountry,
        age: this.currentInputEmployeeAge,
        salary: this.currentInputEmployeeSalary
      }
      if (this.isAddOrUpdate) {
        const res = await axios.post<Employee>('http://localhost:8000/api/employees', data)
        this.$emit('addNewEmployee', res.data)
      } else {
        const res = await axios.post<Employee>(`http://localhost:8000/api/employees/${this.employeeInfor.id}`, {
          _method: 'PATCH',
          id: this.employeeInfor.id,
          ...data
        })
        this.$emit('updateEmployee', res.data)
      }
    }
  }
})
</script>

<style lang='scss' scoped>
.container {
  .title {
    font-size: 20px;
    font-weight: 500;
    text-transform: capitalize;
    margin: 16px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    input {
      background-color: #e5e7eb;
      outline: none;
      border: none;
      padding: 8px 16px;
      border-radius: 5px;
      width: 100%;
    }
  }
  .save-btn {
    background-color: #4ade80;
    outline: none;
    border: none;
    cursor: pointer;
    color: #fff;
    padding: 8px 12px;
    border-radius: 5px;
    margin-top: 12px;
    transition: background-color 0.25s;
    &:hover {
      background-color: #16a34a;
    }
  }
}
</style>
