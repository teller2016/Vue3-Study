<template>
    <h2>To-Do List</h2>

    <input 
        class="form-control"
        type="text" 
        v-model="searchText"
        placeholder="Search"
        @keyup.enter="searchTodo"
    >
    <hr/>
    <TodoSimpleForm @add-todo="addTodo"/>
    <div style="color: red;">{{ error }}</div>

    <div v-if="!todos.length">
        추가된 ToDo가 없습니다
    </div>

    <div v-if="!todos.length">
        There is nothing to display
    </div>
    <TodoList 
        :todos="todos" 
        @toggle-todo="toggleTodo" 
        @delete-todo="deleteTodo"/>

    <hr>

    <nav aria-label="Page navigation example">
        <ul class="pagination">
        <li v-if="(currentPage !== 1)" class="page-item">
            <a style="cursor: pointer;" class="page-link" @click="getTodos(currentPage - 1)">Previous</a>
        </li>

        <li 
            v-for="page in numberOfPages"
            :key="page"
            :class="currentPage === page ? 'active' : ''"
            class="page-item">
            <a style="cursor: pointer;" class="page-link" @click="getTodos(page)">{{page}}</a>
        </li>

        <li v-if="(numberOfPages !== currentPage)" class="page-item">
            <a style="cursor: pointer;" class="page-link" @click="getTodos(currentPage + 1)">Next</a>
        </li>
        </ul>
    </nav>
    
</template>
    
<script>
import { ref, computed, watch } from 'vue';
import TodoSimpleForm from '@/components/TodoSimpleForm.vue';
import TodoList from '@/components/TodoList.vue';
import axios from 'axios';

export default {
    components: {
    TodoSimpleForm,
    TodoList,
    },

    setup() {
    const todos = ref([]);
    const error = ref('');
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
    const searchText = ref('');

    const numberOfPages = computed(() => {
        return Math.ceil(numberOfTodos.value/limit);
    })

    const getTodos = async (page = currentPage.value) => {
        try {
        const res = await axios.get(
            `http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
            );
        numberOfTodos.value = res.headers['x-total-count'];
        currentPage.value = page;
        todos.value = res.data;
        } catch (err) {
        console.log(err);
        error.value = 'Something when wrong.';
        }
    }

    getTodos();

    const addTodo = async (todo) => {
        // DB에 데이터 저장
        error.value = '';
        try {
        await axios.post('http://localhost:3000/todos', {
            subject: todo.subject,
            completed: todo.completed,
        });

        getTodos(1);
        } catch (err) {
        console.log(err);
        error.value = 'Something when wrong.';
        }
    }

    const toggleTodo = async (index, checked) => {
        error.value = '';
        const id = todos.value[index].id;

        try {
        await axios.patch(`http://localhost:3000/todos/${id}`, {
            completed: checked
        });

        todos.value[index].completed = checked;
        } catch (err) {
        console.log(err);
        error.value = 'Something when wrong.';
        }
    };

    const deleteTodo = async (index) => {
        error.value = '';
        const id = todos.value[index].id;

        try {
        axios.delete(`http://localhost:3000/todos/${id}`);
        getTodos(1);
        } 
        catch (err) {
        console.log(err);
        error.value = 'Something when wrong.';
        }

    };


    let timeout = null;
    const searchTodo = () => {
        clearTimeout(timeout);
        getTodos(1);
    }
    watch(searchText, () => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
        getTodos(1);
        }, 2000);
    });
    // const filteredTodos = computed(() => {
    //   if (searchText.value) {
    //     return todos.value.filter(todo => {
    //       return todo.subject.includes(searchText.value);
    //     });
    //   }

    //   return todos.value;
    // });

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        searchText,
        // filteredTodos,
        error,
        getTodos,
        numberOfTodos,
        numberOfPages,
        currentPage,
        searchTodo
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