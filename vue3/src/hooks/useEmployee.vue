<script lang="ts">
import { ref, onMounted } from "vue"
import axios from 'axios'
import type { Employee } from "@/types/index"

export function useEmployee() {
  const employees = ref<Employee[] | []>([])
  const currentEmployeeId = ref<number | null>(null)
  const currentEmployeeName = ref<string | null>(null)
  const currentEmployeeEmail = ref<string | null>(null)
  const currentEmployeeCountry = ref<string | null>(null)
  const currentEmployeeAge = ref<number | null>(null)
  const currentEmployeeSalary = ref<number | null>(null)

  const getEmployees = async () => {
    const res = await axios.get<Employee[]>('http://localhost:8000/api/employees')
    employees.value = res.data
  }

  onMounted(getEmployees)

  const resetCurrentEmployee = () => {
    currentEmployeeId.value = null
    currentEmployeeAge.value = null
    currentEmployeeName.value = null
    currentEmployeeCountry.value = null
    currentEmployeeEmail.value = null
    currentEmployeeSalary.value = null
  }

  const addNewEmployee = async () => {
    const data = {
      name: currentEmployeeName.value,
      email: currentEmployeeEmail.value,
      country: currentEmployeeCountry.value,
      age: currentEmployeeAge.value,
      salary: currentEmployeeSalary.value
    }
    const res =  axios.post<Employee>('http://localhost:8000/api/employees', data)
    employees.value.push((await res).data)
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
        } as Employee
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
    addNewEmployee,
    updateEmployee,
    resetCurrentEmployee,
    showEmployee,
    deleteEmployee
  }
}

</script>