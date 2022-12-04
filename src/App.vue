<template>
  <div class="name">
    {{greeting(name)}}
  </div>
</template>

<script>
export default {
  setup() {
    const name = 'Molly Coding';

    const greeting = (name) => {
      return `Hello ${name}`;
    };

    return {
      name,
      greeting
    }
  }
}
</script>

<style>
  .name {
    color: red;
  }
</style>