<template>
  <h1 :class="$style.home">{{ message }}</h1>
  <router-link to="/">go to index</router-link>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent(function Home() {
  return {
    message: "hello world!",
  };
});
</script>
<style lang="scss" module>
.home {
  color: blue;
}
</style>
