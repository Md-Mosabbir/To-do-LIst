/* eslint-disable prefer-destructuring */
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
    // add accordingly
    if (trackingActiveClass.inboxContainingActive()) {
      if (this.getInputFiledsFilled(this.getValue(this.inputDate))) {
        const name = this.getValue(this.inputFieldName)
        const description = this.getValue(this.inputFieldDesc)
        const dueDate = this.getValue(this.inputDate)
        const priority = this.getValue(this.dropDown)
        const status = this.checkbox.checked

        const _task = new Todo(name, description, dueDate, priority, status)
        inboxStorage.addList(_task)

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
        projectStorage.addTodoToList(
          trackingActiveClass.getIndexOfActiveTodo(),
          trackingActiveClass.getButtonIndex(),
          _task
        )
        this.displayTask(
          projectStorage.getList(
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

    const container = document.querySelector('.task')

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
          inboxStorage.finishTask(trackingActiveClass.getTask(card))
        } else if (trackingActiveClass.projectContainingActive()) {
          projectStorage.finishProjectTodo(
            trackingActiveClass.getIndexOfActiveTodo(),
            trackingActiveClass.getButtonIndex(),
            trackingActiveClass.getTask(card),
            trackingActiveClass.getIndexOfActiveTodo()
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
      this.deleteElement.innerHTML =
        '<i class="fa-solid fa-xmark" style="color: #fff"></i>'

      this.deleteElement.addEventListener('click', () => {
        if (trackingActiveClass.inboxContainingActive()) {
          inboxStorage.removeTask(trackingActiveClass.getTask(card))
        } else if (trackingActiveClass.projectContainingActive()) {
          projectStorage.removeTodoFromList(
            trackingActiveClass.getIndexOfActiveTodo(),
            trackingActiveClass.getButtonIndex(),
            trackingActiveClass.getTask(card)
          )
        }

        card.remove()
      })

      this.editElement = document.createElement('button')
      this.editElement.classList.add('task-edit')
      this.editElement.innerHTML =
        '<i class="fa-solid fa-edit" style="color: #fff"></i>'
      this.editElement.addEventListener('click', () => {
        new EditTask(task, trackingActiveClass.getTask(card))
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
        card.appendChild(this.editElement)
        card.appendChild(this.deleteElement)
      }

      container.appendChild(card)
    })
  }
}

export class EditTask {
  constructor(task, index) {
    this.index = index
    this.task = task

    this.form = document.createElement('div')
    this.form.classList.add('form-container')

    this.nameLabel = document.createElement('label')
    this.nameLabel.textContent = 'Name:'
    this.nameInput = document.createElement('input')
    this.nameInput.type = 'text'
    this.nameInput.value = this.task.name
    this.nameLabel.appendChild(this.nameInput)

    this.descriptionLabel = document.createElement('label')
    this.descriptionLabel.textContent = 'Description:'
    this.descriptionInput = document.createElement('input')
    this.descriptionInput.type = 'text'
    this.descriptionInput.value = this.task.description
    this.descriptionLabel.appendChild(this.descriptionInput)

    this.dueDateLabel = document.createElement('label')
    this.dueDateLabel.textContent = 'Due Date:'
    this.dueDateInput = document.createElement('input')
    this.dueDateInput.type = 'date'
    this.dueDateInput.min = new Date().toISOString().split('T')[0]
    this.dueDateInput.value = this.task.dueDate
    this.dueDateLabel.appendChild(this.dueDateInput)

    this.priorityLabel = document.createElement('label')
    this.priorityLabel.textContent = 'Priority:'
    this.priorityInput = document.createElement('select')
    this.priorityInput.innerHTML = `
    <option value="Low" ${
      this.task.priority === 'Low' ? 'selected' : ''
    }>Low</option>
    <option value="Medium" ${
      this.task.priority === 'Medium' ? 'selected' : ''
    }>Medium</option>
    <option value="High" ${
      this.task.priority === 'High' ? 'selected' : ''
    }>High</option>
    `
    this.priorityLabel.appendChild(this.priorityInput)

    this.submitButton = document.createElement('button')
    this.submitButton.addEventListener('click', this.submitEdit.bind(this))
    this.submitButton.type = 'submit'
    this.submitButton.textContent = 'Submit'

    this.cancelButton = document.createElement('button')
    this.cancelButton.textContent = 'Cancel'
    this.cancelButton.addEventListener('click', () => {
      overlay.setAttribute('style', 'display: none;')
      this.form.remove()
    })

    this.form.appendChild(this.nameLabel)
    this.form.appendChild(this.descriptionLabel)
    this.form.appendChild(this.dueDateLabel)
    this.form.appendChild(this.priorityLabel)
    this.form.appendChild(this.submitButton)
    this.form.appendChild(this.cancelButton)

    document.body.appendChild(this.form)
    const overlay = document.querySelector('.overlay')
    overlay.setAttribute('style', 'display: block;')
  }

  submitEdit() {
    const overlay = document.querySelector('.overlay')
    const newName = this.nameInput.value
    const newDesc = this.descriptionInput.value
    const newDate = this.dueDateInput.value
    const newPriority = this.priorityInput.value

    const _newTask = new Todo(newName, newDesc, newDate, newPriority, false)

    if (trackingActiveClass.inboxContainingActive() && this.checkInput()) {
      inboxStorage.editTask(this.index, _newTask)
      new DisplayTask(inboxStorage.getTasks())
    } else if (
      trackingActiveClass.projectContainingActive() &&
      this.checkInput()
    ) {
      projectStorage.editProjectTodo(
        trackingActiveClass.getIndexOfActiveTodo(),
        trackingActiveClass.getButtonIndex(),
        this.index,
        _newTask
      )
      new DisplayTask(
        projectStorage.getList(
          trackingActiveClass.getIndexOfActiveTodo(),
          trackingActiveClass.getButtonIndex()
        )
      )
    }

    this.form.remove()
    overlay.setAttribute('style', 'display: none;')
  }

  checkInput() {
    if (this.nameInput.value !== '' && this.dueDateInput.value !== '') {
      return true
    }
  }
}
