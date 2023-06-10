export class Inbox {
  constructor () {
    this.task = []
    this.finished = []
  }

  addTask (obj) {
    this.task.push(obj)
  }

  removeTask () {
    this.task.pop()
  }

  finishTask () {
    const element = this.task.pop()
    this.finished.push(element)
  }
}

export class Project {
  constructor () {
    this._projectArray = []
    this._finished = []
  }

  addProjects () {
    this._projectArray.push([])
  }

  addTaskToProject (index, object) {
    if (index >= 0 && index < this._projectArray.length) {
      this._projectArray[index].push(object)
    }
  }

  removeProject () {
    this._projectArray.pop()
  }

  removeTaskFromProject (index, object) {
    if (index >= 0 && index < this._projectArray.length) {
      this._projectArray[index].pop(object)
    }
  }

  finishTask () {
    const element = this.task.pop()
    this.finished.push(element)
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

  return {
    addProject: function (task) {
      projectStorage.addProject(task)
    },
    addTaskToProject (index, object) {
      projectStorage.addTaskToProject(index, object)
    },

    removeTask: function () {
      projectStorage.removeTask()
    },
    finishTask: function () {
      projectStorage.finishTask()
    },
    removeTaskFromProject (index, object) {
      projectStorage.removeTaskFromProject(index, object)
    }
  }
})()
