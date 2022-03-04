const todoTask = document.querySelector('#inputTodoTask')
const todoInput = document.querySelector('#addNewTaskBtn')
const todoList = document.querySelector('#tasks')

todoInput.addEventListener('click', addTodoElement)

function addTodoElement(e){
    e.preventDefault()
    const task = todoTask.value
    console.log(task)

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
    taskInputElement.value = task
    taskInputElement.setAttribute('readonly','readonly')

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

    taskEditBtn.addEventListener('click', (e)=>{
        if(taskEditBtn.textContent.toLowerCase() == 'edit'){
            taskEditBtn.textContent = 'Save'
            taskInputElement.removeAttribute('readonly')
            taskInputElement.focus()
        }else {
            taskEditBtn.textContent = "Edit"
            taskEditBtn.setAttribute('readonly', "readonly")
        }

    })
    taskDeleteBtn.addEventListener('click', (e)=>{
        todoList.removeChild(taskElement)
    })
}




    