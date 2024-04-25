<template>
    <div class="todo-input">
        <input v-model="todo" placeholder="Add new Todo Task" />
        <button @click="addTodo">Add</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            todo: ''
        };
    },
    methods: {
        addTodo() {
            if (this.todo !== '') {
                this.$emit('addTodo', this.todo);
                fetch('https://todoapp-vue-5df62-default-rtdb.firebaseio.com/todo.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        todo: this.todo,
                        completed: false // Assuming a new todo is not completed initially
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to add todo');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Todo added successfully:', data);
                    this.todo = '';
                })
                .catch(error => {
                    console.error('Error adding todo:', error);
                });
            }
        }
    }
}
</script>

<style>
.todo-input {
    width: 100%;
    padding: 0 10px;
    display: flex;
}

input {
    flex: 1; /* Take up remaining space */
    padding: 5px;
    font-size: 16px;
    border: 1px solid rgba(0, 0, 0, 0.8);
    border-radius: 3px;
}

button {
    margin-left: 10px; 
    padding: 5px 10px;
    font-size: 16px;
    border: none;
    background-color: #bc2323;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
}

button:focus {
    outline: none;
}
</style>
