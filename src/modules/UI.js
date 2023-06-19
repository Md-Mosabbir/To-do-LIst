/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
// Create the input filed and display task

export class CreateTaskInput {
  constructor () {
    this.containerDiv = document.createElement('div')
    this.createCheckbox()
    this.createInput('name', 'nameInput')
    this.createInput('description', 'description')
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
    this.containerDiv.appendChild(this.checkbox)
    return this.checkbox
    
  }


  createInput(name, id){
    this.inputField = document.createElement('input')
    this.inputField.type = 'text'
    this.inputField.placeholder = name
    this.inputField.name = name
    this.inputField.id = id
    this.containerDiv.appendChild(this.inputField)
    return this.inputField

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
    if (this.getValue(nameInput )!== '' && this.getValue(DueDate)) {
      console.log('yo')

    }
  }
}



// testing

document.getElementById('adding-button').addEventListener('click', () =>  new CreateTaskInput())

// ----

// export class DisplayTask {
//   constructor () {

//   }
// }