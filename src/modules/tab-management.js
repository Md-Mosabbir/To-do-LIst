/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-new */
/* eslint-disable no-plusplus */

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
  const hamburger = document.querySelector('.hamburger')
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('clicked')
    document.querySelector('.side-nav-container').classList.toggle('clicked')
  })
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
      addingButton.style.display = 'none'
      projectStorage.removeFinishedList(
        trackingActiveClass.getIndexOfActiveTodo()
      )
    }
    deleteTaskAll.style.display = 'none'
    task.innerHTML = ''
    finish.setAttribute('style', 'display: none;')
  })
  function getTask(index) {
    return [...task.children].indexOf(index)
  }
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

      new DisplayTask(
        projectStorage.getList(
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
      new DisplayTask(
        projectStorage.getFinsihedList(
          trackingActiveClass.getIndexOfActiveTodo()
        )
      )
      deleteTaskAll.style.display = 'block'
    }
  })
  backButton.addEventListener('click', () => {
    backButton.style.display = 'none'
    addingButton.style.display = 'block'
    finish.setAttribute('style', 'display: block;')

    if (trackingActiveClass.inboxContainingActive()) {
      new DisplayTask(inboxStorage.getTasks())
      getText()
      deleteTaskAll.setAttribute('style', 'display: none')
    } else if (trackingActiveClass.projectContainingActive()) {
      deleteTaskAll.style.display = 'none'

      finish.setAttribute('style', 'display: block;')
      new DisplayTask(
        projectStorage.getList(
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
    getTask,
  }
})()
export class CreateProjectInput {
  constructor() {
    // Create project input
    this.projectInput = document.createElement('div')
    this.projectInput.classList.add('list')

    this.projectElementsContainer = document.createElement('div')
    this.projectElementsContainer.classList.add('project-nav')
    this.projectNameInput = document.createElement('input')
    this.projectNameInput.required = true

    this.addingProjectButton = document.createElement('button')
    this.addingProjectButton.innerHTML =
      '<i class="fa-solid fa-plus" style="color: #000"></i>'

    this.deleteProjectButton = document.createElement('button')
    this.deleteProjectButton.innerHTML =
      '<i class="fa-solid fa-xmark" style="color: #000"></i>'

    // Adding eventListeners

    this.addingProjectButton.addEventListener(
      'click',
      this.submitProject.bind(this) // crerate the function
    )

    this.deleteProjectButton.addEventListener('click', () =>
      this.projectInput.remove()
    )
    // Appending everything

    this.projectElementsContainer.appendChild(this.projectNameInput)
    this.projectElementsContainer.appendChild(this.addingProjectButton)
    this.projectElementsContainer.appendChild(this.deleteProjectButton)
    this.project.appendChild(this.projectElementsContainer)
    document
      .querySelector('.list-and-tasks-container')
      .appendChild(this.project)
  }

  submitProject() {
    projectStorage.addProject(this.projectNameInput.value)
    this.displayProject(projectStorage.getAllProject())
  }

  displayProject(projects) {
    const display = new DisplayProject(projects)
  }
}

export class DisplayProject {
  constructor(projects) {
    this.projects = projects
    const projectContainer = document.querySelector('.list-and-tasks-container')
    projectContainer.innerHTML = ''
    this.projects.forEach((project) => {
      const projectCard = document.createElement('div')
      projectCard.classList.add('list')

      const projectElementsContainer = document.createElement('div')
      projectElementsContainer.classList.add('project-nav')

      this.displaySpan = document.createElement('h3')
      this.displaySpan.textContent = project.name

      this.addListButton = document.createElement('button') // add list
      this.addListButton.classList.add('add-projects')
      this.addListButton.innerHTML =
        '<i class="fa-solid fa-plus" style="color: #000"></i>'

      this.removeProjectAfterSubmit = document.createElement('button') // remove project all
      this.removeProjectAfterSubmit.classList.add('remove-projects')
      this.removeProjectAfterSubmit.innerHTML =
        '<i class="fa-solid fa-xmark" style="color: #000"></i>'

      projectElementsContainer.appendChild(this.displaySpan)
      projectElementsContainer.appendChild(this.addListButton)
      projectElementsContainer.appendChild(this.removeProjectAfterSubmit)
      projectCard.appendChild(projectElementsContainer)

      // Append Lists
      this.projects.task.forEach((task) => {
        const listDiv = document.createElement('div')

        listDiv.classList.add('task-of-proj')
        listDiv.classList.add('set-active')
        this.textNode = document.createTextNode(task.name)
        listDiv.appendChild(this.textNode)

        listDiv.style.display = 'flex'
        listDiv.setAttribute(
          'style',
          'display: flex; flex-direction: reverse-row; justify-content: start; align-items: center; gap: 0.8rem; width: 100%; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; padding: 10px;'
        )

        const deleteListButton = document.createElement('button') // delete list
        deleteListButton.innerHTML =
          '<i class="fa-solid fa-xmark" style="color: #000"></i>'
        deleteListButton.setAttribute('style', 'min-width: 45px; height: 40px')
        listDiv.appendChild(deleteListButton)
        projectCard.appendChild(listDiv)
      })

      projectContainer.appendChild(projectCard)
    })
  }
}
export class ProjectCreation {
  constructor() {
    // this.displaySpan.style.display = 'none'
    // this.addListButton.style.display = 'none'
    // this.removeProjectAfterSubmit.style.display = 'none'

    this.addListButton.addEventListener('click', this.createList.bind(this))
    this.removeProjectAfterSubmit.addEventListener(
      'click',
      this.removeProject.bind(this)
    )
  }

  removeProject() {
    const getList = document.querySelectorAll('.list')
    projectStorage.removeProject(Array.from(getList).indexOf(this.project))
    this.project.remove()
  }

  submitProject() {
    if (this.projectNameInput.value !== '') {
      this.inputValue = this.projectNameInput.value

      this.projectNameInput.style.display = 'none'
      this.addingProjectButton.style.display = 'none'
      this.removeProjectAfterSubmit.style.display = 'block'
      this.deleteProjectButton.remove()
      this.projectNameInput.remove()
      this.addingProjectButton.remove()

      this.displaySpan.style.display = 'block'
      this.addListButton.style.display = 'inline-block'
      projectStorage.addProject(this.inputValue)
    }
  }

  createList() {
    this.listContainer = document.createElement('div')
    this.listContainer.classList.add('container-of-project-task')
    //-----
    this.listInput = document.createElement('input')
    this.listInput.required = true
    this.addingListButton = document.createElement('button')
    this.addingListButton.appendChild(this.plusIcon)

    this.deleteListInput = document.createElement('button')
    this.deleteListInput.appendChild(this.crossIcon)
    // -------
    this.deleteListInput.addEventListener('click', () =>
      this.listContainer.remove()
    )
    this.addingListButton.addEventListener('click', this.submitList.bind(this))
    //---

    this.deleteListButton.addEventListener('click', (event) => {
      const list = this.deleteListButton.closest('.list')
      const containerDiv = list.querySelectorAll('.container-of-project-task')
      const taskContainer = event.target.closest('.container-of-project-task')
      const taskIndex = Array.from(containerDiv).indexOf(taskContainer)

      const getList = document.querySelectorAll('.list')
      const listIndex = Array.from(getList).indexOf(this.project)

      taskContainer.remove()
      projectStorage.removeList(listIndex, taskIndex)
      document.querySelector('.task').textContent = ''
    })
    this.icon = document.createElement('i')
    this.icon.classList.add('fa-solid', 'fa-xmark')
    this.deleteListButton.appendChild(this.icon)

    this.listDiv.appendChild(this.deleteListButton)
    this.listDiv.style.display = 'none'
    this.listContainer.appendChild(this.listInput)
    this.listContainer.appendChild(this.addingListButton)
    this.listContainer.appendChild(this.listDiv)
    this.listContainer.appendChild(this.deleteListInput)
    this.project.appendChild(this.listContainer)
  }

  submitList() {
    if (this.listInput.value !== '') {
      this.deleteListInput.remove()

      this.addingListButton.remove()
      this.listInput.remove()
      const getList = document.querySelectorAll('.list')
      projectStorage.addList(
        Array.from(getList).indexOf(this.project),
        this.enteredText
      )
    }
  }
}
