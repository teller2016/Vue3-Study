<template>
    <form 
      @submit.prevent="onSubmit"
    >
      <div class="d-flex">
        <div class="flex-grow-1 mr-2">
          <input 
            class="form-control"
            type="text" 
            v-model="todo"
            placeholder="Type new to-do"
          >
        </div>
  
        <div>
          <button 
            class="btn btn-primary"
            type="submit"
          >
            Add
          </button>
        </div>
      </div>

      <p v-show="hasError" style="color: red;">Error</p>
    </form>
</template>

<script>
    import { ref } from 'vue';
    import { getCurrentInstance } from 'vue';

    export default {
        emits: ['add-todo'],
        setup() {
            const {emit} = getCurrentInstance();
            const todo = ref('');
            const hasError = ref(false);

            const onSubmit = () => {
                if (!todo.value) {
                    hasError.value = true;
                    return;
                }

                emit('add-todo', {
                    id: Date.now(),
                    subject: todo.value,
                    completed: false,
                });

                hasError.value = false;
                todo.value = '';
            }

            return {
                todo,
                hasError,
                onSubmit
            }
        }
    }
</script>

<style></style>