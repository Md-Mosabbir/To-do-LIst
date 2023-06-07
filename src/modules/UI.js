import Todo from './todo'
import { Tabs, Project } from './tab'

export class UserInterface {
  static divCreation () {
    const taskDiv = document.querySelector('.task')
    const containerDiv = document.createElement('div')
    const nameInput = document.createElement('input')
    nameInput.type = 'text'
    nameInput.placeholder = 'Name'

    const descriptionInput = document.createElement('input')
    descriptionInput.type = 'text'
    descriptionInput.placeholder = 'Description'

    const dueDateInput = document.createElement('input')
    dueDateInput.type = 'number'
    dueDateInput.placeholder = 'Due Date'

    const priorityInput = document.createElement('input')
    priorityInput.type = 'text'
    priorityInput.placeholder = 'Priority'

    const statusInput = document.createElement('input')
    statusInput.type = 'text'

    const submitButton = document.createElement('button')
    submitButton.textContent = 'Submit'
    submitButton.addEventListener('click', () => {
      const _task = new Todo(nameInput.value, descriptionInput.value, dueDateInput.value, priorityInput.value, statusInput.value)
      Tabs.addTask(_task)
      submitButton.style.display = 'none'
      inbox.style.display = 'block'
    })

    containerDiv.appendChild(nameInput)
    containerDiv.appendChild(descriptionInput)
    containerDiv.appendChild(dueDateInput)
    containerDiv.appendChild(priorityInput)
    containerDiv.appendChild(submitButton)
    taskDiv.appendChild(containerDiv)
  }
}

const inbox = document.getElementById('adding-button')
inbox.addEventListener('click', (e) => {
  e.stopPropagation()
  UserInterface.divCreation()
  inbox.style.display = 'none'
})
