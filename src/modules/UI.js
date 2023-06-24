/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-new */
/* eslint-disable import/no-cycle */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
// Create the input filed and display task

import { isBefore, startOfDay, parseISO, isSameDay, isAfter } from 'date-fns'
import Todo from './todo'
import { trackingActiveClass } from './tab-management'
import { inboxStorage, projectStorage } from './tab'
import { addingButton } from '..'

export class CreateTaskInput {
  constructor() {
    this.containerDiv = document.createElement('div')
    this.containerDiv.classList.add('input-div')
    this.createCheckbox()
    this.createName()
    this.createDescription()
    this.createDueDate()
    this.createPriority()
    this.submitButton()
    this.cancelButton()

    document.querySelector('.task').appendChild(this.containerDiv)
  }

  createCheckbox() {
    this.checkbox = document.createElement('input')
    this.checkbox.type = 'checkbox'
    this.checkbox.name = 'checkbox'
    this.checkbox.style.display = 'none'
    this.containerDiv.appendChild(this.checkbox)

    return this.checkbox
  }

  createName() {
    this.inputFieldName = document.createElement('input')
    this.inputFieldName.type = 'text'
    this.inputFieldName.placeholder = 'name'
    this.inputFieldName.name = 'name'
    this.inputFieldName.id = 'name'
    this.containerDiv.appendChild(this.inputFieldName)
    return this.inputFieldName
  }

  createDescription() {
    this.inputFieldDesc = document.createElement('input')
    this.inputFieldDesc.type = 'text'
    this.inputFieldDesc.placeholder = 'description'
    this.inputFieldDesc.name = 'description'
    this.inputFieldDesc.id = 'description'
    this.containerDiv.appendChild(this.inputFieldDesc)
    return this.inputFieldDesc
  }

  createDueDate() {
    this.inputDate = document.createElement('input')
    this.inputDate.type = 'date'
    this.inputDate.id = 'DueDate'
    this.containerDiv.appendChild(this.inputDate)
    return this.inputDate
  }

  createPriority() {
    this.dropDown = document.createElement('select')
    this.dropDown.setAttribute('id', 'priorityDropdown')

    this.options = ['Low', 'Medium', 'High']

    for (let index = 0; index < this.options.length; index++) {
      const option = document.createElement('option')
      option.textContent = this.options[index]
      this.dropDown.appendChild(option)
    }
    this.containerDiv.appendChild(this.dropDown)
    return this.dropDown
  }

  submitButton() {
    this.submit = document.createElement('button')
    this.submit.id = 'submit'
    this.submit.textContent = 'Submit'
    this.submit.addEventListener('click', () => this.handleSubmit()) // later
    this.containerDiv.appendChild(this.submit)

    return this.submit
  }

  cancelButton() {
    this.cancel = document.createElement('button')
    this.cancel.id = 'cancel'
    this.cancel.textContent = 'Cancel'
    this.cancel.addEventListener('click', () => {
      this.removeContainer()
    })
    this.containerDiv.appendChild(this.cancel)

    return this.cancel
  }

  removeContainer() {
    this.containerDiv.remove()
    addingButton.style.display = 'block'
  }

  getValue(id) {
    return id.value
  }

  getInputFiledsFilled(date) {
    const getToday = startOfDay(new Date())
    if (
      this.getValue(this.inputFieldName) !== '' &&
      this.getValue(this.inputDate) !== '' &&
      isBefore(parseISO(date), getToday) === false
    ) {
      return true
    }
  }

  displayTask(task) {
    // eslint-disable-next-line no-unused-vars
    const display = new DisplayTask(task)
  }

  handleSubmit() {
    // check active class holder

    // add accordingly
    if (trackingActiveClass.inboxContainingActive()) {
      if (this.getInputFiledsFilled(this.getValue(this.inputDate))) {
        const name = this.getValue(this.inputFieldName)
        const description = this.getValue(this.inputFieldDesc)
        const dueDate = this.getValue(this.inputDate)
        const priority = this.getValue(this.dropDown)
        const status = this.checkbox.checked

        const _task = new Todo(name, description, dueDate, priority, status)
        inboxStorage.addTask(_task)

        this.displayTask(inboxStorage.getTasks())

        this.containerDiv.style.display = 'none'
        addingButton.style.display = 'block'
      }
    } else if (trackingActiveClass.projectContainingActive()) {
      if (this.getInputFiledsFilled(this.getValue(this.inputDate))) {
        const name = this.getValue(this.inputFieldName)
        const description = this.getValue(this.inputFieldDesc)
        const dueDate = this.getValue(this.inputDate)
        const priority = this.getValue(this.dropDown)
        const status = this.checkbox.checked

        const _task = new Todo(name, description, dueDate, priority, status)
        // ------------sdfadsffa-----
        projectStorage.addTaskToProject(
          trackingActiveClass.getIndexOfActiveTodo(),
          trackingActiveClass.getButtonIndex(),
          _task
        )
        this.displayTask(
          projectStorage.getTaskToProject(
            trackingActiveClass.getIndexOfActiveTodo(),
            trackingActiveClass.getButtonIndex()
          )
        )

        this.containerDiv.style.display = 'none'
        addingButton.style.display = 'block'
      }
    }
  }
}

// ----

export class DisplayTask {
  constructor(tasks) {
    this.tasks = tasks

    const container = document.querySelector('.task') // Assuming you have a <div> element with id 'task-container' in your HTML file.

    // Clear the container before displaying the tasks
    container.innerHTML = ''

    this.tasks.forEach((task) => {
      const card = document.createElement('div')
      card.classList.add('task-card')

      this.statusElement = document.createElement('input')
      this.statusElement.setAttribute('type', 'checkbox')
      this.statusElement.checked = task.status
      this.statusElement.addEventListener('click', () => {
        task.status = true
        if (trackingActiveClass.inboxContainingActive()) {
          inboxStorage.finishTask()
        } else if (trackingActiveClass.projectContainingActive()) {
          projectStorage.finishProjectTask(
            trackingActiveClass.getIndexOfActiveTodo(),
            trackingActiveClass.getButtonIndex()
          )
        }
        card.remove()
      })

      this.priorityElement = document.createElement('div')
      this.priorityElement.classList.add('task-priority')
      this.priorityElement.classList.add(task.priority.toLowerCase())

      this.nameElement = document.createElement('h3')
      this.nameElement.classList.add('task-name')
      this.nameElement.textContent = task.name

      this.descriptionElement = document.createElement('p')
      this.descriptionElement.classList.add('task-description')
      this.descriptionElement.textContent = task.description

      this.dueDateElement = document.createElement('p')
      this.dueDateElement.classList.add('task-due-date')
      this.dueDateElement.textContent = `Due Date: ${task.dueDate}`

      this.deleteElement = document.createElement('button')
      this.deleteElement.classList.add('task-delete')
      this.deleteElement.textContent = 'X'

      this.deleteElement.addEventListener('click', () => {
        if (trackingActiveClass.inboxContainingActive()) {
          inboxStorage.removeTask()
        } else if (trackingActiveClass.projectContainingActive()) {
          projectStorage.removeTaskFromProject(
            trackingActiveClass.getIndexOfActiveTodo(),
            trackingActiveClass.getButtonIndex()
          )
        }

        card.remove()
      })

      if (task.status === false) {
        card.appendChild(this.statusElement)
        card.appendChild(this.deleteElement)
      } else if (
        task.status === true &&
        (isSameDay(parseISO(task.dueDate), startOfDay(new Date())) ||
          isBefore(startOfDay(new Date()), parseISO(task.dueDate)))
      ) {
        card.style.backgroundColor = 'green'
        card.appendChild(this.statusElement)
      } else if (
        task.status === true &&
        isAfter(startOfDay(new Date()), parseISO(task.dueDate))
      ) {
        card.style.backgroundColor = 'red'
        card.appendChild(this.statusElement)
      }
      card.appendChild(this.priorityElement)
      card.appendChild(this.nameElement)
      card.appendChild(this.descriptionElement)
      card.appendChild(this.dueDateElement)
      if (task.status === false) {
        card.appendChild(this.deleteElement)
      }

      container.appendChild(card)
    })
  }
}
