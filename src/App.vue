<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{ name: 'Home' }">Vue Study</router-link>

    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{ name: 'Todos' }">
          Todos <span class="sr-only">(current)</span>
        </router-link>
      </li>
    </ul>
  </nav>

  <div class="container">
    <!-- 라우터 뷰 -->
    <router-view/>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>