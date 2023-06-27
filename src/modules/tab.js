/* eslint-disable import/no-cycle */
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
    this.finishedTasks = []
  }

  addList() {
    this.projectArray.push([])
    this.finishedTasks.push([])
  }

  addTask(index) {
    if (index >= 0 && index < this.projectArray.length) {
      this.projectArray[index].push([])
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

  // eslint-disable-next-line consistent-return
  getList(index) {
    if (index >= 0 && index < this.projectArray.length) {
      return this.projectArray[index]
    }
  }

  // eslint-disable-next-line consistent-return
  getTaskOfList(indexOfProject, indexOfTodo) {
    if (
      indexOfProject >= 0 &&
      indexOfProject < this.projectArray.length &&
      indexOfTodo >= 0 &&
      indexOfTodo < this.projectArray[indexOfProject].length
    ) {
      return this.projectArray[indexOfProject][indexOfTodo]
    }
  }

  getFinsihedList(index) {
    return this.finishedTasks[index]
  }

  finishProjectTodo(listIndex, taskIndex, objectIndex, indexOfListOfFinsihed) {
    if (listIndex >= 0 && listIndex < this.projectArray.length) {
      const list = this.projectArray[listIndex]
      if (taskIndex >= 0 && taskIndex < list.length) {
        const task = list[taskIndex]
        if (objectIndex >= 0 && objectIndex < task.length) {
          const finishedObject = task.splice(objectIndex, 1)[0]
          this.finishedTasks[indexOfListOfFinsihed].push(finishedObject)
        }
      }
    }
  }

  removeList(listIndex) {
    if (listIndex >= 0 && listIndex < this.projectArray.length) {
      this.projectArray.splice(listIndex, 1)
      this.finishedTasks.splice(listIndex, 1)
    }
  }

  removeTaskOfList(listIndex, taskIndex) {
    if (listIndex >= 0 && listIndex < this.projectArray.length) {
      const list = this.projectArray[listIndex]
      if (taskIndex >= 0 && taskIndex < list.length) {
        list.splice(taskIndex, 1)
      }
    }
  }

  removeTodoFromList(listIndex, taskIndex, objectIndex) {
    if (listIndex >= 0 && listIndex < this.projectArray.length) {
      const list = this.projectArray[listIndex]
      if (taskIndex >= 0 && taskIndex < list.length) {
        const task = list[taskIndex]
        if (objectIndex >= 0 && objectIndex < task.length) {
          task.splice(objectIndex, 1)
        }
      }
    }
  }

  removeFinsihedList(index) {
    this.finishedTasks[index].splice(0, this.finishedTasks.length)
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
    addList: () => project.addList(),
    addTask: (index) => project.addTask(index),
    addTodoToList: (indexOfProject, indexOfTodo, object) =>
      project.addTodoToList(indexOfProject, indexOfTodo, object),
    removeList: (listIndex) => project.removeList(listIndex),
    finishProjectTodo: (
      listIndex,
      taskIndex,
      objectIndex,
      indexOfListOfFinsihed
    ) =>
      project.finishProjectTodo(
        listIndex,
        taskIndex,
        objectIndex,
        indexOfListOfFinsihed
      ),
    getFinsihedList: (index) => project.getFinsihedList(index),
    removeTodoFromList: (listIndex, taskIndex, objectIndex) =>
      project.removeTodoFromList(listIndex, taskIndex, objectIndex),
    getList: (index) => project.getList(index),
    getTaskOfList: (indexOfProject, indexOfTodo) =>
      project.getTaskOfList(indexOfProject, indexOfTodo),
    removeTaskOfList: (listIndex, taskIndex) =>
      project.removeTaskOfList(listIndex, taskIndex),
    removeFinsihedList: (index) => {
      project.removeFinsihedList(index)
    },
  }
})()
