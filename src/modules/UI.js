/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
// Create the input filed and display task
import Todo from './todo'
import { trackingActiveClass } from './tab-management'
import { inboxStorage } from './tab'

export class CreateTaskInput {
  constructor () {
    this.containerDiv = document.createElement('div')
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
    this.checkbox.type = 'checkbox';
    this.checkbox.name = 'checkbox'
    this.checkbox.style.display = 'none'
    this.containerDiv.appendChild(this.checkbox)

    return this.checkbox
    
  }


  createName(){
    this.inputFieldName = document.createElement('input')
    this.inputFieldName.type = 'text'
    this.inputFieldName.placeholder = 'name'
    this.inputFieldName.name = 'name'
    this.inputFieldName.id = 'name'
    this.containerDiv.appendChild(this.inputFieldName)
    return this.inputFieldName

  }

  createDescription(){
    this.inputFieldDesc = document.createElement('input')
    this.inputFieldDesc.type = 'text'
    this.inputFieldDesc.placeholder = 'description'
    this.inputFieldDesc.name = 'description'
    this.inputFieldDesc.id = 'description'
    this.containerDiv.appendChild(this.inputFieldDesc)
    return this.inputFieldDesc

  }

  createDueDate (){
    this.inputDate = document.createElement('input')
    this.inputDate.type = 'text'
    this.inputDate.id = 'DueDate'
    this.inputDate.placeholder = 'DueDate'
    this.containerDiv.appendChild(this.inputDate)
    return this.inputDate
  }
  
  createPriority () {
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

  submitButton () {
    this.submit = document.createElement('button')
    this.submit.id = 'submit'
    this.submit.textContent = 'Submit'
    this.submit.addEventListener('click', () => this.handleSubmit() ) // later
    this.containerDiv.appendChild(this.submit)

    return this.submit
  }

  cancelButton () {
    this.cancel = document.createElement('button')
    this.cancel.id = 'cancel'
    this.cancel.textContent = 'Cancel'
    this.cancel.addEventListener('click', () => {console.log('cancel')} ) // later
    this.containerDiv.appendChild(this.cancel)

    return this.cancel
    
  }

  getValue (id) {
    return id.value

  
  }
  
  handleSubmit() {
    // check active class holder

    // add accordingly
    if (trackingActiveClass.inboxContainingActive() === true){
      if (this.getValue(this.inputFieldName )!== '' && this.getValue(this.inputDate) !== '') {
        const name = this.getValue(this.inputFieldName)
        const description = this.getValue(this.inputFieldDesc)
        const dueDate = this.getValue(this.inputDate)
        const priority = this.getValue(this.dropDown)
        const status = this.checkbox.checked


        const _task = new Todo(name, description, dueDate, priority, status)
        inboxStorage.addTask(_task)
        console.log(inboxStorage.getTasks())


        new DisplayTask(inboxStorage.getTasks()).displayTasks()

        this.containerDiv.style.display = 'none'
        
      }

    }
    else if (trackingActiveClass.projectContainingActive() === true){
      if (this.getValue(this.inputFieldName )!== '' && this.getValue(this.inputDate) !== '') {
        console.log('Man wanna be radical, and take away life behavubg like an anikal')
  
      }
      
    }

  }
}



// testing

document.getElementById('adding-button').addEventListener('click', () =>  new CreateTaskInput())

// ----



export class DisplayTask {
  constructor(tasks) {
    this.tasks = tasks
  }

  displayTasks() {
    const container = document.querySelector('.task') // Assuming you have a <div> element with id 'task-container' in your HTML file.

    // Clear the container before displaying the tasks
    container.innerHTML = ''

    this.tasks.forEach((task) => {
      const card = document.createElement('div');
      card.classList.add('task-card');

      const nameElement = document.createElement('h3');
      nameElement.classList.add('task-name');
      nameElement.textContent = task.name;

      const descriptionElement = document.createElement('p');
      descriptionElement.classList.add('task-description');
      descriptionElement.textContent = task.description;

      const dueDateElement = document.createElement('p');
      dueDateElement.classList.add('task-due-date');
      dueDateElement.textContent = `Due Date: ${task.dueDate}`;

      const priorityElement = document.createElement('div');
      priorityElement.classList.add('task-priority');
      priorityElement.classList.add(task.priority.toLowerCase());
      
      const statusElement = document.createElement('input');
      statusElement.setAttribute('type', 'checkbox');
      statusElement.checked = task.status;

      card.appendChild(nameElement);
      card.appendChild(descriptionElement);
      card.appendChild(dueDateElement);
      card.appendChild(priorityElement);
      card.appendChild(statusElement);

      container.appendChild(card)
    })
  }
}

// Usage:

