export class TaskManager {
  constructor() {
    this.tasks = []
    this.finishedTasks = []
  }

  addTask(obj) {
    this.tasks.push(obj)
  }

  removeTask() {
    this.tasks.pop()
  }

  finishTask() {
    const element = this.tasks.pop()
    this.finishedTasks.push(element)
    console.log(this.finishedTasks)
  }

  getFinishedTask() {
    return this.finishedTasks
  }
}

export class Inbox extends TaskManager {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }
}

export class Project extends TaskManager {
  constructor() {
    super()
    this.projectArray = []
  }

  addProject() {
    this.projectArray.push([])
    console.log(this.projectArray)
  }

  addTodoToProject(index) {
    if (index >= 0 && index < this.projectArray.length) {
      this.projectArray[index].push([])
      console.log(this.projectArray)
    }
  }

  // eslint-disable-next-line consistent-return
  getProject(index) {
    if (index >= 0 && index < this.projectArray.length) {
      return this.projectArray[index]
    }
  }

  // eslint-disable-next-line consistent-return
  getTaskToProject(indexOfProject, indexOfTodo) {
    if (
      indexOfProject >= 0 &&
      indexOfProject < this.projectArray.length &&
      indexOfTodo >= 0 &&
      indexOfTodo < this.projectArray[indexOfProject].length
    ) {
      return this.projectArray[indexOfProject][indexOfTodo]
    }
  }

  addTaskToProject(indexOfProject, indexOfTodo, object) {
    if (
      indexOfProject >= 0 &&
      indexOfProject < this.projectArray.length &&
      indexOfTodo >= 0 &&
      indexOfTodo < this.projectArray[indexOfProject].length
    ) {
      this.projectArray[indexOfProject][indexOfTodo].push(object)
    }
  }

  finishProjectTask(indexOfProject, indexOfTodo) {
    if (
      indexOfProject >= 0 &&
      indexOfProject < this.projectArray.length &&
      indexOfTodo >= 0 &&
      indexOfTodo < this.projectArray[indexOfProject].length
    ) {
      const element = this.projectArray[indexOfProject][indexOfTodo].pop()
      this.finishedTasks.push(element)
      console.log(this.finishedTasks)
    }
  }

  getFinishedProjectTask() {
    return this.finishedTasks
  }

  removeProject() {
    this.projectArray.pop()
  }

  removeTaskFromProject(indexOfProject, indexOfTodo) {
    if (
      indexOfProject >= 0 &&
      indexOfProject < this.projectArray.length &&
      indexOfTodo >= 0 &&
      indexOfTodo < this.projectArray[indexOfProject].length
    ) {
      this.projectArray[indexOfProject][indexOfTodo].pop()
    }
  }
}

export const inboxStorage = (() => {
  const inbox = new Inbox()

  return {
    addTask: (task) => inbox.addTask(task),
    getTasks: () => inbox.tasks,
    removeTask: () => inbox.removeTask(),
    finishTask: () => inbox.finishTask(),
    getFinishedTask: () => inbox.getFinishedTask(),
  }
})()

export const projectStorage = (() => {
  const project = new Project()

  return {
    addProject: () => project.addProject(),
    addTodoToProject: (index) => project.addTodoToProject(index),
    addTaskToProject: (indexOfProject, indexOfTodo, object) =>
      project.addTaskToProject(indexOfProject, indexOfTodo, object),
    removeTask: () => project.removeTask(),
    finishProjectTask: (indexOfProject, indexOfTodo) =>
      project.finishProjectTask(indexOfProject, indexOfTodo),
    getFinishedProjectTask: () => project.getFinishedProjectTask(),
    removeTaskFromProject: (indexOfProject, indexOfTodo) =>
      project.removeTaskFromProject(indexOfProject, indexOfTodo),
    getProject: (index) => project.getProject(index),
    getTaskToProject: (indexOfProject, indexOfTodo) =>
      project.getTaskToProject(indexOfProject, indexOfTodo),
  }
})()
