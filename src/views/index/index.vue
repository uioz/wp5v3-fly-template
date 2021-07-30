<template>
  <div :class="$style.index">
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et, laudantium.
      Necessitatibus consequuntur odio quas mollitia culpa! Distinctio ducimus
      maxime aut illo repudiandae, necessitatibus assumenda officiis sunt error
      expedita? Dolorem, quisquam.
    </p>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent(function TestIndex() {});
</script>

<style module lang="scss">
.index {
  p {
    @apply lg:w-2/3 md:w-1/2 m-auto p-4 rounded-lg bg-primary-100 text-primary-400 border border-gray-50 shadow-lg hover:ring-indigo-200 ring-2;
  }
}
</style>
