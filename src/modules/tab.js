export class Tabs {
  static _array = []

  static addTask (obj) {
    this._array.push(obj)

    console.log(this._array)
  }
}

export class Project {
  static _projectArray = []

  static addingProjects () {
    const _projects = []
    this._projectArray.push(_projects)
    return _projects
  }

  static addingTask (_projects, obj) {
    _projects.push(obj)
  }
}
