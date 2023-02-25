<script lang="ts">
import { ref, onMounted } from "vue"
import axios from 'axios'
import type { Employee } from "@/types/index"

export function useEmployee() {
  const employees = ref<Employee[]>([])
  const currentEmployeeId = ref(0)
  const currentEmployeeName = ref('')
  const currentEmployeeEmail = ref('')
  const currentEmployeeCountry = ref('')
  const currentEmployeeAge = ref(0)
  const currentEmployeeSalary = ref(0)

  const getEmployees = async () => {
    const res = await axios.get<Employee[]>('http://localhost:8000/api/employees')
    employees.value = res.data
  }

  const resetCurrentEmployee = () => {
    currentEmployeeId.value = 0
    currentEmployeeAge.value = 0
    currentEmployeeName.value = ''
    currentEmployeeCountry.value = ''
    currentEmployeeEmail.value = ''
    currentEmployeeSalary.value = 0
  }

  const addNewEmployee = async () => {
    const data = {
      name: currentEmployeeName.value,
      email: currentEmployeeEmail.value,
      country: currentEmployeeCountry.value,
      age: currentEmployeeAge.value,
      salary: currentEmployeeSalary.value
    }
    const res = await axios.post<Employee>('http://localhost:8000/api/employees', data)
    employees.value.push(res.data)
  }
  const showEmployee = (id: number, name: string, email: string, country: string, age: number, salary: number) => {
    currentEmployeeId.value = id
    currentEmployeeName.value = name
    currentEmployeeCountry.value = country
    currentEmployeeAge.value = age
    currentEmployeeEmail.value = email
    currentEmployeeSalary.value = salary
  }
  const updateEmployee = async () => {
    const data = {
      id: currentEmployeeId.value,
      name: currentEmployeeName.value,
      email: currentEmployeeEmail.value,
      country: currentEmployeeCountry.value,
      age: currentEmployeeAge.value,
      salary: currentEmployeeSalary.value
    }
    const res = await axios.post(`http://localhost:8000/api/employees/${currentEmployeeId.value}`, {
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
    currentEmployeeId,
    currentEmployeeName,
    currentEmployeeEmail,
    currentEmployeeCountry,
    currentEmployeeAge,
    currentEmployeeSalary,
    getEmployees,
    addNewEmployee,
    updateEmployee,
    resetCurrentEmployee,
    showEmployee,
    deleteEmployee
  }
}

</script>