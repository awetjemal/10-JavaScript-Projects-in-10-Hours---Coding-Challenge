const formEl = document.getElementById('form');
const inputEl = document.getElementById('input');
const todosEl = document.getElementById('todos');

const savedTodos = JSON.parse(localStorage.getItem('todos'));
if (savedTodos){
  savedTodos.forEach(todo => {
    if(todo.completed){
      addTodo(todo.text, true);
    }else{
      addTodo(todo.text);
    }
  });
}
formEl.addEventListener('submit', (e) =>{
  e.preventDefault();
  
  const inputText = inputEl.value;
  addTodo(inputText);
  
});

function addTodo(inputText, completed = false){
  if(inputText){
    const newTodo = document.createElement('li');

    newTodo.innerText = inputText;
    if(completed){
      newTodo.classList.add('completed');
    }

    newTodo.addEventListener('click', () =>{
      newTodo.classList.toggle("completed");
      updateLS();
      //console.log('completed is clicked');
    });
    newTodo.addEventListener('contextmenu', (e) =>{
      e.preventDefault();
      newTodo.remove();
      updateLS();
    })

    todosEl.appendChild(newTodo);
    updateLS();
    
    inputEl.value = '';
  }
}

function updateLS(){
  const todoEls = document.querySelectorAll('li');
  const todoItems = [];
  todoEls.forEach(todo =>{
    todoItems.push(
      {
        text: todo.innerText,
        completed: todo.classList.contains('completed'), 
      }
    );
  });
  localStorage.setItem('todos', JSON.stringify(todoItems));
  //console.log(todoItems);

}