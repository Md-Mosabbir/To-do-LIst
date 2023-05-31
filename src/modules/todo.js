// creates To-do

export default class Todo {
  constructor (name, description, dueDate, priority, status = 'unfinished') {
    this.name = name
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.status = status
  }

  getDateFormatted () {
    const day = this.dueDate.split('/')[0]
    const month = this.dueDate.split('/')[1]
    const year = this.dueDate.split('/')[2]
    return `${month}/${day}/${year}`
  }
}
