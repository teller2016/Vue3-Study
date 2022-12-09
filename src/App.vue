<template>
  <div class="container">
    <h2>To-Do List</h2>

    <input 
      class="form-control"
      type="text" 
      v-model="searchText"
      placeholder="Search"
    >
    <hr/>
    <TodoSimpleForm @add-todo="addTodo"/>

    <div v-if="!todos.length">
      추가된 ToDo가 없습니다
    </div>

    <div v-if="!filteredTodos.length">
      There is nothing to display
    </div>
    <TodoList 
      :todos="filteredTodos" 
      @toggle-todo="toggleTodo" 
      @delete-todo="deleteTodo"/>
    
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';

export default {
  components: {
    TodoSimpleForm,
    TodoList,
  },

  setup() {
    const todos = ref([
      {
        id: 1,
        subject: '턱걸이 하기',
        completed: false,
      }
    ]);

    const addTodo = (todo) => {
      todos.value.push(todo);
    }

    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed;
    };

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    const searchText = ref('');
    const filteredTodos = computed(() => {
      if (searchText.value) {
        return todos.value.filter(todo => {
          return todo.subject.includes(searchText.value);
        });
      }

      return todos.value;
    });

    return {
      todos,
      addTodo,
      toggleTodo,
      deleteTodo,
      searchText,
      filteredTodos
    }
  }
}
</script>

<style>
  .todo {
    color: gray;
    text-decoration: line-through;
  }

</style>