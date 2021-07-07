<template>
  <button class="tw-button" v-bind="$attrs"><slot></slot></button>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent(function TwButton() {});
</script>

<style lang="scss">
:global {
  .tw-button {
    @apply bg-gray-700 p-4 text-gray-50 rounded;
  }
}
</style>
