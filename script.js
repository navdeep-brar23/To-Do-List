// Select DOM elements
const taskInput = document.getElementById('task-input');
const incompleteTaskList = document.getElementById('incomplete-task-list');
const completeTaskList = document.getElementById('complete-task-list');
const addTaskBtn = document.getElementById('add-task-btn');
const messageBox = document.getElementById('message-box');
const messageText = document.getElementById('message-text');
const closeMessageBtn = document.getElementById('close-message-btn');

// Function to display a message in the message box
function showMessage(message) {
    messageText.textContent = message;
    messageBox.style.display = 'block';
}

// Close message box
closeMessageBtn.addEventListener('click', () => {
    messageBox.style.display = 'none';
});

// Add a new task to the incomplete list
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTaskToIncomplete(taskText);
        taskInput.value = '';
    } else {
        showMessage('Task cannot be empty!');
    }
});

// Function to add a task to the incomplete list
function addTaskToIncomplete(taskText) {
    const taskElement = createTaskElement(taskText, false);
    incompleteTaskList.appendChild(taskElement);
}

// Function to create a task element
function createTaskElement(taskText, isCompleted) {
    const li = document.createElement('li');
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    // Checkbox to mark task as completed
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            moveToComplete(taskText, li);
        }
    });

    // Edit button (only for incomplete tasks)
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
        const updatedTask = prompt('Edit your task:', taskSpan.textContent);
        if (updatedTask) {
            taskSpan.textContent = updatedTask;
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

    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    if (!isCompleted) li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    return li;
}

// Move task to the completed list
function moveToComplete(taskText, taskElement) {
    taskElement.remove();
    const completedTask = createTaskElement(taskText, true);
    completeTaskList.appendChild(completedTask);
}
