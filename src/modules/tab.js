export class Inbox {
  constructor () {
    this.task = []
  }

  addTask (obj) {
    this.task.push(obj)
    console.log(this.task)
  }

  removeTask () {
    this.task.splice(0, 1)
  }
}

export class Project {
  constructor () {
    this._projectArray = []
  }

  addingProjects () {
    const _projects = []
    this._projectArray.push(_projects)
    return _projects
  }

  addingTask (_projects, obj) {
    _projects.push(obj)
  }
}

export const inboxStorage = (function () {
  const inboxArray = new Inbox()

  return {
    addTask: function (task) {
      inboxArray.addTask(task)
    },
    getTask: function () {
      return inboxArray.task
    },
    removeTask: function () {
      inboxArray.removeTask()
      console.log(inboxArray)
    }
  }
})()
