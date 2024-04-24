import { element, render} from "./view/html-util.js";
const containerElement = document.querySelector("#js-todo-list");
const ul = element`<ul></ul>`;

const addTodo = (todoItem) => {
        const li = element`<li><input type="checkbox" class="checkbox" id="js-checkbox">${todoItem.title}<button class="delete" id="js-delete">x</button></li>`;
        ul.appendChild(li);
        render(ul, containerElement);
}

export default addTodo;