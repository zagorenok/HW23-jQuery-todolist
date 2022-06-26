const $input = $('#addtolist');
const $btn = $('.btn');
const $list = $('#todolist');

class TodoList {
  constructor(el) {
    this.el = el;
    this.todos = [];
  }

  getToDos() {
    $.ajax('http://localhost:3000/todos')
      .done(todos => {
        this.todos = todos;
        this.renderTodos(this.todos);
      })
      .fail(err => console.warn(err))
  }

  renderTodos(todos = []) {
    let lis = '';
    if (!todos.length) {
      return;
    }
    for (let elem of todos) {
      lis += `<li ${elem.complited ? 'class="done"' : ""}><input type="checkbox" value="${elem.id}" data-action="update" ${elem.complited ? "checked" : ""}><span class="task-name">${elem.task}</span></li>`;
    }
    this.el.html(lis);
  }

  addTodo(todo) {
    $.ajax({
      url: 'http://localhost:3000/todos',
      type: 'post', 
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        task: todo, 
        status: false
      })
    })
      .done(todo => {
        this.todos.push(todo);
        this.renderTodos(this.todos);
      })
      .fail(err => console.warn(err));
  }
}

const todo1 = new TodoList($list);
todo1.getToDos();

$('.wrapper').on('click', '.btn', () => {
    todo1.addTodo($input.val());
    $input.val('');
});
