const content = document.querySelector('#content');

export function createTaskCard(todo) {
  const todoCard = document.createElement('div')
  todoCard.classList.add('todo-card')

  const todoCardLeft = document.createElement('div');
  todoCardLeft.classList.add('todo-left');
  const toggleBtn = document.createElement('button');
  toggleBtn.classList.add('toggle-btn');
  toggleBtn.setAttribute('aria-label', 'Mark as complete');

  const titleContainer = document.createElement('div');
  titleContainer.classList.add('title-container')

  const todoTitle = document.createElement('div');
  todoTitle.classList.add('todo-title');
  todoTitle.textContent = todo.title;

  const todoNotes = document.createElement('div');
  todoNotes.textContent = todo.notes;
  titleContainer.appendChild(todoTitle);
  titleContainer.appendChild(todoNotes);

  todoCardLeft.appendChild(toggleBtn);
  todoCardLeft.appendChild(titleContainer);

  const todoCardRight = document.createElement('div');
  todoCardRight.classList.add('todo-right');
  const dateTime = document.createElement('time');
  dateTime.textContent = todo.dueDate;

  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-btn')
  editBtn.textContent = 'edit';

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.textContent = 'delete';

  todoCardRight.appendChild(dateTime);
  todoCardRight.appendChild(editBtn);
  todoCardRight.appendChild(deleteBtn);

  todoCard.appendChild(todoCardLeft);
  todoCard.appendChild(todoCardRight);

  content.appendChild(todoCard);
}

export function updateSectionTitle(title) {
  const sectionTitle = document.querySelector('#section-title');
  sectionTitle.textContent = title;
}

export function noTaskOutput() {
  const noTask = document.createElement('div');
  noTask.classList.add('no-task');
  noTask.textContent = 'Yay, No Tasks!';
  content.appendChild(noTask);
}

export function clearContent() {
  content.innerHTML = "";
} 
