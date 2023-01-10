<template>
    
    <div class="d-flex justify-content-between mb-3">
        <h2>To-Do List</h2>
        <button 
        class="btn btn-primary"
        @click="moveToCreatePage"
        >Create Todo</button>
    </div>

    <input 
        class="form-control"
        type="text" 
        v-model="searchText"
        placeholder="Search"
        @keyup.enter="searchTodo"
    >
    <hr/>

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

    <Toast 
    v-if="showToast"
    :message="toastMessage"
    :type="toastAlertType"
    />
    
</template>
    
<script>
import { ref, computed, watch } from 'vue';
import TodoList from '@/components/TodoList.vue';
import axios from 'axios';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';
import { useRouter } from 'vue-router';

export default {
    components: {
    TodoList,
    Toast,
    },

    setup() {
        const router = useRouter();
    const todos = ref([]);
    const error = ref('');
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
    const searchText = ref('');

    const numberOfPages = computed(() => {
        return Math.ceil(numberOfTodos.value/limit);
    })

    const {
        toastMessage,
        toastAlertType,
        showToast,
        triggerToast,
    } = useToast();

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
        triggerToast('Something went Wrong', 'danger');
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
        triggerToast('Something went Wrong', 'danger');
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
        triggerToast('Something went Wrong', 'danger');
        }
    };

    const deleteTodo = async (id) => {
        error.value = '';

        try {
        await axios.delete(`http://localhost:3000/todos/${id}`);
        getTodos(1);
        } 
        catch (err) {
        console.log(err);
        error.value = 'Something when wrong.';
        triggerToast('Something went Wrong', 'danger');
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

    const moveToCreatePage = () => {
        router.push({
            name: 'TodoCreate',
        })
    }

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
        searchTodo,
        toastMessage,
        toastAlertType,
        showToast,
        moveToCreatePage
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