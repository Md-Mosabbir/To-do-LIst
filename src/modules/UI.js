import Todo from './todo'
import { inboxStorage } from './tab'

export class UserInterface {
  constructor () {
    // Create the container div
    this.containerDiv = document.createElement('div')

    // Create the checkbox container
    this.checkboxContainer = document.createElement('div')
    this.checkboxContainer.classList.add('checkbox-container')
    this.checkboxContainer.style.display = 'none'

    // Create the checkbox input
    this.checkboxInput = document.createElement('input')
    this.checkboxInput.type = 'checkbox'
    this.checkboxInput.id = 'myCheckbox'

    // Create the checkbox label
    this.checkboxLabel = document.createElement('label')
    this.checkboxLabel.htmlFor = 'myCheckbox'

    // Append the checkbox elements to the container
    this.checkboxContainer.appendChild(this.checkboxInput)
    this.checkboxContainer.appendChild(this.checkboxLabel)

    // Create the priority indicator span
    this.priorityIndicatorSpan = document.createElement('span')

    // Create the name input
    this.nameInput = document.createElement('input')
    this.nameInput.type = 'text'
    this.nameInput.placeholder = 'Name'
    this.nameInput.id = 'name'

    // Create the description input
    this.descriptionInput = document.createElement('input')
    this.descriptionInput.type = 'text'
    this.descriptionInput.placeholder = 'Description'
    this.descriptionInput.id = 'description'

    // Create the due date input
    this.dueDateInput = document.createElement('input')
    this.dueDateInput.type = 'text'
    this.dueDateInput.placeholder = 'Due Date'
    this.dueDateInput.id = 'dateInput'

    // Create the priority container
    this.priorityContainer = document.createElement('div')
    this.priorityContainer.id = 'priorityContainer'

    // Create the select element
    this.selectElement = document.createElement('select')
    this.selectElement.id = 'dropdown'

    // Create the priority options
    const priorities = ['Low', 'Medium', 'High']
    priorities.forEach(priority => {
      const option = document.createElement('option')
      option.value = priority
      option.textContent = priority
      this.selectElement.appendChild(option)
    })

    // Append the select element to the priority container
    this.priorityContainer.appendChild(this.selectElement)

    // Create the status input
    this.statusInput = document.createElement('input')
    this.statusInput.type = 'text'

    // Create the submit button
    this.submitButton = document.createElement('button')
    this.submitButton.textContent = 'Submit'

    // Create the delete button
    this.cancelButton = document.createElement('button')
    this.cancelButton.textContent = 'x'

    // Bind the click event listener to the submit button
    this.submitButton.addEventListener('click', this.handleSubmit.bind(this))

    // Bind the click event to the cancel button
    this.cancelButton.addEventListener('click', this.cancelFunction.bind(this))

    // Append all the elements to the container div
    this.containerDiv.appendChild(this.checkboxContainer)
    this.containerDiv.appendChild(this.priorityIndicatorSpan)
    this.containerDiv.appendChild(this.nameInput)
    this.containerDiv.appendChild(this.descriptionInput)
    this.containerDiv.appendChild(this.dueDateInput)
    this.containerDiv.appendChild(this.priorityContainer)
    this.containerDiv.appendChild(this.submitButton)
    this.containerDiv.appendChild(this.cancelButton)

    // Append the container div to the task div
    const taskDiv = document.querySelector('.task')
    taskDiv.appendChild(this.containerDiv)

    // Bind the change event listener to the checkbox input
    this.checkboxInput.addEventListener('change', this.handleCheckboxChange.bind(this))
    this.submitted = false
  }

  handleSubmit () {
    const name = this.nameInput.value
    const description = this.descriptionInput.value
    const dueDate = this.dueDateInput.value
    const priority = this.selectElement.value
    const status = this.statusInput.value

    if (name !== '' && dueDate !== '') {
      // Checking for active Tab
      if (document.querySelector('.inbox').classList.contains('active')) {
        this.submitted = true
        const _task = new Todo(name, description, dueDate, priority, status)
        inboxStorage.addTask(_task)
        activeClass.updateNumberOfInboxNotification()
      }

      // Takes Inbox and children of Projects
      this.submitButton.style.display = 'none'
      this.priorityContainer.remove()
      this.priorityIndicator()
      this.cancelButton.style.display = 'block'
      this.checkboxContainer.style.display = 'block'
      inboxContainer.displayBlock()
      this.containerDiv.classList.remove('shake')
    } else {
      this.containerDiv.classList.add('shake')
      setTimeout(() => {
        this.containerDiv.classList.remove('shake')
      }, 420)
    }
  }

  priorityIndicator () {
    this.priorityIndicatorSpan.classList.add('indicator')
    const selectedPriority = this.selectElement.value
    if (selectedPriority === 'Low') {
      this.priorityIndicatorSpan.style.backgroundColor = 'yellow'
    } else if (selectedPriority === 'High') {
      this.priorityIndicatorSpan.style.backgroundColor = 'red'
    }
  }

  handleCheckboxChange () {
    if (this.checkboxInput.checked) {
      // Remove from task array to finished
      this.containerDiv.remove()
      inboxStorage.finishTask()
      activeClass.updateNumberOfInboxNotification()
    }
  }

  cancelFunction () {
    if (this.submitted === false) {
      this.containerDiv.remove()
      inboxContainer.displayBlock()
    } else if (this.submitted === true) {
      this.containerDiv.remove()
      inboxStorage.removeTask()
      inboxContainer.displayBlock()
      activeClass.updateNumberOfInboxNotification()
    }
  }
}

export const inboxContainer = (function () {
  const addingTaskButton = document.getElementById('adding-button')

  addingTaskButton.addEventListener('click', (e) => {
    // eslint-disable-next-line no-unused-vars
    const ui = new UserInterface() // Create an instance of UserInterface
    addingTaskButton.style.display = 'none'
  })
  return {
    displayBlock: function () {
      addingTaskButton.style.display = 'block'
    },
    displayNone: function () {
      addingTaskButton.style.display = 'none'
    }
  }
})()

export const activeClass = (function () {
  // Getting all buttons in nav
  const allButtonsOfNav = document.querySelectorAll('.set-active')

  allButtonsOfNav.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.stopPropagation()
      for (let i = 0; i < allButtonsOfNav.length; i++) {
        allButtonsOfNav[i].classList.remove('active')
      }

      e.target.classList.add('active')
      inboxContainer.displayBlock()
    })
  })

  return {
    updateNumberOfInboxNotification: function () {
      const inboxTaskNumber = document.querySelector('.notification-number')
      if (inboxStorage.getTasks().length === 0) {
        inboxTaskNumber.textContent = ''
      } else {
        inboxTaskNumber.textContent = inboxStorage.getTasks().length
      }
    }
  }
})()
