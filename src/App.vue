<template>
  <div class="todo-card">
    <h3 class="text-align: center">Todo App</h3>
    <div class="app">
      <todo-input @addTodo="addTodo"></todo-input>
      <todo-list @setStatus="setStatus">
        <todo-item
          @updateTodo="updateTodo"
          @deleteTodo="deleteTodo"
          @checkItem="checkItem" 
          v-for="item in items" 
          :key="item.id" 
          :item="item"
          :status="status"
        >
        </todo-item>
      </todo-list>
    </div>
  </div>
</template>

<script>
import TodoInput from './components/TodoInput.vue';
import TodoItem from './components/TodoItem.vue';
import TodoList from './components/TodoList.vue';

export default {
  data() {
    return {
      items: [],
      status: null,
    };
  },
  computed: {
    itemsLength() {
      return this.items.length;
    },
    getId() {
      if (this.itemsLength) {
        return this.items[this.itemsLength - 1].id + 1;
      }
      return 1;
    },
  },
  methods: {
    addTodo(todo) {
      this.items.push({
        todo: todo,
        completed: false
      });
      // You can add code here to add the new todo to Firebase
    },
    checkItem(id) {
  // Find the index of the todo item in the items array
  const index = this.items.findIndex(item => item.id === id);
  if (index !== -1) {
    // Update the completed status of the todo item locally
    this.items[index].completed = !this.items[index].completed;
    // Update the completed status of the todo item in Firebase
    fetch(`https://todoapp-vue-5df62-default-rtdb.firebaseio.com/todo/${id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: this.items[index].completed,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update todo completion status');
      }
      console.log('Todo completion status updated successfully');
    })
    .catch(error => {
      console.error('Error updating todo completion status:', error);
    });
  }
},

    deleteTodo(id) {
      this.items = this.items.filter(item => item.id !== id);
      // You can add code here to delete the todo from Firebase
      fetch(`https://todoapp-vue-5df62-default-rtdb.firebaseio.com/todo/${id}.json`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete todo');
        }
        console.log('Todo deleted successfully');
        
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
    },
    updateTodo(todo) {
      this.items = this.items.map(item => {
        if (item.id == todo.id) {
          return { ...todo };
        }
        return item;
      });
      // You can add code here to update the todo in Firebase
      fetch(`https://todoapp-vue-5df62-default-rtdb.firebaseio.com/todo/${todo.id}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todo: todo.todo,
          completed: todo.completed,
        }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update todo');
        }
        console.log('Todo updated successfully');
       
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
    },
    setStatus(val) {
      this.status = val;
    },
    fetchTodos() {
      fetch('https://todoapp-vue-5df62-default-rtdb.firebaseio.com/todo.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch todos');
          }
          
          return response.json();
          
        })
        .then(data => {
          // Assuming data is an object where keys are todo IDs
          // and values are todo objects
          this.items = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
        })
        .catch(error => {
          console.error('Error fetching todos:', error);
        });
    }
  },
  components: {
    TodoInput,
    TodoItem,
    TodoList
  },
  created() {
    this.fetchTodos(); 
  }
};
</script>
<style>

.todo-card {
  margin: 50px auto;
  width: 550px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.app {
  padding: 20px;
}

h3 {
  background-color: #f0f0f0;
  padding: 10px 0;
  margin: 0;
  text-align: center;
  border-bottom: 1px solid #ddd;
}


@media (max-width: 580px) {
  .todo-card {
    width: 90%;
    max-width: 400px; 
  }
}


@media (max-width: 500px) {
  .todo-card {
    max-width: 350px; 
  }
}


@media (max-width: 400px) {
  .app {
    padding: 10px; /* Adjust padding for smaller screens */
  }

  .filter {
    flex-direction: column; 
  }

  .filter button {
    margin-bottom: 5px;
  }

  .todo-item {
    padding: 10px; /* Adjust padding for smaller screens */
  }

  .controls {
    display: flex;
    flex-direction: column;
  }

  .controls div {
    margin-bottom: 5px; 
  }
}


@media (max-width: 280px) {
  .todo-card {
    width: 90%;
    max-width: 250px; 
  }
}

</style>
