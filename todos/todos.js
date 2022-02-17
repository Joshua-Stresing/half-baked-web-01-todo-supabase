import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';
// this is set up^^^^^^^^^
checkAuth();

const todosEl = document.querySelector('.todos');
// console.log(todosEl, 'todo test');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

// on submit, create a todo, reset the form, and display the todos
todoForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const formData = new FormData(todoForm);

    const todo = formData.get('todo');

    await createTodo(todo);

    todoForm.reset();
    displayTodos();
});

async function displayTodos() {
    // fetch the todos
    // display the list of todos
    // be sure to give each todo an event listener
    // on click, complete that todo
    const todos = await getTodos();

    todosEl.textContent = '';

    for (let todo of todos) {
        const todoEl = renderTodo(todo);
        console.log(todoEl, 'multi todos');
        // console.log(todo, 'single todos');
        todoEl.addEventListener('click', async() => {
            await completeTodo(todo.id);

            displayTodos();
        });

        todosEl.append(todoEl);
    }
}

// add an on load listener that fetches and displays todos on load
window.addEventListener('load', async() => {
    displayTodos();
});

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async() => {
    // delete all todos
    await deleteAllTodos();
    // then refetch and display the updated list of todos
    displayTodos();
});
