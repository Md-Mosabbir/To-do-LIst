/* eslint-disable no-plusplus */

/* eslint-disable consistent-return */

export class TaskManager {
  constructor() {
    this.tasks = []
    this.finishedTasks = []
  }

  addList(obj) {
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

export class Project {
  constructor() {
    this.projectArray = []
    this.finishedTasks = []
  }

  addProject(projectName) {
    const newList = { name: projectName, task: [] }
    this.projectArray.push(newList)
    this.finishedTasks.push([])
  }

  addList(index, listName) {
    if (index >= 0 && index < this.projectArray.length) {
      const list = this.projectArray[index]
      list.task.push({ name: listName, todos: [] })
    }
  }

  addTodoToList(indexOfProject, indexOfTodo, object) {
    if (
      indexOfProject >= 0 &&
      indexOfProject < this.projectArray.length &&
      indexOfTodo >= 0 &&
      indexOfTodo < this.projectArray[indexOfProject].task.length
    ) {
      const list = this.projectArray[indexOfProject]
      const todo = list.task[indexOfTodo]
      todo.todos.push(object)
    }
  }

  getAllProject() {
    return this.projectArray
  }

  getProject(index) {
    if (index >= 0 && index < this.projectArray.length) {
      return this.projectArray[index].task
    }
  }

  getList(indexOfProject, indexOfTodo) {
    if (
      indexOfProject >= 0 &&
      indexOfProject < this.projectArray.length &&
      indexOfTodo >= 0 &&
      indexOfTodo < this.projectArray[indexOfProject].task.length
    ) {
      return this.projectArray[indexOfProject].task[indexOfTodo].todos
    }
  }

  getFinishedList(index) {
    return this.finishedTasks[index]
  }

  finishProjectTodo(listIndex, taskIndex, objectIndex, indexOfListOfFinished) {
    if (listIndex >= 0 && listIndex < this.projectArray.length) {
      const list = this.projectArray[listIndex].task
      if (taskIndex >= 0 && taskIndex < list.length) {
        const task = list[taskIndex]
        if (objectIndex >= 0 && objectIndex < task.todos.length) {
          const finishedObject = task.todos.splice(objectIndex, 1)[0]
          this.finishedTasks[indexOfListOfFinished].push(finishedObject)
        }
      }
    }
  }

  removeProject(projectIndex) {
    if (projectIndex >= 0 && projectIndex < this.projectArray.length) {
      this.projectArray.splice(projectIndex, 1)
      this.finishedTasks.splice(projectIndex, 1)
    }
  }

  removeList(projectIndex, listIndex) {
    if (projectIndex >= 0 && projectIndex < this.projectArray.length) {
      const list = this.projectArray[projectIndex].task
      if (listIndex >= 0 && listIndex < list.length) {
        list.splice(listIndex, 1)
      }
    }
  }

  removeTodoFromList(projectIndex, taskIndex, objectIndex) {
    if (projectIndex >= 0 && projectIndex < this.projectArray.length) {
      const list = this.projectArray[projectIndex].task
      if (taskIndex >= 0 && taskIndex < list.length) {
        const task = list[taskIndex].todos
        if (objectIndex >= 0 && objectIndex < task.length) {
          task.splice(objectIndex, 1)
        }
      }
    }
  }

  removeFinishedList(index) {
    this.finishedTasks[index].splice(0, this.finishedTasks.length)
  }
}
export const inboxStorage = (() => {
  const inbox = new Inbox()

  // Check if the inboxStorage data exists in local storage
  const storedData = localStorage.getItem('inboxStorage')
  if (storedData) {
    // If the data exists, parse and assign it to the inbox tasks and finishedTasks
    const parsedData = JSON.parse(storedData)
    inbox.tasks = parsedData.tasks
    inbox.finishedTasks = parsedData.finishedTasks
  }

  // Save the inboxStorage data in local storage whenever it is modified
  const saveData = () => {
    const data = JSON.stringify({
      tasks: inbox.tasks,
      finishedTasks: inbox.finishedTasks,
    })
    localStorage.setItem('inboxStorage', data)
  }

  return {
    addList: (task) => {
      inbox.addList(task)
      saveData()
    },
    getTasks: () => inbox.tasks,
    removeTask: (taskIndex) => {
      inbox.removeTask(taskIndex)
      saveData()
    },
    finishTask: (taskIndex) => {
      inbox.finishTask(taskIndex)
      saveData()
    },
    getFinishedTask: () => inbox.finishedTasks,
    removeFinishTask: () => {
      inbox.removeFinishTask()
      saveData()
    },
  }
})()

export const projectStorage = (() => {
  const project = new Project()

  const saveData = () => {
    const data = JSON.stringify(project)
    localStorage.setItem('projectStorage', data)
  }

  const data = localStorage.getItem('projectStorage')
  if (data) {
    const parsedData = JSON.parse(data)
    Object.assign(project, parsedData)
  }

  return {
    addProject: (projectName) => {
      project.addProject(projectName)
      saveData()
    },
    addList: (index, taskName) => {
      project.addList(index, taskName)
      saveData()
    },
    addTodoToList: (indexOfProject, indexOfTodo, object) => {
      project.addTodoToList(indexOfProject, indexOfTodo, object)
      saveData()
    },
    getAllProject: () => project.getAllProject(),
    getProject: (index) => project.getProject(index),
    getList: (indexOfProject, indexOfTodo) =>
      project.getList(indexOfProject, indexOfTodo),
    getFinishedList: (index) => project.getFinishedList(index),
    finishProjectTodo: (
      listIndex,
      taskIndex,
      objectIndex,
      indexOfListOfFinished
    ) => {
      project.finishProjectTodo(
        listIndex,
        taskIndex,
        objectIndex,
        indexOfListOfFinished
      )
      saveData()
    },
    removeProject: (listIndex) => {
      project.removeProject(listIndex)
      saveData()
    },
    removeList: (listIndex, taskIndex) => {
      project.removeList(listIndex, taskIndex)
      saveData()
    },
    removeTodoFromList: (listIndex, taskIndex, objectIndex) => {
      project.removeTodoFromList(listIndex, taskIndex, objectIndex)
      saveData()
    },
    removeFinishedList: (index) => {
      project.removeFinishedList(index)
      saveData()
    },
  }
})()
