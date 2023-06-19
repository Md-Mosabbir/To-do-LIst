/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
// manage active class holder projects switching and creation

export const  trackingActiveClass = (() => {
    const inboxTab = document.querySelector('.inbox')
    const eligibleForActive = document.querySelectorAll('.set-active')

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
        }
    }

})()