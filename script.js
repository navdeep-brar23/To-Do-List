// Get references to DOM elements
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const addTaskBtn = document.getElementById('add-task-btn');
const messageBox = document.getElementById('message-box');
const messageText = document.getElementById('message-text');
const closeMessageBtn = document.getElementById('close-message-btn');

// Function to show message box
function showMessage(message) {
    messageText.textContent = message;
    messageBox.style.display = 'block';
}

// Close message box
closeMessageBtn.addEventListener('click', () => {
    messageBox.style.display = 'none';
});

// Add new task
addTaskBtn.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTask(taskText);
        taskInput.value = '';
    }
});

// Add task to the list
function addTask(task) {
    const li = document.createElement('li');
    const taskSpan = document.createElement('span');
    taskSpan.textContent = task;

    // Checkbox for marking completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed');
    });

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
        const newTask = prompt('Edit task:', taskSpan.textContent);
        if (newTask) {
            taskSpan.textContent = newTask;
            showMessage('Task updated successfully!');
        }
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this task?')) {
            li.remove();
            showMessage('Task deleted successfully!');
        }
    });

    // Append elements to the task
    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    // Add task to the list
    taskList.appendChild(li);
}
