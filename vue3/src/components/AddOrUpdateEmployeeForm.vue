<template>
  <div class="container">
    <h1 class="title">{{ isAddOrUpdate ? "Add New Employee" : "Update Employee" }} Form</h1>
    <div class="form">
      <input type="text" :value="currentInputEmployeeName" @input="$emit('update:currentInputEmployeeName', ($event.target as HTMLInputElement).value)" placeholder="Name">
      <input type="email" :value="currentInputEmployeeEmail" @input="$emit('update:currentInputEmployeeEmail', ($event.target as HTMLInputElement).value)" placeholder="Email">
      <input type="text" :value="currentInputEmployeeCountry"  @input="$emit('update:currentInputEmployeeCountry', ($event.target as HTMLInputElement).value)" placeholder="Country">
      <input type="number" :value="currentInputEmployeeAge === 0 ? '' : currentInputEmployeeAge" @input="$emit('update:currentInputEmployeeAge', ($event.target as HTMLInputElement).value)" placeholder="Age">
      <input type="number" :value="currentInputEmployeeSalary === 0 ? '': currentInputEmployeeSalary" @input="$emit('update:currentInputEmployeeSalary', ($event.target as HTMLInputElement).value)" placeholder="Salary">
    </div>
    <button @click="$emit('saveEmployee')"
      class="save-btn bg-green-400 text-white px-3 py-2 rounded-md mt-3 hover:bg-green-600">Save</button>
</div>
</template>
<script setup lang="ts">
const props = defineProps<{
  currentInputEmployeeName: string
  currentInputEmployeeEmail: string
  currentInputEmployeeCountry: string
  currentInputEmployeeAge: number
  currentInputEmployeeSalary: number
  isAddOrUpdate: Boolean
}>()
const emit = defineEmits<{
  (event: 'update', currentInputEmployeeName: string): void
  (event: 'update', currentInputEmployeeEmail: string): void
  (event: 'update', currentInputEmployeeCountry: string): void
  (event: 'update', currentInputEmployeeEmail: string): void
  (event: 'update', currentInputEmployeeAge: number): void
  (event: 'update', currentInputEmployeeSalary: number): void
  (event: "saveEmployee"): void
}>()
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
