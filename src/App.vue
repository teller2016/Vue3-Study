<template>
  <!-- 네이게이션바 -->
  <Navbar/>

  <div class="container">
    <!-- 라우터 뷰 -->
    <router-view/>
  </div>

  <Toast />
</template>

<script>
import Toast from '@/components/Toast.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Toast,
    Navbar
  },
}
</script>

<style scoped>

</style>