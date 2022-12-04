<template>
  <div class="name">
    {{name}}
  </div>
  <button 
    class="btn btn-primary"
    v-on:click="updateName"
    >click</button>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const name = reactive({
      id: 'molly',
    })

    const updateName = () => {
      name.id = 'Molly';
    }

    return {
      name,
      updateName
    }
  }
}
</script>

<style>
  .name {
    color: red;
  }
</style>