/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
import { Project, projectStorage } from "./tab"

// manage active class holder projects switching and creation


export const  trackingActiveClass = (() => {
    const inboxTab = document.querySelector('.inbox')
    const eligibleForActive = document.querySelectorAll('.set-active')
    const taskOfProject = document.querySelectorAll('.task-of-proj')

    eligibleForActive.forEach((button) => {
        button.addEventListener('click', addingActiveClass)
    })

    function addingActiveClass (e) {
        eligibleForActive.forEach(button => button.classList.remove('active'))

        e.target.classList.add('active')

    }

    return {
        inboxContainingActive() {
            return inboxTab.classList.contains('active')
        },
        projectContainingActive () {
            let isActive = false
             taskOfProject.forEach((item) =>  {
                if(item.classList.contains('active')) {
                    isActive = true

                }
            })
            return isActive 
        }
    }

})()




export class ProjectCreation {
    constructor () {

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
        this.projectList.appendChild(this.doneButton)
        this.projectList.appendChild(this.displaySpan)
        this.projectList.appendChild(this.addProjectTask)
        this.projectList.appendChild(this.projectNav)
        document.querySelector('.list-and-tasks-container').appendChild(this.projectList)
        this.doneButton.addEventListener('click', this.submitProject.bind(this))
        
    }

    submitProject () {
        this.inputValue = this.titleH3.value
        this.displaySpan.textContent = `${this.inputValue}`
        this.titleH3.style.display = 'none'
        this.doneButton.style.display = 'none'

        this.displaySpan.style.display = 'inline-block'
        this.addProjectTask.style.display = 'inline-block'
        projectStorage.addProject()




    }

}

document.querySelector('#adding-project').addEventListener('click', () => new ProjectCreation)