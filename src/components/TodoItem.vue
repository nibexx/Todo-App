<template>
    <div class="todo-item" v-show="status == null || status == item.completed">
        <div class="controls">
            <div class="edit" @click="editMode = !editMode">
                <p class="fa fa-edit">edit</p>
            </div>
            <div class="delete" @click="deleteTodo">
                <v-icon class="mdi mdi-pencil"></v-icon> <p>Delete</p>
            </div>
        </div>
        <div v-if="editMode">
            <input @keydown.enter="updateTodo" v-model="todo.todo"/>
        </div>
        <div v-else :class="{ 'throw': item.completed }">{{ item.todo }}</div>
        <div><input type="checkbox" :checked="item.completed" @click="check"/></div>
    </div>
</template>


<script>
export default {
    props: ['item','status'],
    data() {
        return {
            todo : this.item,
            editMode: false
        }
    },
    methods: {
        check(){
           this.$emit('checkItem',this.item.id);
        },
        deleteTodo(){
            this.$emit('deleteTodo',this.item.id);
        },
        updateTodo(){
            if(this.todo.todo !== ''){
            this.$emit('updateTodo',this.todo)
            this.editMode = false;
            }
        }
    },
    components: {}
}
</script>

<style>
.todo-item {
    padding: 10px 20px;
    margin: 5px 0;
    font-size: 18px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #EEE;
}

.throw {
    text-decoration: line-through;
}
.edit, .delete {
    cursor: pointer;
    border-bottom: 2px solid transparent; /* Initially hidden */
    transition: border-color 0.3s ease; /* Smooth transition */
}

.edit:hover, .delete:hover {
    border-bottom-color: black; /* Color to show when hovered */
}
</style>
