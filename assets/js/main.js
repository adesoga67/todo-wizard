// In-memory data store
    let todos = [
      {
        id: 1,
        text: 'Welcome to TodoMVP! Click the checkbox to complete this task.',
        completed: false,
        createdAt: new Date().toISOString()
      }
    ];
    let currentFilter = 'all';

    // DOM elements
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const taskCount = document.getElementById('task-count');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const logoutBtn = document.getElementById('logout-btn');

    // Format time
    function formatTime(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);

      if (diffInSeconds < 60) return 'Just now';
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
      if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
      
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    // Update task count
    function updateTaskCount() {
      const activeCount = todos.filter(t => !t.completed).length;
      taskCount.textContent = `${activeCount} ${activeCount === 1 ? 'task' : 'tasks'}`;
    }

    // Render todos
    function renderTodos() {
      const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
      });

      if (filteredTodos.length === 0) {
        const emptyMessage = currentFilter === 'completed' 
          ? 'No completed tasks yet'
          : currentFilter === 'active'
          ? 'No active tasks'
          : 'No tasks yet';
        
        todoList.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-icon">✨</div>
            <h3>${emptyMessage}</h3>
            <p>${currentFilter === 'all' ? 'Add a task to get started!' : ''}</p>
          </div>
        `;
        return;
      }

      todoList.innerHTML = filteredTodos.map(todo => `
        <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
          <input 
            type="checkbox" 
            class="checkbox" 
            ${todo.completed ? 'checked' : ''}
            onchange="toggleTodo(${todo.id})"
          />
          <div class="todo-content">
            <div class="todo-text">${escapeHtml(todo.text)}</div>
            <div class="todo-time">${formatTime(todo.createdAt)}</div>
          </div>
          <div class="todo-actions">
            <button class="btn-icon delete" onclick="deleteTodo(${todo.id})" title="Delete task">
              🗑️
            </button>
          </div>
        </li>
      `).join('');

      updateTaskCount();
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    // Add todo
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = todoInput.value.trim();
      
      if (text) {
        const newTodo = {
          id: Date.now(),
          text: text,
          completed: false,
          createdAt: new Date().toISOString()
        };
        
        todos.unshift(newTodo);
        todoInput.value = '';
        renderTodos();
      }
    });

    // Toggle todo
    window.toggleTodo = function(id) {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
      }
    };

    // Delete todo
    window.deleteTodo = function(id) {
      todos = todos.filter(t => t.id !== id);
      renderTodos();
    };

    // Filter tabs
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentFilter = tab.dataset.filter;
        renderTodos();
      });
    });

    // Logout button
    logoutBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to logout?')) {
        window.location.href = './index.html';
      }
    });

    // Initial render
    renderTodos();