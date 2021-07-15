<template>
  <router-link to="/text" custom v-slot="{ navigate, href }">
    <el-link :href="href" @click="navigate">基本文字</el-link>
  </router-link>
  <br />
  <router-link to="/form" custom v-slot="{ navigate, href }">
    <el-link :href="href" @click="navigate">表单</el-link>
  </router-link>
  <br />
  <router-link to="/buttons" custom v-slot="{ navigate, href }">
    <el-link :href="href" @click="navigate">按钮</el-link>
  </router-link>
  <br />
  <router-link to="/dialog" custom v-slot="{ navigate, href }">
    <el-link :href="href" @click="navigate">对话框</el-link>
  </router-link>
</template>
<script>
import { defineComponent } from "vue";
import { ElLink } from "element-plus";
import { AcceptEmail } from "@icon-park/vue-next";

export default defineComponent({
  name: "index",
  components: {
    AcceptEmail,
    ElLink,
  },
});
</script>
