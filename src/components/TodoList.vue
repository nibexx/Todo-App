<template>
  <div class="todo-list">

    <slot></slot>
    <div class="filter">
      <button @click="setStatus(null)" class="filter-button">All</button>
      <button @click="setStatus(true)" class="filter-button">Completed</button>
      <button @click="setStatus(false)" class="filter-button">Uncompleted</button>
    </div>
  </div>
</template>

<script>
export default{
  data(){
      return{

      }
  },
  methods: {
    setStatus(val){
      this.$emit('setStatus',val)
    }
  }
}
</script>

<style scoped>
.todo-list{
    display:flex;
    flex-direction: column;
    padding: 10px;
    align-items: flex-start;
    justify-content: flex-start;
}

.filter{
    padding: 5px 0;
    margin: 5px 0 0 0;
} 

.filter-button{
    margin: 0 5px;
    background-color: #797575; /* Grey background */
    color: #fff; /* White text */
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
}

.filter-button:hover{
    background-color: #777; 
}

.filter-button:focus{
    outline : none;
}
</style>
