/* eslint-disable consistent-return */
export class TaskManager {
  constructor() {
    this.tasks = []
    this.finishedTasks = []
  }

  addTask(obj) {
    this.tasks.push(obj)
  }

  removeTask(taskIndex) {
    if (taskIndex >= 0 && taskIndex < this.tasks.length) {
      this.tasks.splice(taskIndex, 1)
    }
    console.log(this.tasks)
  }

  finishTask(taskIndex) {
    if (taskIndex >= 0 && taskIndex < this.tasks.length) {
      const finishedTask = this.tasks.splice(taskIndex, 1)[0]
      this.finishedTasks.push(finishedTask)
    }
  }

  removeFinishTask() {
    this.finishedTasks.splice(0, this.finishedTasks.length)
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
  }

  addList(index) {
    if (index >= 0 && index < this.projectArray.length) {
      this.projectArray[index].push([])
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

  addTodoToList(indexOfProject, indexOfTodo, object) {
    if (
      indexOfProject >= 0 &&
      indexOfProject < this.projectArray.length &&
      indexOfTodo >= 0 &&
      indexOfTodo < this.projectArray[indexOfProject].length
    ) {
      this.projectArray[indexOfProject][indexOfTodo].push(object)
    }
  }

  finishProjectTask(listIndex, taskIndex, objectIndex) {
    if (listIndex >= 0 && listIndex < this.project.length) {
      const list = this.projectArray[listIndex]
      if (taskIndex >= 0 && taskIndex < list.length) {
        const task = list[taskIndex]
        if (objectIndex >= 0 && objectIndex < task.length) {
          const finishedObject = task.splice(objectIndex, 1)[0]
          this.finishedProject.push(finishedObject)
        }
      }
    }
  }

  getFinishedProjectTask() {
    return this.finishedTasks
  }

  removeProject() {
    this.projectArray.pop()
  }

  removeTodoOfProject(activeList) {
    if (activeList >= 0 && activeList < this.projectArray.length) {
      this.projectArray[activeList].pop()
      console.log(this.projectArray)
    }
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

  removeFinishProjectTask() {
    this.finishedTasks.splice(0, this.finishedTasks.length)
  }
}

export const inboxStorage = (() => {
  const inbox = new Inbox()

  return {
    addTask: (task) => inbox.addTask(task),
    getTasks: () => inbox.tasks,
    removeTask: (taskIndex) => inbox.removeTask(taskIndex),
    finishTask: (taskIndex) => inbox.finishTask(taskIndex),
    getFinishedTask: () => inbox.finishedTasks,
    removeFinishTask: () => inbox.removeFinishTask(),
  }
})()

export const projectStorage = (() => {
  const project = new Project()

  return {
    addProject: () => project.addProject(),
    addList: (index) => project.addList(index),
    addTodoToList: (indexOfProject, indexOfTodo, object) =>
      project.addTodoToList(indexOfProject, indexOfTodo, object),
    removeProject: () => project.removeProject(),
    finishProjectTask: (listIndex, taskIndex, objectIndex) =>
      project.finishProjectTask(listIndex, taskIndex, objectIndex),
    getFinishedProjectTask: () => project.getFinishedProjectTask(),
    removeTaskFromProject: (indexOfProject, indexOfTodo) =>
      project.removeTaskFromProject(indexOfProject, indexOfTodo),
    getProject: (index) => project.getProject(index),
    getTaskToProject: (indexOfProject, indexOfTodo) =>
      project.getTaskToProject(indexOfProject, indexOfTodo),
    removeTodoOfProject: (activeList) =>
      project.removeTodoOfProject(activeList),
    removeFinishProjectTask: () => {
      project.removeFinishProjectTask()
    },
  }
})()
