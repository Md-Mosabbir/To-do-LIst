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
  const inboxTab = document.querySelector('.inbox')
  const project = document.querySelector('.list-and-tasks-container')
  const finish = document.querySelector('.finish')

  const backButton = document.getElementById('back-button')

  backButton.style.display = 'none'

  function removeActiveClass() {
    inboxTab.classList.remove('active')
    const buttons = project.querySelectorAll('.set-active')
    buttons.forEach((button) => {
      button.classList.remove('active')
      addingButton.style.display = 'block'
    })
  }
  inboxTab.addEventListener('click', () => {
    removeActiveClass()
    inboxTab.classList.add('active')
    new DisplayTask(inboxStorage.getTasks())
    project.classList.remove('c-active')
  })
  project.addEventListener('click', (e) => {
    if (e.target.classList.contains('set-active')) {
      removeActiveClass()
      // Add the "Active" class to the clicked button
      e.target.classList.add('active')
      project.classList.add('c-active')
      new DisplayTask(
        projectStorage.getTaskToProject(
          trackingActiveClass.getIndexOfActiveTodo(),
          trackingActiveClass.getButtonIndex()
        )
      )
    }
  })

  finish.addEventListener('click', () => {
    backButton.style.display = 'block'
    addingButton.style.display = 'none'
    if (inboxTab.classList.contains('active')) {
      new DisplayTask(inboxStorage.getFinishedTask())
    } else if (project.classList.contains('c-active')) {
      new DisplayTask(projectStorage.getFinishedProjectTask())
    }
  })

  backButton.addEventListener('click', () => {
    backButton.style.display = 'none'
    addingButton.style.display = 'block'
    if (trackingActiveClass.inboxContainingActive()) {
      new DisplayTask(inboxStorage.getTasks())
    } else if (trackingActiveClass.projectContainingActive()) {
      new DisplayTask(
        projectStorage.getTaskToProject(
          trackingActiveClass.getIndexOfActiveTodo(),
          trackingActiveClass.getButtonIndex()
        )
      )
    }
  })

  return {
    inboxContainingActive() {
      return inboxTab.classList.contains('active')
    },
    projectContainingActive() {
      return project.classList.contains('c-active')
    },
    getIndexOfActiveTodo() {
      const lists = document.querySelectorAll('.list')
      let listIndex = -1

      for (let i = 0; i < lists.length; i++) {
        if (lists[i].querySelector('.set-active.active')) {
          listIndex = i
          break
        }
      }

      return listIndex
    },
    getButtonIndex() {
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
    },
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

    this.displaySpan = document.createElement('h3')
    this.displaySpan.style.display = 'none'

    this.addProjectTask = document.createElement('button')
    this.addProjectTask.classList.add('add-projects')
    this.addProjectTask.textContent = '+'
    this.addProjectTask.style.display = 'none'

    this.projectNav.appendChild(this.titleH3)
    this.projectNav.appendChild(this.doneButton)
    this.projectNav.appendChild(this.displaySpan)
    this.projectNav.appendChild(this.addProjectTask)
    this.projectList.appendChild(this.projectNav)

    document
      .querySelector('.list-and-tasks-container')
      .appendChild(this.projectList)
    this.doneButton.addEventListener('click', this.submitProject.bind(this))
    this.addProjectTask.addEventListener(
      'click',
      this.createTaskToProject.bind(this)
    )
  }

  submitProject() {
    this.inputValue = this.titleH3.value
    this.displaySpan.textContent = `${this.inputValue}`
    this.titleH3.style.display = 'none'
    this.doneButton.style.display = 'none'

    this.displaySpan.style.display = 'inline-block'
    this.addProjectTask.style.display = 'inline-block'
    projectStorage.addProject()
  }

  createTaskToProject() {
    this.taskOfProjectInputContainer = document.createElement('div')
    this.taskOfProjectInput = document.createElement('input')
    this.doneButton = document.createElement('button')
    this.doneButton.textContent = 'Add'

    this.doneButton.addEventListener(
      'click',
      this.submitTaskToProject.bind(this)
    )

    this.taskOfButton = document.createElement('button')
    this.taskOfButton.style.display = 'none'
    this.taskOfButton.classList.add('task-of-proj')
    this.taskOfButton.classList.add('set-active')

    this.taskOfProjectInputContainer.appendChild(this.taskOfProjectInput)
    this.taskOfProjectInputContainer.appendChild(this.doneButton)
    this.taskOfProjectInputContainer.appendChild(this.taskOfButton)
    this.projectList.appendChild(this.taskOfProjectInputContainer)
  }

  submitTaskToProject() {
    this.taskOfButton.textContent = this.taskOfProjectInput.value
    this.taskOfButton.style.display = 'block'
    this.taskOfProjectInput.style.display = 'none'
    this.doneButton.style.display = 'none'
    const getList = document.querySelectorAll('.list')
    projectStorage.addTodoToProject(
      Array.from(getList).indexOf(this.projectList)
    )
  }
}
