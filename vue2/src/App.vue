<template>
  <div class='container'>
    <button class='add_btn' @click='addNewUser'>
      Add more user
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
        <p style="width: 15%;">{{ item.name }}</p>
        <p style="width: 35%;">{{ item.country }}</p>
        <p style="width: 15%;">{{ item.salary }}</p>
        <p style="width: 15%;">{{ item.email }}</p>
        <p style="width: 35%;">{{ item.age }}</p>
        <div class='actions'>
          <button class='btn edit-btn' @click='editUser(item.id, item.name, item.email, item.country, item.age, item.salary)'>
            Edit
          </button>
          <button class='btn del-btn' @click='deleteuser(item.id, index)'>
            Delete
          </button>
        </div>
      </div>
    </div>
    <AddOrUpdateUser @saveNewUser='saveNewUser' @updateEmployees='updateEmployees' v-if='isShowForm'
      :isAddOrUpdate='isAddOrUpdate' :userInfor='{
        id: currentUserId,
        name: currentUserName,
        email: currentUserEmail,
        country: currentUserCountry,
        age: currentUserAge,
        salary: currentUserSalary,
      }' />
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import type { Employee } from '@/types/index'
import AddOrUpdateUser from '@/components/AddOrUpdateUser.vue'
import axios from 'axios'
export default Vue.extend({
  name: 'App',
  components: { AddOrUpdateUser },
  data() {
    return {
      employees: [] as Array<Employee>,
      isAddOrUpdate: true as boolean,
      isShowForm: false as boolean,
      currentUserId: undefined as number | undefined,
      currentUserName: null as string | null,
      currentUserEmail: null as string | null,
      currentUserCountry: null as string | null,
      currentUserAge: null as number | null,
      currentUserSalary: null as number | null
    }
  },
  created() {
    const getEmployees = async () => {
      const res = await axios.get('http://localhost:8000/api/employees')
      this.employees = res.data
    }
    getEmployees()
  },
  beforeMount() {
    console.log('this', this.$el)
  },
  mounted() {
    console.log('mounted', this.$el)
  },
  methods: {
    updateEmployees(data: Employee) {
      this.employees = this.employees.map((el) => {
        if (el.id !== data.id) return el
        else {
          return {
            id: data.id,
            name: data.name,
            email: data.email,
            country: data.country,
            age: data.age,
            salary: data.salary
          }
        }
      })
      this.isShowForm = false
    },
    saveNewUser(data: Employee) {
      this.employees = [...this.employees, data]
      this.isShowForm = false
    },
    addNewUser() {
      this.isShowForm = true
      this.isAddOrUpdate = true
      this.currentUserId = undefined
      this.currentUserName = null
      this.currentUserEmail = null
      this.currentUserCountry = null
      this.currentUserAge = null
      this.currentUserSalary = null
    },
    editUser(
      id: number,
      name: string | null,
      email: string | null,
      country: string | null,
      age: number | null,
      salary: number | null
    ) {
      this.isShowForm = true
      this.isAddOrUpdate = false
      this.currentUserId = id
      this.currentUserName = name
      this.currentUserEmail = email
      this.currentUserCountry = country
      this.currentUserAge = age
      this.currentUserSalary = salary
    },
    async deleteuser(id: number, index: number) {
      const res = await axios.delete(
        `http://localhost:8000/api/employees/${id}`
      )
      this.employees.splice(index, 1)
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
