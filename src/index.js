import './style.css'
import '@fortawesome/fontawesome-free/js/all.js'

// getting the nav
const navTag = document.querySelector('nav')

// inbox button in the nav bar

const inboxDiv = document.createElement('div')
inboxDiv.classList.add('inbox')

const inboxIcon = document.createElement('i')
inboxIcon.classList.add('fas', 'fa-inbox')
const inboxbutton = document.createElement('button')
inboxbutton.textContent = 'Inbox'

inboxDiv.appendChild(inboxIcon)
inboxDiv.appendChild(inboxbutton)

navTag.appendChild(inboxDiv)
