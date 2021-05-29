//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);
//functions
function addTodo(event){
    event.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    /// add todo to local storage
    saveLocalTodos(todoInput.value);
    // completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("completed-button");
    todoDiv.appendChild(completedButton);
    // delete button
    const deletedButton = document.createElement('button');
    deletedButton.innerHTML = `<i class="fas fa-trash"></i>`;
    deletedButton.classList.add('deleted-button');
    todoDiv.appendChild(deletedButton);
    //append
    todoList.appendChild(todoDiv);
    //clear after add
    todoInput.value = ''
}

function deleteCheck(event){
    const item = event.target;
    //delete
    if(item.classList[0] === 'deleted-button'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }
    //checkmark
     if(item.classList[0]==='completed-button'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        console.log(todo);
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
      switch (event.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
      }
    });
}

function saveLocalTodos(todo){
    //check if things already there
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}

function getTodos(){
    console.log('hey')
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todos){
        const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todos;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("completed-button");
    todoDiv.appendChild(completedButton);
    // delete button
    const deletedButton = document.createElement('button');
    deletedButton.innerHTML = `<i class="fas fa-trash"></i>`;
    deletedButton.classList.add('deleted-button');
    todoDiv.appendChild(deletedButton);
    //append
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}