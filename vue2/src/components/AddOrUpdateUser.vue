<template>
  <div class='container'>
    <h1 class='title'>{{ isAddOrUpdate ? 'Add New User' : 'Update User' }} Form</h1>
    <div class='form'>
      <input type='text' v-model='currentInputUserName' placeholder='Name'>
      <input type='email' v-model='currentInputUserEmail' placeholder='Email'>
      <input type='text' v-model='currentInputUserCountry' placeholder='Country'>
      <input type='number' v-model='currentInputUserAge' placeholder='Age'>
      <input type='number' v-model='currentInputUserSalary' placeholder='Salary'>
    </div>
    <button @click='save' class='save-btn bg-green-400 text-white px-3 py-2 rounded-md mt-3 hover:bg-green-600'>Save</button>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { type PropType } from 'vue'
import axios from 'axios'

interface UserInfo {
  id?: number,
  name: string | null,
  email: string | null,
  country: string | null,
  age: number | null,
  salary: number | null
}

export default Vue.extend({
  name: 'HelloWorld',
  props: {
    userInfor: {
      type: Object as PropType<UserInfo>,
      required: true
    },
    isAddOrUpdate: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      currentInputUserId: this.userInfor.id as number | undefined,
      currentInputUserName: this.userInfor.name as string | null,
      currentInputUserEmail: this.userInfor.email as string | null,
      currentInputUserCountry: this.userInfor.country as string | null,
      currentInputUserAge: this.userInfor.age as number | null,
      currentInputUserSalary: this.userInfor.salary as number | null
    }
  },
  watch: {
    userInfor() {
      this.currentInputUserId = this.userInfor.id
      this.currentInputUserName = this.userInfor.name
      this.currentInputUserEmail = this.userInfor.email
      this.currentInputUserCountry = this.userInfor.country
      this.currentInputUserAge = this.userInfor.age
      this.currentInputUserSalary = this.userInfor.salary
    }
  },
  methods: {
    async save() {
      const data = {
        id: this.userInfor.id as number,
        name: this.currentInputUserName,
        email: this.currentInputUserEmail,
        country: this.currentInputUserCountry,
        age: this.currentInputUserAge,
        salary: this.currentInputUserSalary
      }
      if (this.isAddOrUpdate) {
        const res = await axios.post('http://localhost:8000/api/employees', data)
        this.$emit('saveNewUser', res.data)
      } else {
        const res = await axios.post(`http://localhost:8000/api/employees/${this.userInfor.id}`, {
          _method: 'PATCH',
          ...data
        })
        this.$emit('updateEmployees', data)
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
