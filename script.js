// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Helper: get tasks array from localStorage (returns array)
  function getStoredTasks() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  // Helper: save tasks array to localStorage
  function saveStoredTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  /**
   * addTask
   * - Adds a task to the DOM.
   * - If save === true, also saves the task to localStorage.
   * - If taskText is not provided (null/undefined), the value is taken from the input field.
   */
  function addTask(taskText = null, save = true) {
    // If no taskText passed in, read from input and trim
    if (taskText === null || typeof taskText === 'undefined') {
      taskText = taskInput.value.trim();
    }

    // Validate
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // Create list item and structure <li><span>task text</span><button>Remove</button></li>
    const li = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    li.appendChild(taskSpan);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn'); // ✅ uses classList.add as required

    // Remove functionality: remove from DOM and from localStorage
    removeButton.onclick = function () {
      // Remove from DOM
      taskList.removeChild(li);

      // Remove from stored tasks (remove first matching instance)
      const tasks = getStoredTasks();
      const index = tasks.indexOf(taskText);
      if (index > -1) {
        tasks.splice(index, 1);
        saveStoredTasks(tasks);
      }
    };

    li.appendChild(removeButton);
    taskList.appendChild(li);

    // Save to localStorage if requested (avoid saving when loading from storage)
    if (save) {
      const tasks = getStoredTasks();
      tasks.push(taskText);
      saveStoredTasks(tasks);
    }

    // Clear the input field
    taskInput.value = '';
  }

  // Load tasks from localStorage and render them (doesn't re-save)
  function loadTasks() {
    const storedTasks = getStoredTasks();
    storedTasks.forEach(taskText => {
      addTask(taskText, false); // false => don't save again to localStorage
    });
  }

  // Attach event listeners
  addButton.addEventListener('click', function () {
    addTask(); // reads from input and saves to localStorage
  });

  // Allow pressing Enter to add task
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Initialize by loading existing tasks
  loadTasks();
});
