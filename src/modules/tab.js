class TaskManager {
  constructor () {
    this.tasks = []
    this.finishedTasks = []
  }

  addTask (obj) {
    this.tasks.push(obj)
  }

  removeTask () {
    this.tasks.pop()
  }

  finishTask () {
    const element = this.tasks.pop()
    this.finishedTasks.push(element)
  }
}

export class Inbox extends TaskManager {
  // eslint-disable-next-line no-useless-constructor
  constructor () {
    super()
  }
}

export class Project extends TaskManager {
  constructor () {
    super()
    this.projectArray = [[[], [], []], [[], [], []], [[], [], []]]
  }

  addProject () {
    this.projectArray.push([])
  }

  getProject (index) {
    if (index >= 0 && index < this.projectArray.length) {
      return this.projectArray[index]
    }
  }

  getTaskToProject (indexOfProject, indexOfTodo) {
    if (
      indexOfProject >= 0 &&
      indexOfProject < this.projectArray.length &&
      indexOfTodo >= 0 &&
      indexOfTodo < this.projectArray[indexOfProject].length
    ) {
      return this.projectArray[indexOfProject][indexOfTodo]
    }
  }

  addTaskToProject (indexOfProject, indexOfTodo, object) {
    if (
      indexOfProject >= 0 &&
      indexOfProject < this.projectArray.length &&
      indexOfTodo >= 0 &&
      indexOfTodo < this.projectArray[indexOfProject].length
    ) {
      this.projectArray[indexOfProject][indexOfTodo].push(object)
    }
  }

  removeProject () {
    this.projectArray.pop()
  }

  removeTaskFromProject (indexOfProject, indexOfTodo) {
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
    finishTask: () => inbox.finishTask()
  }
})()

export const projectStorage = (() => {
  const project = new Project()

  return {
    addProject: () => project.addProject(),
    addTaskToProject: (indexOfProject, indexOfTodo, object) =>
      project.addTaskToProject(indexOfProject, indexOfTodo, object),
    removeTask: () => project.removeTask(),
    finishTask: () => project.finishTask(),
    removeTaskFromProject: (indexOfProject, indexOfTodo) =>
      project.removeTaskFromProject(indexOfProject, indexOfTodo),
    getProject: (index) => project.getProject(index),
    getTaskToProject: (indexOfProject, indexOfTodo) =>
      project.getTaskToProject(indexOfProject, indexOfTodo)
  }
})()
