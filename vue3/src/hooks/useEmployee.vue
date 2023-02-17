<script lang="ts">
import { ref, onMounted, reactive } from "vue"
import axios from 'axios'
import type { Employee } from "@/types/index"

export function useEmployee() {
  const employees = ref<Employee[]>([])
  const currentEmployee = reactive({
    id: 0,
    name: '',
    email: '',
    country: '',
    age: 0,
    salary: 0
  })

  const getEmployees = async () => {
    const res = await axios.get<Employee[]>('http://localhost:8000/api/employees')
    employees.value = res.data
  }

  onMounted(getEmployees)

  const resetCurrentEmployee = () => {
    currentEmployee.id = 0
    currentEmployee.age = 0
    currentEmployee.name = ''
    currentEmployee.country = ''
    currentEmployee.email = ''
    currentEmployee.salary = 0
  }

  const addNewEmployee = async () => {
    const data = {
      name: currentEmployee.name,
      email: currentEmployee.email,
      country: currentEmployee.country,
      age: currentEmployee.age,
      salary: currentEmployee.salary
    }
    const res = await  axios.post<Employee>('http://localhost:8000/api/employees', data)
    employees.value.push(res.data)
  }
  const showEmployee = (id: number, name: string, email: string, country: string, age: number, salary: number) => {
    currentEmployee.id = id
    currentEmployee.name = name
    currentEmployee.country = country
    currentEmployee.age = age
    currentEmployee.email = email
    currentEmployee.salary = salary
  }
  const updateEmployee = async () => {
    const data = {
      id: currentEmployee.id,
      name: currentEmployee.name,
      email: currentEmployee.email,
      country: currentEmployee.country,
      age: currentEmployee.age,
      salary: currentEmployee.salary
    }
    const res = await axios.post(`http://localhost:8000/api/employees/${currentEmployee.id}`, {
      _method: 'PATCH',
      ...data
    })
    employees.value.forEach((el, index) => {
      if (el.id === data.id) {
        employees.value[index] = {
          id: data.id,
          name: data.name,
          email: data.email,
          country: data.country,
          age: data.age,
          salary: data.salary
        }
      }
    })
  }
  const deleteEmployee = async (id: number, index: number) => {
    const res = await axios.delete(
      `http://localhost:8000/api/employees/${id}`
    )
    employees.value.splice(index)
  }
  return {
    employees,
    currentEmployee,
    addNewEmployee,
    updateEmployee,
    resetCurrentEmployee,
    showEmployee,
    deleteEmployee
  }
}

</script>