const todoTask = document.querySelector('#inputTodoTask')
const todoInput = document.querySelector('#addNewTaskBtn')
const todoList = document.querySelector('#tasks')

todoInput.addEventListener('click', addTodoElement)
document.addEventListener('DOMContentLoaded', getLocalStorageOnLoad)

function addTodoElement(e) {
    e.preventDefault()
    const task = todoTask.value

    console.log(task);

    if(task !=""){
        console.log(task);
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
    saveLocalStorage(task)


    todoTask.value = ""

    let todo

    taskEditBtn.addEventListener('click', (e) => {
        
        let newTodo=''
        if (taskEditBtn.textContent.toLowerCase() == 'edit') {
            // console.log("thisssss->"+taskInputElement.value)
            todo=taskInputElement.value
            taskEditBtn.textContent = 'Save'
            taskInputElement.removeAttribute('readonly')
            taskInputElement.focus()

        } else {
            newTodo=taskInputElement.value
            taskEditBtn.textContent = "Edit"
            taskEditBtn.setAttribute('readonly', "readonly")
            // console.log("update this->"+todo)
            updateLocalStorage(todo,newTodo)

        }

    })
    taskDeleteBtn.addEventListener('click', (e) => {
        todoList.removeChild(taskElement)
        deleteLocalStorage(taskInputElement.value)
        // saveLocalStorage(taskElement)
    })

}
    todoTask.value = ""
}


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

function getLocalStorageOnLoad() {
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(todo => {
        const taskElement = document.createElement('div')
        taskElement.classList.add('task')

        todoList.appendChild(taskElement)

        const taskContentElement = document.createElement('div')
        taskContentElement.classList.add('content')
        //!ربطت الابن في الاب 
        //* parent: taskElement
        taskElement.appendChild(taskContentElement)

        const taskInputElement = document.createElement('input')
        taskInputElement.classList.add('text')
        taskInputElement.type = 'text'
        taskInputElement.value = todo
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

        let pastTodo

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
        taskDeleteBtn.addEventListener('click', (e) => {
            todoList.removeChild(taskElement)
            deleteLocalStorage(taskInputElement.value)
            // saveLocalStorage(taskElement)
        })
     });

    
}






