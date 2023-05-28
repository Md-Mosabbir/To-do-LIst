import './style.css'
import '@fortawesome/fontawesome-free/js/all.js'

// getting the nav
const navTag = document.querySelector('nav')

// inbox button in the nav bar

const inboxDiv = document.createElement('div')
inboxDiv.classList.add('inbox')

const iconSpan = document.createElement('span')
const inboxIcon = document.createElement('i')
inboxIcon.classList.add('fas', 'fa-inbox')
const inboxbutton = document.createElement('button')
const inboxTitle = document.createElement('p')
inboxTitle.textContent = 'Inbox'

iconSpan.appendChild(inboxIcon)

inboxbutton.appendChild(iconSpan)

inboxbutton.appendChild(inboxTitle)

inboxDiv.appendChild(inboxbutton)

navTag.appendChild(inboxDiv)
