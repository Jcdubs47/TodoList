//MVC (Model View Controller)
//Model: Contains all code that saves and manages data
//View: Contains data that manages visuals, and renders
//Controller: Connects model and view together, responds to events

//Model section
//if localStorage has a todos array use local storage
//otherwise use default array
let todos;

//retrieve local storage 
const savedTodos = JSON.parse(localStorage.getItem('todos'));
//check if it's an array
if (Array.isArray(savedTodos)) {
    todos = savedTodos;
} else {
    todos = [{
        title: 'Get groceries',
        dueDate: '2023-1-25',
        id: 'id1',
        isDone: false,
        isEditing: undefined
    }, {
        title: 'Wash car',
        dueDate: '2023-3-25',
        id: 'id2',
        isDone: false,
        isEditing: undefined
    }, {
        title: 'Make dinner',
        dueDate: '2023-2-25',
        id: 'id3',
        isDone: false,
        isEditing: undefined
    }];
}
//creates a todo
const createTodo = (title, dueDate) => {
    const id = '' + new Date().getTime();

    todos.push({
        title: title,
        dueDate: dueDate,
        id: id
    });
    saveTodos();
}

//deletes a todo
const removeTodo = (idToDelete) => {
    todos = todos.filter(todo => {
        if (todo.id === idToDelete) {
            return false;
        }
        else {
            return true;
        }
    });
    saveTodos();
}

const saveTodos = () => localStorage.setItem('todos', JSON.stringify(todos));


const checkTheBox = (checkbox) => {
    todos.forEach(todo => {
        if (checkbox.dataset.todoId === todo.id)
            todo.isDone = checkbox.checked;
    });
    saveTodos();
}
const updateTodo = (text, date, todoId) => {
    todos.forEach( todo => {
        if (todoId === todo.id) {
            todo.title = text;
            todo.dueDate = date;
            todo.isEditing = false;
        }
    });
    saveTodos();
}
const updateEdit = (todoId) =>{
    todos.forEach( todo => {
        if (todoId === todo.id)
            todo.isEditing = true;
    });
    saveTodos();
}

//Controller section
const deleteTodo = (event) =>{
    const deleteButton = event.target;
    const idToDelete = deleteButton.id;

    removeTodo(idToDelete);
    render();
}

const onEdit = (event) =>{
    const edit = event.target;
    const todoId = edit.dataset.todoId
    updateEdit(todoId);
    render();
}
const onUpdate = (event) => {
    const update = event.target;
    const todoId = update.dataset.todoId;

    const newDate = document.getElementById('edit-date' + todoId);
    const date = newDate.value;

    const newText = document.getElementById('edit-text' + todoId);
    const text = newText.value;

    updateTodo(text, date, todoId);

    render();
}

const addTodo = ()=> {
    const textbox = document.getElementById('todo-title');
    const title = textbox.value;

    const datePicker = document.getElementById("date-picker")
    const dueDate = datePicker.value;

    createTodo(title, dueDate)
    render();
}


const checkboxCheck = event => {
    const checkbox = event.target;
    checkTheBox(checkbox);
}

const onDelete = todoToDelete => {
    return () => {
    const idToDelete = todoToDelete.id;
    removeTodo(idToDelete);
    render();
    }
}

//Veiw section (Also includes HTML)
const render = () =>{
    //reset list
    document.getElementById('todo-list').innerHTML = '';


    todos.forEach( (todo, index) =>{
        const element = document.createElement('div');
        element.innerText = todo.title + ' ' + todo.dueDate;
        element.classList.add("list-item");

        //checkbox declaration
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.dataset.todoId = todo.id;
        checkbox.classList.add("checkbox");


        element.prepend(checkbox);


        //checkbox 
        checkbox.onchange = checkboxCheck;
        if (todo.isDone === true)
            checkbox.checked = true;
        else
            checkbox.checked = false;




        if (todo.isEditing === true) {
            //update textbox
            const updateText = document.createElement('input')
            updateText.type = 'text';
            updateText.id = 'edit-text' + todo.id;
            updateText.classList.add("update-text");
            element.appendChild(updateText);
            

            //update datepicker
            const updateDate = document.createElement('input')
            updateDate.type = 'date';
            updateDate.id = 'edit-date' + todo.id;
            updateDate.classList.add("update-date");
            element.appendChild(updateDate);

            //update button
            const updateButton = document.createElement('button')
            updateButton.innerText = 'Update';
            updateButton.dataset.todoId = todo.id;
            updateButton.onclick = onUpdate;
            updateButton.classList.add("update-button");
            element.appendChild(updateButton);




        } else {
            //edit button syle
            const editButton = document.createElement('button')
            editButton.innerText = 'Edit';
            editButton.classList.add("edit-button");
            //edit button
            editButton.onclick = onEdit;
            editButton.dataset.todoId = todo.id;
            element.appendChild(editButton);
        }


        //delete button syle
        const deleteButton = document.createElement('button')
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add("delete-button");

        //delete button function
        deleteButton.onclick = onDelete(todo);
        element.appendChild(deleteButton);
        deleteButton.id = todo.id;


        const todoList = document.getElementById('todo-list');
        todoList.appendChild(element);
    });
}


let cart = [];

render();



function clearList() {
    document.getElementById('cart').innerHTML = '';
    cart = [];
}
function addItem(item) {
    document.getElementById('cart').innerHTML = '';
    cart.push(item)
    cart.forEach(function (cartFill) {
        const element = document.createElement('div');
        element.innerText = cartFill;
        const cartList = document.getElementById('cart');
        cartList.appendChild(element);
    });
}


