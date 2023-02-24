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
      v-model:currentInputEmployeeName="currentEmployee.name"
      v-model:currentInputEmployeeEmail="currentEmployee.email"
      v-model:currentInputEmployeeCountry="currentEmployee.country"
      v-model:currentInputEmployeeAge="currentEmployee.age"
      v-model:currentInputEmployeeSalary="currentEmployee.salary"
      @saveEmployee="handleSaveEmployee"
    />
    <br>
    <br>
    <br>
    <button id="button" ref="button" @click="count++">Click {{ count }}</button>
    <pre>{{ output.pre + "\n" }}{{ output.sync + "\n" }}{{ output.post + "\n" }}</pre>
</div>
</template>
<script setup lang='ts'>
import { onMounted, onUpdated, reactive, ref, toRef, watch } from 'vue'
import { useEmployee } from "@/hooks/useEmployee.vue"
import AddOrUpdateEmployeeForm from "@/components/AddOrUpdateEmployeeForm.vue"
import type { Employee } from './types';

const { employees, currentEmployee, showEmployee, resetCurrentEmployee, addNewEmployee, updateEmployee, deleteEmployee } = useEmployee()
const isAddOrUpdate = ref(false)
const isShowForm = ref(false)

const button = ref<null | HTMLElement>(null)
const count = ref(0)
const output = reactive({
  pre: "",
  sync: "",
  post: "",
});
const a = ref(0);
const b = ref(0);

const openFormToAddNewEmployee = () => {
  isShowForm.value = true // show add new form
  isAddOrUpdate.value = true
  resetCurrentEmployee()
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

watch(toRef(currentEmployee,'country'), (newValue, oldValue) => {
  console.log("newValue currentEmployeeCountry", newValue)
  console.log("oldValue currentEmployeeCountry", oldValue)
})
watch([toRef(currentEmployee,'name'), toRef(currentEmployee,'email')], (newValue, oldvValue ) => {
  console.log("oldvValue", oldvValue)
  console.log("newValue", newValue)
})

// watch( count,(newValue, oldValue) => {
//   console.log("btn Element",button.value)
//   console.log("button element", button.value?.innerHTML)
// }, {
//   flush: 'post'
// })

watch([ a, b ], () => {
  output.pre += `pre, a: ${a.value}, b: ${b.value}\n`;
  console.log("pre callback");
}, { flush: "pre" });

watch([ a, b ], () => {
  output.post += `post, a: ${a.value}, b: ${b.value}\n`;
  console.log("post callback")
}, { flush: "post" });

watch([ a, b ], () => {
  output.sync += `sync, a: ${a.value}, b: ${b.value}\n`;
  console.log("sync callback");
}, { flush: "sync" });

onMounted(() => {
  console.log("before mutations");
  a.value++;
  a.value++;
  b.value++;
  console.log("after mutations");
})

onUpdated(() => {
  console.log("updated")
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
