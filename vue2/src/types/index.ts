export  type Employee =  {
  id: number,
  name: string ,
  country: string ,
  salary: number,
  email: string,
  age: number,
  updated_at: Date
}

export type CurrentEmployeeNameAndEmail =  {
  currentEmployeeEmail: string
  currentEmployName: string
}