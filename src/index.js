/* eslint-disable import/no-cycle */
/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-duplicates */
import './style.css'
import '@fortawesome/fontawesome-free/js/all.js'

// eslint-disable-next-line no-unused-vars, import/named
import { CreateTaskInput, DisplayTask } from './modules/UI'
// eslint-disable-next-line no-unused-vars
import { inboxStorage, projectStorage } from './modules/tab'

import {
  trackingActiveClass,
  CreateListInput,
  CreateProjectInput,
  DisplayProject,
} from './modules/tab-management'

export const addingButton = document.getElementById('adding-button')

export const addingProject = document.querySelector('#adding-project')
addingProject.addEventListener('click', () => {
  new CreateProjectInput()

  addingProject.style.display = 'none'
})

addingButton.addEventListener('click', () => {
  new CreateTaskInput()
  addingProject.style.display = 'flex'
  addingButton.style.display = 'none'
})

document.addEventListener('DOMContentLoaded', () => {
  new DisplayTask(inboxStorage.getTasks())
  new DisplayProject(projectStorage.getAllProject())
})
