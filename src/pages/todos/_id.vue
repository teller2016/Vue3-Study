<template>
    <h1>To-Do Page</h1>
    <div v-if="loading">
        loading...
    </div>
    <form 
        v-else
        @submit.prevent="onSave"
        >
        <div class="row">
            <div class="col-6">
                <div class="form-group">
                    <label>Subject</label>
                    <input 
                        v-model="todo.subject" 
                        type="text" 
                        class="form-control">
                </div>

            </div>
            <div class="col-6">
                <div class="form-group">
                    <label>Status</label>
                    <div>
                        <button 
                            type="button"
                            :class="todo.completed ? 'btn-success' : 'btn-danger'"
                            class="btn"
                            @click="toggleTodoStatus"
                            >
                            {{ todo.completed ? 'Completed' : 'Incomplete' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="!todoUpdated"
        >
            Save
        </button>

        <button 
            class="btn btn-outline-dark ml-2"
            type="button"
            @click="moveToTodoListPage"
            >
            Cancel
        </button>
    </form>
    <Toast 
    v-if="showToast"
    :message="toastMessage"
    :type="toastAlertType"
    />
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { computed, ref } from 'vue';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';

export default {
    components: {
        Toast,
    },

    setup() {
        const route = useRoute();
        const router = useRouter();
        const todo = ref(null);
        const originalTodo = ref(null);
        const loading = ref(true);
        const showToast = ref(false);
        const toastMessage = ref('');
        const toastAlertType = ref('');
        const todoId = route.params.id;

        const getTodo = async () => {

            try {
                const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
    
                todo.value = { ...res.data };
                originalTodo.value = { ...res.data };
    
                loading.value = false;
            }
            catch (error) {
                triggerToast('Something went Wrong', 'danger');
            }
        }

        const todoUpdated = computed(() => {
            return !_.isEqual(todo.value, originalTodo.value);
        });

        const moveToTodoListPage = () => {
            router.push({
                name: 'Todos'
            });
        };

        const toggleTodoStatus = () => {
            todo.value.completed = !todo.value.completed;
        };


        const triggerToast = (message, type) => {
            showToast.value = true;
            toastMessage.value = message;
            toastAlertType.value = type;

            setTimeout(() => {
                toastMessage.value = '';
                showToast.value = false;
                toastAlertType.value = '';
            }, 3000);
        }

        const onSave = async () => {
            try {
                const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
                    subject: todo.value.subject,
                    completed: todo.value.completed
                });
    
                originalTodo.value = {...res.data};
                triggerToast('Successfully Saved');
            }
            catch (error) {
                triggerToast('Something went Wrong', 'danger');
            }
        };

        getTodo();

        return {
            todo,
            loading,
            toggleTodoStatus,
            moveToTodoListPage,
            onSave,
            todoUpdated,
            showToast,
            toastMessage,
            toastAlertType,
        };
    }
}
</script>

<style>

</style>