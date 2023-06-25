/* eslint-disable no-new */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
/* eslint-disable no-unreachable-loop */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
import { inboxStorage, projectStorage } from './tab'

import { DisplayTask } from './UI'
import { addingButton } from '..'

// manage active class holder projects switching and creation

export const trackingActiveClass = (() => {
  const task = document.querySelector('.task')
  const inboxTab = document.querySelector('.inbox')
  const project = document.querySelector('.list-and-tasks-container')
  const finish = document.querySelector('.finish')
  const backButton = document.getElementById('back-button')
  const deleteTaskAll = document.getElementById('delete-project-task-button')
  const titleOfActive = document.getElementById('title-of-active')
  deleteTaskAll.style.display = 'none'
  backButton.style.display = 'none'
  function getText() {
    titleOfActive.textContent = ''
    if (inboxContainingActive()) {
      titleOfActive.textContent = 'Inbox'
    } else if (projectContainingActive()) {
      const activeTextContent = document.querySelector(
        '.task-of-proj.set-active.active'
      ).textContent
      titleOfActive.textContent = activeTextContent
    }
  }
  deleteTaskAll.addEventListener('click', () => {
    if (inboxContainingActive()) {
      inboxStorage.removeFinishTask()
    } else if (projectContainingActive()) {
      projectStorage.removeTodoOfProject(
        getIndexOfActiveTodo(),
        getButtonIndex()
      )
      projectStorage.removeFinishProjectTask()
      document.querySelector('.task-of-proj.set-active.active').remove()
    }
    deleteTaskAll.style.display = 'none'
    task.innerHTML = ''
  })
  function removeActiveClass() {
    addingButton.style.display = 'block'
    backButton.style.display = 'none'
    inboxTab.classList.remove('active')
    const buttons = project.querySelectorAll('.set-active')
    buttons.forEach((button) => {
      button.classList.remove('active')
    })
  }
  inboxTab.addEventListener('click', () => {
    removeActiveClass()
    inboxTab.classList.add('active')
    new DisplayTask(inboxStorage.getTasks())
    project.classList.remove('c-active')
    deleteTaskAll.style.display = 'none'
    getText()
  })
  project.addEventListener('click', (e) => {
    if (e.target.classList.contains('set-active')) {
      removeActiveClass()
      // Add the "Active" class to the clicked button
      e.target.classList.add('active')
      project.classList.add('c-active')
      deleteTaskAll.style.display = 'block'
      new DisplayTask(
        projectStorage.getTaskToProject(
          trackingActiveClass.getIndexOfActiveTodo(),
          trackingActiveClass.getButtonIndex()
        )
      )
      getText()
    }
  })

  finish.addEventListener('click', () => {
    backButton.style.display = 'block'
    addingButton.style.display = 'none'
    titleOfActive.textContent = 'Completed'
    if (inboxTab.classList.contains('active')) {
      deleteTaskAll.style.display = 'block'
      new DisplayTask(inboxStorage.getFinishedTask())
    } else if (project.classList.contains('c-active')) {
      new DisplayTask(projectStorage.getFinishedProjectTask())
      deleteTaskAll.style.display = 'none'
    }
  })
  backButton.addEventListener('click', () => {
    backButton.style.display = 'none'
    addingButton.style.display = 'block'

    if (trackingActiveClass.inboxContainingActive()) {
      new DisplayTask(inboxStorage.getTasks())
      deleteTaskAll.setAttribute('style', 'display: none')
    } else if (trackingActiveClass.projectContainingActive()) {
      deleteTaskAll.style.display = 'block'
      new DisplayTask(
        projectStorage.getTaskToProject(
          trackingActiveClass.getIndexOfActiveTodo(),
          trackingActiveClass.getButtonIndex()
        )
      )
      getText()
    }
  })

  function inboxContainingActive() {
    return inboxTab.classList.contains('active')
  }
  function projectContainingActive() {
    return project.classList.contains('c-active')
  }
  function getIndexOfActiveTodo() {
    const lists = document.querySelectorAll('.list')
    let listIndex = -1

    for (let i = 0; i < lists.length; i++) {
      if (lists[i].querySelector('.set-active.active')) {
        listIndex = i
        break
      }
    }

    return listIndex
  }
  function getButtonIndex() {
    const lists = document.querySelectorAll('.list')

    for (let i = 0; i < lists.length; i++) {
      const activeButton = lists[i].querySelector(
        '.task-of-proj.set-active.active'
      )
      if (activeButton) {
        const buttonIndex = Array.from(
          lists[i].querySelectorAll('.task-of-proj')
        ).indexOf(activeButton)
        return buttonIndex
        // Exit the loop after finding the active button
      }
    }
  }

  return {
    inboxContainingActive,
    projectContainingActive,
    getIndexOfActiveTodo,
    getButtonIndex,
  }
})()

export class ProjectCreation {
  constructor() {
    this.projectList = document.createElement('div')
    this.projectList.classList.add('list')

    this.projectNav = document.createElement('div')
    this.projectNav.classList.add('project-nav')
    this.titleH3 = document.createElement('input')
    this.doneButton = document.createElement('button')
    this.doneButton.textContent = 'Add'

    this.deleteListButton = document.createElement('button')
    this.deleteListButton.textContent = 'X'

    this.displaySpan = document.createElement('h3')
    this.displaySpan.style.display = 'none'

    this.addProjectTask = document.createElement('button')
    this.addProjectTask.classList.add('add-projects')
    this.addProjectTask.textContent = '+'
    this.addProjectTask.style.display = 'none'

    this.removeProjectTask = document.createElement('button')
    this.removeProjectTask.classList.add('remove-projects')
    this.removeProjectTask.textContent = 'x'
    this.removeProjectTask.style.display = 'none'

    this.projectNav.appendChild(this.titleH3)
    this.projectNav.appendChild(this.doneButton)
    this.projectNav.appendChild(this.deleteListButton)
    this.projectNav.appendChild(this.displaySpan)
    this.projectNav.appendChild(this.addProjectTask)
    this.projectNav.appendChild(this.removeProjectTask)
    this.projectList.appendChild(this.projectNav)

    document
      .querySelector('.list-and-tasks-container')
      .appendChild(this.projectList)
    this.doneButton.addEventListener('click', this.submitProject.bind(this))
    this.addProjectTask.addEventListener(
      'click',
      this.createTaskToProject.bind(this)
    )
    this.removeProjectTask.addEventListener('click', this.removeList.bind(this))
    this.deleteListButton.addEventListener('click', () =>
      this.projectList.remove()
    )
  }

  removeList() {
    this.projectList.remove()
    projectStorage.removeProject()
  }

  submitProject() {
    this.inputValue = this.titleH3.value
    this.displaySpan.textContent = `${this.inputValue}`
    this.titleH3.style.display = 'none'
    this.doneButton.style.display = 'none'
    this.removeProjectTask.style.display = 'block'
    this.deleteListButton.remove()

    this.displaySpan.style.display = 'block'
    this.addProjectTask.style.display = 'inline-block'
    projectStorage.addProject()
  }

  createTaskToProject() {
    this.taskOfProjectInputContainer = document.createElement('div')
    this.taskOfProjectInputContainer.classList.add('container-of-project-task')
    this.taskOfProjectInput = document.createElement('input')
    this.doneButton = document.createElement('button')
    this.doneButton.textContent = 'Add'

    this.deleteTaskInput = document.createElement('button')
    this.deleteTaskInput.textContent = 'x'

    this.deleteTaskInput.addEventListener('click', () =>
      this.taskOfProjectInputContainer.remove()
    )
    this.doneButton.addEventListener(
      'click',
      this.submitTaskToProject.bind(this)
    )

    this.taskOfButton = document.createElement('div')
    this.taskOfButton.style.display = 'none'
    this.taskOfButton.classList.add('task-of-proj')
    this.taskOfButton.classList.add('set-active')

    this.taskOfProjectInputContainer.appendChild(this.taskOfProjectInput)
    this.taskOfProjectInputContainer.appendChild(this.doneButton)
    this.taskOfProjectInputContainer.appendChild(this.taskOfButton)
    this.taskOfProjectInputContainer.appendChild(this.deleteTaskInput)
    this.projectList.appendChild(this.taskOfProjectInputContainer)
  }

  submitTaskToProject() {
    this.deleteTaskInput.remove()
    this.taskOfButton.textContent = this.taskOfProjectInput.value
    this.taskOfButton.style.display = 'block'
    this.taskOfProjectInput.style.display = 'none'
    this.doneButton.remove()
    const getList = document.querySelectorAll('.list')
    projectStorage.addTodoToProject(
      Array.from(getList).indexOf(this.projectList)
    )
  }
}
