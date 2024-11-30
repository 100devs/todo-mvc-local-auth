let deleteBtn = document.querySelectorAll('.del')
let todoItem = document.querySelectorAll('span.not')
let todoComplete = document.querySelectorAll('span.completed')

// Add event listeners using event delegation
document.querySelector('ul').addEventListener('click', (event) => {
    // For marking complete
    if (event.target.classList.contains('not')) {
        markComplete.call(event.target)
    }
    // For marking incomplete
    else if (event.target.classList.contains('completed')) {
        markIncomplete.call(event.target)
    }
    // For deleting
    else if (event.target.classList.contains('del')) {
        deleteTodo.call(event.target)
    }
})

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        this.classList.remove('not')
        this.classList.add('completed')
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        this.classList.remove('completed')
        this.classList.add('not')
    }catch(err){
        console.log(err)
    }
}

document.querySelector('.dark-mode').addEventListener('click', darkMode);

// In your existing darkMode function
function darkMode() {
    const appContainer = document.querySelector('.app-container');
    appContainer.classList.toggle('dark-theme');
    
    // Save the current state to localStorage
    localStorage.setItem('darkMode', appContainer.classList.contains('dark-theme'));
    
    console.log('toggled')
}

// On page load, check and apply dark mode from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.querySelector('.app-container');
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (savedDarkMode) {
        appContainer.classList.add('dark-theme');
    }
});