<template>
  <div class="container">
    <button class="add_btn" @click='openFormToAddNewEmployee'>
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
        <div class='actions' style="width: 20%;">
          <button class='btn edit-btn' @click='openFormToEditEmployee(employee)'>
            Edit
          </button>
          <button class='btn del-btn' @click='deleteEmployeeMixin(employee.id, index)'>
            Delete
          </button>
        </div>
      </div>
    </div>
    <AddOrUpdateEmployeeForm @addNewEmployee="handleAddNewEmployee" @updateEmployee="handleUpdateEmployee" v-if="isShowForm"
      :isAddOrUpdate="isAddOrUpdate" :employeeInfor="{
        id: currentEmployeeId,
        name: currentEmployeeName,
        email: currentEmployeeEmail,
        country: currentEmployeeCountry,
        age: currentEmployeeAge,
        salary: currentEmployeeSalary,
      }" />
</div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { VueConstructor } from 'vue/types/umd'
import type { Employee } from '@/types/index'
import AddOrUpdateEmployeeForm from '@/components/AddOrUpdateEmployeeForm.vue'
import employeeMixin from '@/mixins/employeeMixin'
import otherMixin from '@/mixins/otherMixin'

export default (Vue as VueConstructor<Vue & InstanceType<typeof employeeMixin> & InstanceType<typeof otherMixin>>).extend({
  name: 'App',
  mixins: [employeeMixin, otherMixin],
  components: { AddOrUpdateEmployeeForm },
  data() {
    return {
      isAddOrUpdate: false,
      isShowForm: false
    }
  },
  async created() {
    this.getEmployeesMixin()
  },
  methods: {
    openFormToAddNewEmployee() {
      this.isShowForm = true
      this.isAddOrUpdate = true // add new
      this.resetCurrentEmployeeMixin()
      console.log('465465')
    },
    openFormToEditEmployee(employee: Employee) {
      this.isShowForm = true
      this.isAddOrUpdate = false // edit
      this.getCurrentEmployeeMixin(employee)
    },
    handleAddNewEmployee(employee: Employee) {
      this.addNewEmployeeMixin(employee)
      this.isShowForm = false
    },
    handleUpdateEmployee(employee: Employee) {
      this.updateEmployeeMixin(employee)
      this.isShowForm = false
    }
  }
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
