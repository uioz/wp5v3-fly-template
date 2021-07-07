<template>
  <div class="test-layout">
    <header class="test-layout__header">
      <router-view name="header"></router-view>
    </header>
    <aside class="test-layout__aside">
      <router-view name="aside"></router-view>
    </aside>
    <main class="test-layout__main">
      <router-view></router-view>
    </main>
    <footer class="test-layout__footer">
      <router-view name="footer"></router-view>
    </footer>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent(function Test() {});
</script>

<style></style>
