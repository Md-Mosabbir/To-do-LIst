export class Inbox {
  constructor () {
    this.task = []
    this.finished = []
  }

  addTask (obj) {
    this.task.push(obj)
    console.log(this.task)
  }

  removeTask () {
    this.task.pop()
  }

  finishTask () {
    const element = this.task.pop()
    this.finished.push(element)
    console.log(this.finished)
  }
}

export class Project {
  constructor () {
    this._projectArray = []
    this._finished = []
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
    },
    finishTask: function () {
      inboxArray.finishTask()
    }
  }
})()

export const projectStorage = (function () {
  // eslint-disable-next-line no-unused-vars
  const projectArray = new Project()

  return {}
})()
