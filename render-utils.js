// create a div and a p tag
// depending on whether the todo is complete, give the div the appropriate css class ('complete' or 'incomplete')
// add the 'todo' css class no matter what
// put the todo's text into the p tag
// append stuff
// return the div
export function renderTodo(todo) {

    const div = document.createElement('div');
    const p = document.createElement('p');

    div.classList.add(todo.complete ? 'complete' : 'incomplete');
    div.classList.add('todo');

    p.textContent = todo.todo;

    div.append(p);

    return div;
}