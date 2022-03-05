const todoTask = document.querySelector('#inputTodoTask')//! todoTask contains input inside form in header section
const todoInput = document.querySelector('#addNewTaskBtn')//! todoInput contains input send data to the list and local storage
const todoList = document.querySelector('#tasks')//! todoList is the container to the all sublists

//? When you click on this button will call the addTodoElement function
todoInput.addEventListener('click', addTodoElement)

//? When you reload the page will call the getLocalStorageOnLoad function
document.addEventListener('DOMContentLoaded', getLocalStorageOnLoad)

//? To check the input if empty or not and call add and save functions
function addTodoElement(e) {
    e.preventDefault()
    const task = todoTask.value

    // console.log(task);

    if(task !=""){
        add(task)
        saveLocalStorage(task)
}
    todoTask.value = ""
}

//? To create an element to list which contain edit and delete buttons
function add(task){
    const taskElement = document.createElement('div')
    taskElement.classList.add('task')

    todoList.appendChild(taskElement)

    const taskContentElement = document.createElement('div')
    taskContentElement.classList.add('content')
    // //!ربطت الابن في الاب 
    // //* parent: taskElement
    taskElement.appendChild(taskContentElement)

    const taskInputElement = document.createElement('input')
    taskInputElement.classList.add('text')
    taskInputElement.type = 'text'
    //?
    taskInputElement.value = task
    taskInputElement.setAttribute('readonly', 'readonly')

    taskContentElement.appendChild(taskInputElement)

    const taskActionElement = document.createElement('div')
    taskActionElement.classList.add('action')

    taskElement.appendChild(taskActionElement)

    const taskEditBtn = document.createElement('button')
    taskEditBtn.classList.add('edit')
    taskEditBtn.textContent = 'Edit'

    taskActionElement.appendChild(taskEditBtn)

    const taskDeleteBtn = document.createElement('button')
    taskDeleteBtn.classList.add('delete')
    taskDeleteBtn.textContent = 'Delete'

    taskActionElement.appendChild(taskDeleteBtn)


    todoTask.value = ""

    let pastTodo

    //? To update the saved data in sublist
    taskEditBtn.addEventListener('click', (e) => {
        
        let newTodo=''
        if (taskEditBtn.textContent.toLowerCase() == 'edit') {
            // console.log("thisssss->"+taskInputElement.value)
            pastTodo=taskInputElement.value
            taskEditBtn.textContent = 'Save'
            taskInputElement.removeAttribute('readonly')
            taskInputElement.focus()

        } else {
            newTodo=taskInputElement.value
            taskEditBtn.textContent = "Edit"
            taskEditBtn.setAttribute('readonly', "readonly")
            // console.log("update this->"+todo)
            updateLocalStorage(pastTodo,newTodo)

        }

    })

    //? To delete the saved data in sublist
    taskDeleteBtn.addEventListener('click', (e) => {
        todoList.removeChild(taskElement)
        deleteLocalStorage(taskInputElement.value)
        // saveLocalStorage(taskElement)
    })

    
}

//? To save data into local storage
function saveLocalStorage(todo) {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))

}

//? To update data from local storage
function updateLocalStorage(todo,newTodo){
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    console.log(todos)
    todos[todos.indexOf(todo)]=newTodo
    console.log(todos)
    localStorage.setItem('todos', JSON.stringify(todos))
}

//? To delete data from local storage
function deleteLocalStorage(todo) {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
        // console.log("todos", todos);
        todos.splice(todos.indexOf(todo),1)
        localStorage.setItem('todos', JSON.stringify(todos))
        // console.log("todos", todos);
        
     }
     
       
    
}

//? To keep data saved into the local storage after reload
function getLocalStorageOnLoad() {
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(todo => {
        add(todo)

    
}) 
}






