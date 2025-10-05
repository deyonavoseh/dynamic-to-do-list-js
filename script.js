// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {

  // Step 1: Select DOM elements
  const addButton = document.getElementById('add-task');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Step 2: Define the addTask function
  function addTask() {
    // Retrieve and trim the input value
    const taskText = taskInput.value.trim();

    // Check if input is empty
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create new list item for the task
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    // Create remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.className = 'remove-btn';

    // Assign onclick event to remove the task when clicked
    removeButton.onclick = function () {
      taskList.removeChild(listItem);
    };

    // Append remove button to list item, and list item to task list
    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);

    // Clear the input field
    taskInput.value = "";
  }

  // Step 3: Attach event listener to "Add Task" button
  addButton.addEventListener('click', addTask);

  // Step 4: Allow pressing Enter key to add task
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Step 5: (Optional) Automatically focus input on load
  taskInput.focus();
});
