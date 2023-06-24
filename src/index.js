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

import { trackingActiveClass, ProjectCreation } from './modules/tab-management'

export const addingButton = document.getElementById('adding-button')
addingButton.addEventListener('click', () => {
  new CreateTaskInput()
  addingButton.style.display = 'none'
})

export const addingProject = document.querySelector('#adding-project')
addingProject.addEventListener('click', () => new ProjectCreation())
