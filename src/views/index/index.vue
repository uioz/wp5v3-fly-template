<template>
  <h1 class="index">{{ message }}</h1>
  <p>state from store {{ count }}</p>
  <router-link to="/home">go to home</router-link>
</template>
<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent(function index() {
  const store = useStore();

  return {
    message: "hello world",
    count: computed(() => store.state.count),
  };
});
</script>
<style src="./index.pure.scss"></style>
