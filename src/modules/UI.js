import { parse, format } from 'date-fns'
import Todo from './todo'
import { Tabs, Project } from './tab'

export class UserInterface {
  static divCreation () {
    const taskDiv = document.querySelector('.task')
    const containerDiv = document.createElement('div')

    const priorityIndicatorSpan = document.createElement('span')

    const nameInput = document.createElement('input')
    nameInput.type = 'text'
    nameInput.placeholder = 'Name'

    const descriptionInput = document.createElement('input')
    descriptionInput.type = 'text'
    descriptionInput.placeholder = 'Description'

    const dueDateInput = document.createElement('input')
    dueDateInput.type = 'text'
    dueDateInput.placeholder = 'Due Date'
    dueDateInput.id = 'dateInput'

    const priorityContainer = document.createElement('div')
    priorityContainer.id = 'priorityContainer'

    const selectElement = document.createElement('select')
    selectElement.id = 'dropdown'

    const option1 = document.createElement('option')
    option1.value = 'Low'
    option1.textContent = 'Low'
    selectElement.appendChild(option1)

    const option2 = document.createElement('option')
    option2.value = 'Medium'
    option2.textContent = 'Medium'
    selectElement.appendChild(option2)

    const option3 = document.createElement('option')
    option3.value = 'High'
    option3.textContent = 'High'
    selectElement.appendChild(option3)

    priorityContainer.appendChild(selectElement)

    const statusInput = document.createElement('input')
    statusInput.type = 'text'

    const submitButton = document.createElement('button')
    submitButton.textContent = 'Submit'
    submitButton.addEventListener('click', () => {
      const _task = new Todo(nameInput.value, descriptionInput.value, dueDateInput.value, selectElement.value, statusInput.value)
      Tabs.addTask(_task)
      submitButton.style.display = 'none'
      inbox.style.display = 'block'
      priorityContainer.remove()
      priorityIndicator()
    })

    containerDiv.appendChild(priorityIndicatorSpan)
    containerDiv.appendChild(nameInput)
    containerDiv.appendChild(descriptionInput)
    containerDiv.appendChild(dueDateInput)
    containerDiv.appendChild(priorityContainer)
    containerDiv.appendChild(submitButton)
    taskDiv.appendChild(containerDiv)

    function priorityIndicator () {
      priorityIndicatorSpan.classList.add('indicator')
      if (selectElement.value === 'Low') {
        priorityIndicatorSpan.style.backgroundColor = 'yellow'
      } else if (selectElement.value === 'High') {
        priorityIndicatorSpan.style.backgroundColor = 'red'
      }
    }

    dueDateInput.addEventListener('change', () => {
      const enteredDate = dueDateInput.value
      const [day, month, year] = enteredDate.split('.')
      const parsedDate = parse(`${year}-${month}-${day}T00:00:00`, 'yyyy-MM-dd\'T\'HH:mm:ss', new Date())

      if (isNaN(parsedDate)) {
        console.log('Invalid date format')
        return
      }

      const formattedDate = format(parsedDate, 'do MMMM, yyyy')
      console.log('Parsed date:', parsedDate)
      console.log('Formatted date:', formattedDate)
    })
  }
}

const inbox = document.getElementById('adding-button')
inbox.addEventListener('click', (e) => {
  e.stopPropagation()
  UserInterface.divCreation()
  inbox.style.display = 'none'
})
