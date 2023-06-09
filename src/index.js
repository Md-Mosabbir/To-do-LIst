import './style.css'
import '@fortawesome/fontawesome-free/js/all.js'

import UserInterface from './modules/UI'
import { inboxStorage } from './modules/tab'

// eslint-disable-next-line no-unused-vars
export const inboxContainer = (function () {
  const addingTaskButton = document.getElementById('adding-button')

  addingTaskButton.addEventListener('click', (e) => {
    e.stopPropagation()
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
  const inboxTaskNumber = document.querySelector('.notification-number')

  const inboxTab = document.querySelector('.inbox')
  inboxTab.addEventListener('click', (e) => {
    e.target.classList.add('active')
  })
  return {
    updateNumberOfInboxNotification: function () {
      if (inboxStorage.getTask().length === 0) {
        inboxTaskNumber.textContent = ''
      } else {
        inboxTaskNumber.textContent = inboxStorage.getTask().length
      }
    }
  }
})()
