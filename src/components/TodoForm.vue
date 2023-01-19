<template>
  <div v-if="loading">
        loading...
    </div>
    <form 
        v-else
        @submit.prevent="onSave"
        >
        <div class="row">
            <div class="col-6">
                <!-- <div class="form-group">
                    <label>Subject</label>
                    <input 
                        v-model="todo.subject" 
                        type="text" 
                        class="form-control">
                    <div 
                    v-if="subjectError"
                    class="text-red"
                    >{{subjectError}}</div>
                </div> -->
                <Input 
                    label="Subject"
                    v-model:subject="todo.subject"
                    :error="subjectError"
                >
                    <template>
                        
                    </template>
                </Input>
            </div>
            <div v-if="editing" class="col-6">
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
            <div class="col-12">
                <div class="form-group">
                    <label>Body</label>
                    <textarea v-model="todo.body" class="form-control" cols="30" rows="10">

                    </textarea>
                </div>
            </div>
        </div>

        <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="!todoUpdated"
        >
            {{ editing ? 'Update' : 'Create' }}
        </button>

        <button 
            class="btn btn-outline-dark ml-2"
            type="button"
            @click="moveToTodoListPage"
            >
            Cancel
        </button>
    </form>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from '@/axios';
import { computed, ref } from 'vue';
import _ from 'lodash';
import { useToast } from '@/composables/toast';
import Input from '@/components/Input.vue';

export default {
    components: {
        Input,
    },
    props: {
        editing: {
            type: Boolean,
            default: false,
            body: ''
        }
    },
    setup(props) {
        const route = useRoute();
        const router = useRouter();
        const todo = ref({
            subject: '',
            completed: false,
        });

        const originalTodo = ref(null);
        const loading = ref(false);
        const todoId = route.params.id;

        const subjectError = ref('');

        const {
            toastMessage,
            toastAlertType,
            showToast,
            triggerToast,
        } = useToast();

        const getTodo = async () => {
            loading.value = true;
            try {
                const res = await axios.get(`todos/${todoId}`);
    
                todo.value = { ...res.data };
                originalTodo.value = { ...res.data };
    
                loading.value = false;
            }
            catch (error) {
                loading.value = false;
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

        const onSave = async () => {
            subjectError.value = '';

            if (!todo.value.subject) {
                subjectError.value = 'Subject is required';
                return;
            }

            try {
                let res;
                const data = {
                    subject: todo.value.subject,
                    completed: todo.value.completed,
                    body: todo.value.body,
                };

                if (props.editing) {
                    res = await axios.put(`todos/${todoId}`, data);
                    originalTodo.value = {...res.data};
                }
                else {
                    res = await axios.post(`todos`, data);
                    // input 필드 리셋처리
                    todo.value.subject = '';
                    todo.value.body = '';
                }

                const message = `Successfully ` + (props.editing ? 'Updated' : 'Created');
                triggerToast(message);

                if (!props.editing) {
                    router.push({
                        name: 'Todos'
                    })
                }
            }
            catch (error) {
                triggerToast('Something went Wrong', 'danger');
            }
        };

        if (props.editing) {
            getTodo();
        }

        return {
            todo,
            loading,
            toggleTodoStatus,
            moveToTodoListPage,
            onSave,
            todoUpdated,
            toastMessage,
            toastAlertType,
            showToast,
            subjectError,
        };
    }

}
</script>

<style>
    .text-red {
        color: red;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
        transform: translateY(-30px);
    }

    .fade-enter-to,
    .fade-leave-from {
        opacity: 1;
        transform: translateY(0px);
    }

</style>