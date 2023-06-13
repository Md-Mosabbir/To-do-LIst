/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable no-use-before-define */
/* eslint-disable class-methods-use-this */
import Todo from './todo'
import { inboxStorage, projectStorage } from './tab'

export class UserInterface {
  constructor() {
    this.containerDiv = document.createElement('div')
    this.containerDiv.classList.add('task-of-inbox')

    this.createInput('Name', 'name')
    this.createInput('Description', 'description')
    this.createInput('Due Date', 'dateInput') // will be worked upon later
    this.createPriorityDropdown()
    this.createButton('Submit', this.handleSubmit.bind(this))
    this.createButton('x', this.handleCancel.bind(this))

    const taskDiv = document.querySelector('.task')
    taskDiv.appendChild(this.containerDiv)

    this.submitted = false
  }

  createInput(placeholder, id) {
    const input = document.createElement('input')
    input.type = 'text'
    input.placeholder = placeholder
    input.id = id
    this.containerDiv.appendChild(input)
  }

  createPriorityDropdown() {
    const priorities = ['Low', 'Medium', 'High']
    const selectElement = document.createElement('select')
    selectElement.id = 'dropdown'

    priorities.forEach((priority) => {
      const option = document.createElement('option')
      option.value = priority
      option.textContent = priority
      selectElement.appendChild(option)
    })

    this.containerDiv.appendChild(selectElement)
  }

  createButton(text, clickHandler) {
    const button = document.createElement('button')
    button.textContent = text
    button.addEventListener('click', clickHandler)
    this.containerDiv.appendChild(button)
  }

  handleSubmit() {
    const name = this.getValue('name')
    const description = this.getValue('description')
    const dueDate = this.getValue('dateInput')
    const priority = this.getValue('dropdown')

    if (this.validateForm(name, dueDate)) {
      const task = new Todo(name, description, dueDate, priority)

      if (this.isInboxActive()) {
        this.handleInboxSubmit(task)
      } else if (this.isProjectActive()) {
        this.handleProjectSubmit(task)
      }

      this.submitted = true
    } else {
      this.shakeForm()
    }
  }

  validateForm(name, dueDate) {
    return name !== '' && dueDate !== ''
  }

  isInboxActive() {
    const inboxButton = document.querySelector('.inbox')
    return inboxButton.classList.contains('active')
  }

  handleInboxSubmit(task) {
    inboxStorage.addTask(task)
    inboxManager.updateNumberOfInboxNotification()
    this.displayTaskDetails(task)
    this.hideInputForm()
  }

  isProjectActive() {
    const activeClassHolder = activeClass.checkForActiveClassHolder()
    return activeClassHolder !== 'inbox' && activeClassHolder.type === 'project'
  }

  handleProjectSubmit(task) {
    const { indexOfProject, indexOfTask } =
      activeClass.checkForActiveClassHolder()
    projectStorage.addTaskToProject(indexOfProject, indexOfTask, task)
    this.displayTaskDetails(task)
    this.hideInputForm()
  }

  shakeForm() {
    this.containerDiv.classList.add('shake')
    setTimeout(() => {
      this.containerDiv.classList.remove('shake')
    }, 420)
  }

  getValue(id) {
    const input = document.getElementById(id)
    return input.value
  }

  displayTaskDetails(task) {
    inboxContainer.displayBlock()
    // eslint-disable-next-line no-unused-vars
    const displayTask = new DisplayTask(task)
  }

  hideInputForm() {
    this.containerDiv.style.display = 'none'
  }

  handleCancel() {
    if (this.submitted) {
      inboxStorage.removeTask()
      inboxManager.updateNumberOfInboxNotification()
    }

    this.containerDiv.remove()
    inboxContainer.displayBlock()
  }
}

export class DisplayTask {
  constructor(task) {
    this.task = task
    this.taskElement = this.createTaskElement()
    this.checkbox = this.createCheckbox()
    this.priority = this.createPriorityIndicator()
    this.name = this.createName()
    this.description = this.createDescription()
    this.dueDate = this.createDueDate()
    this.cancelButton = this.createCancelButton()
    this.appendElements()
  }

  createTaskElement() {
    const taskElement = document.createElement('div')
    taskElement.classList.add('task-card')
    return taskElement
  }

  createName() {
    const name = document.createElement('div')
    name.classList.add('name')
    name.textContent = this.task.name
    return name
  }

  createCheckbox() {
    const checkbox = document.createElement('input')

    checkbox.type = 'checkbox'
    checkbox.classList.add('checkbox')
    return checkbox
  }

  createPriorityIndicator() {
    const priority = document.createElement('div')
    priority.classList.add('priority')
    priority.classList.add(this.task.priority.toLowerCase())
    return priority
  }

  createDescription() {
    const description = document.createElement('div')
    description.classList.add('description')
    description.textContent = this.task.description
    return description
  }

  createDueDate() {
    const dueDate = document.createElement('div')
    dueDate.classList.add('due-date')
    dueDate.textContent = this.task.dueDate
    return dueDate
  }

  createCancelButton() {
    const cancelButton = document.createElement('button')
    cancelButton.textContent = 'x'
    cancelButton.classList.add('cancel-button')
    cancelButton.addEventListener('click', this.handleCancel.bind(this))
    return cancelButton
  }

  appendElements() {
    this.taskElement.appendChild(this.checkbox)
    this.taskElement.appendChild(this.priority)
    this.taskElement.appendChild(this.name)
    this.taskElement.appendChild(this.description)
    this.taskElement.appendChild(this.dueDate)
    this.taskElement.appendChild(this.cancelButton)

    const taskDiv = document.querySelector('.task')
    taskDiv.appendChild(this.taskElement)
  }

  handleCancel() {
    // Handle cancel action here
    // ...
  }
}

export const inboxContainer = (function () {
  const addingTaskButton = document.getElementById('adding-button')

  addingTaskButton.addEventListener('click', () => {
    // eslint-disable-next-line no-unused-vars
    const ui = new UserInterface()
    addingTaskButton.style.display = 'none'
  })

  return {
    displayBlock() {
      addingTaskButton.style.display = 'block'
    },
    displayNone() {
      addingTaskButton.style.display = 'none'
    },
  }
})()

export const inboxManager = (function () {
  const inboxButton = document.querySelector('.inbox')
  function displayTaskDetails(task) {
    inboxContainer.displayBlock()
    const taskElement = document.createElement('div')
    taskElement.classList.add('task-details')

    const taskDetails = [
      { label: 'Name', value: task.name },
      { label: 'Description', value: task.description },
      { label: 'Due Date', value: task.dueDate },
      { label: 'Priority', value: task.priority },
    ]

    taskDetails.forEach((detail) => {
      const detailElement = document.createElement('div')
      detailElement.textContent = `${detail.label}: ${detail.value}`
      taskElement.appendChild(detailElement)
    })

    const taskDiv = document.querySelector('.task')
    taskDiv.appendChild(taskElement)
  }

  inboxButton.addEventListener('click', () => {
    const taskContainer = document.querySelector('.task')

    const allButtonsOfNav = document.querySelectorAll('.set-active')
    allButtonsOfNav.forEach((itm) => {
      itm.classList.remove('active')
    })
    if (!inboxButton.classList.contains('active')) {
      inboxButton.classList.add('active')
      taskContainer.innerHTML = ''
      inboxStorage.getTasks().forEach((task) => {
        // eslint-disable-next-line no-new
        new DisplayTask(task)
      })
    }
  })

  return {
    updateNumberOfInboxNotification () {
      const inboxTaskNumber = document.querySelector('.notification-number')
      const taskCount = inboxStorage.getTasks().length
      inboxTaskNumber.textContent = taskCount === 0 ? '' : taskCount
    },
  }
})()

export const activeClass = (function () {
  const allButtonsOfNav = document.querySelectorAll('.set-active')
  const listOfAllProjectTask = document.querySelectorAll('.task-of-proj')

  function displayTaskDetails(task) {
    inboxContainer.displayBlock()
    const taskElement = document.createElement('div')
    taskElement.classList.add('task-details')

    const taskDetails = [
      { label: 'Name', value: task.name },
      { label: 'Description', value: task.description },
      { label: 'Due Date', value: task.dueDate },
      { label: 'Priority', value: task.priority },
    ]

    taskDetails.forEach((detail) => {
      const detailElement = document.createElement('div')
      detailElement.textContent = `${detail.label}: ${detail.value}`
      taskElement.appendChild(detailElement)
    })

    const taskDiv = document.querySelector('.task')
    taskDiv.appendChild(taskElement)
  }

  for (let i = 0; i < listOfAllProjectTask.length; i++) {
    listOfAllProjectTask[i].addEventListener('click', handleClick)
  }

  function handleClick(e) {
    if (!e.target.classList.contains('active')) {
      for (let i = 0; i < allButtonsOfNav.length; i++) {
        allButtonsOfNav[i].classList.remove('active')
      }
      const clickedButton = e.target
      clickedButton.classList.add('active')
      const task = projectStorage.getTaskToProject(
        activeClass.findActiveListIndex(),
        activeClass.findActiveTaskIndexInList()
      )
      const taskContainer = document.querySelector('.task')
      taskContainer.innerHTML = ''
      task.forEach((itm) => {
        // eslint-disable-next-line no-new
        new DisplayTask(itm)
      })
    }
  }

  return {
    checkForActiveClassHolder () {
      let isActive = false

      listOfAllProjectTask.forEach((item) => {
        if (item.classList.contains('active')) {
          isActive = true
        }
      })

      return isActive
    },
    // eslint-disable-next-line consistent-return
    getIndexofProject () {
      for (let i = 0; i < listOfAllProjectTask.length; i++) {
        if (listOfAllProjectTask[i].classList.contains('active')) {
          return i
        }
      }
    },
    findActiveListIndex () {
      const lists = document.getElementsByClassName('list')

      for (let i = 0; i < lists.length; i++) {
        const list = lists[i]
        const tasks = list.getElementsByClassName('task-of-proj')

        for (let j = 0; j < tasks.length; j++) {
          const task = tasks[j]

          if (task.classList.contains('active')) {
            return i // Return the index of the parent list
          }
        }
      }

      return -1 // Return -1 if no active task is found
    },
    findActiveTaskIndexInList () {
      const lists = document.getElementsByClassName('list')

      for (let i = 0; i < lists.length; i++) {
        const list = lists[i]
        const tasks = list.getElementsByClassName('task-of-proj')

        for (let j = 0; j < tasks.length; j++) {
          const task = tasks[j]

          if (task.classList.contains('active')) {
            return j // Return the index of the active task within the list
          }
        }
      }

      return -1 // Return -1 if no active task is found
    },
  }
})()
