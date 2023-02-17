import Vue from 'vue'
import axios from 'axios'
import type { Employee } from '@/types/index'

export default Vue.extend({
  data() {
    return {
      employees: [] as Array<Employee>,
      currentEmployeeId: 0,
      currentEmployeeName: '',
      currentEmployeeEmail: '',
      currentEmployeeCountry: '',
      currentEmployeeAge: 0,
      currentEmployeeSalary: 0
    }
  },
  methods: {
    resetCurrentEmployeeMixin() {
      this.currentEmployeeId = 0
      this.currentEmployeeName = ''
      this.currentEmployeeEmail = ''
      this.currentEmployeeCountry = ''
      this.currentEmployeeAge = 0
      this.currentEmployeeSalary = 0
      console.log('465465465465')
    },
    getCurrentEmployeeMixin(item: Employee) {
      this.currentEmployeeId = item.id
      this.currentEmployeeName = item.name
      this.currentEmployeeEmail = item.email
      this.currentEmployeeCountry = item.country
      this.currentEmployeeAge = item.age
      this.currentEmployeeSalary = item.salary
    },
    async getEmployeesMixin() {
      const res = await axios.get('http://localhost:8000/api/employees')
      this.employees = res.data
    },
    async updateEmployeeMixin(employee: Employee) {
      const res = await axios.post<Employee>(`http://localhost:8000/api/employees/${employee.id}`, {
        _method: 'PATCH',
        ...employee
      })
      this.employees = this.employees.map(el => el.id === employee.id ? employee : el)
    },
    async addNewEmployeeMixin(data: Employee) {
      const res = await axios.post<Employee>('http://localhost:8000/api/employees', data)
      // this.employees = [...this.employees, res.data]
      this.employees.push(res.data)
    },
    async deleteEmployeeMixin(id: number, index: number) {
      const res = await axios.delete(
        `http://localhost:8000/api/employees/${id}`
      )
      this.employees.splice(index, 1)
    }
  }
})
