// creates To-do

export default class Todo {
  constructor(name, description, dueDate, priority, status = 'unfinished') {
    this.name = name
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.status = status
  }

}
