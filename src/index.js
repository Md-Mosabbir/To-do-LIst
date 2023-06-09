import './style.css'
import '@fortawesome/fontawesome-free/js/all.js'

import { UserInterface } from './modules/UI'

// eslint-disable-next-line no-unused-vars
export const inboxContainer = (function () {
  const inbox = document.getElementById('adding-button')

  inbox.addEventListener('click', (e) => {
    e.stopPropagation()
    // eslint-disable-next-line no-unused-vars
    const ui = new UserInterface() // Create an instance of UserInterface
    inbox.style.display = 'none'
  })
  return {
    displayBlock: function () {
      inbox.style.display = 'block'
    },
    displayNone: function () {
      inbox.style.display = 'none'
    }
  }
})()
