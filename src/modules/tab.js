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
    this.projectArray = []
  }

  addProject () {
    this.projectArray.push([])
  }

  addTaskToProject (index, object) {
    if (index >= 0 && index < this.projectArray.length) {
      this.projectArray[index].push(object)
    }
  }

  removeProject () {
    this.projectArray.pop()
  }

  removeTaskFromProject (index) {
    if (index >= 0 && index < this.projectArray.length) {
      this.projectArray[index].pop()
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
    addTaskToProject: (index, object) => project.addTaskToProject(index, object),
    removeTask: () => project.removeTask(),
    finishTask: () => project.finishTask(),
    removeTaskFromProject: (index) => project.removeTaskFromProject(index)
  }
})()
