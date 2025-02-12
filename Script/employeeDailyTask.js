document.getElementById('add-task-btn').addEventListener('click', function() {
  var taskInput = document.getElementById('task-input');
  var taskText = taskInput.value.trim();
  
  if (taskText) {
    var taskList = document.getElementById('task-list');
    var newTask = document.createElement('li');
    newTask.innerHTML = `
      <input type="checkbox" />
      <label>${taskText}</label>
      <span class="task-status">Pending</span>
    `;
    taskList.appendChild(newTask);
    taskInput.value = '';
    updateTaskSummary();
  }
});

function updateTaskSummary() {
  var taskList = document.querySelectorAll('#task-list li');
  var totalTasks = taskList.length;
  var completedTasks = document.querySelectorAll('#task-list input:checked').length;
  var pendingTasks = totalTasks - completedTasks;

  document.getElementById('total-tasks').innerText = totalTasks;
  document.getElementById('completed-tasks').innerText = completedTasks;
  document.getElementById('pending-tasks').innerText = pendingTasks;
}

document.getElementById('task-list').addEventListener('change', updateTaskSummary);

document.getElementById('task-filter').addEventListener('change', function() {
  var filter = this.value;
  var tasks = document.querySelectorAll('#task-list li');
  
  tasks.forEach(function(task) {
    var isChecked = task.querySelector('input').checked;
    if (filter === 'all') {
      task.style.display = '';
    } else if (filter === 'completed' && isChecked) {
      task.style.display = '';
    } else if (filter === 'pending' && !isChecked) {
      task.style.display = '';
    } else {
      task.style.display = 'none';
    }
  });
});