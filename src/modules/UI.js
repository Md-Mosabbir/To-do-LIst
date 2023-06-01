import Todo from './todo'
import { Tabs, Project } from './tab'

export function userInterface () {
  const addingButton = document.createElement('button')
  addingButton.textContent = 'Hi'

  document.querySelector('body').appendChild(addingButton)

  addingButton.addEventListener('click', (e) => {
    e.target = questions()
  })

  function questions () {
    const name = prompt('name')
    const game = prompt('name')
    const shame = prompt('name')
    const blame = prompt('name')
    const work = new Todo(name, game, shame, blame)
  }
}
