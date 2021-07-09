<template>
  <div :class="$style.index">
    <router-link to="/text" custom v-slot="{ navigate, href }">
      <el-link :href="href" @click="navigate">基本文字</el-link>
    </router-link>
    <br />
    <router-link to="/form" custom v-slot="{ navigate, href }">
      <el-link :href="href" @click="navigate">表单</el-link>
    </router-link>
    <h1>按钮 & link</h1>
    <p>
      <el-button>默认按钮</el-button>
      <el-button class="is-theme">主题按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </p>
    <p>
      <el-button plain>朴素按钮</el-button>
      <el-button plain class="is-theme">主题按钮</el-button>
      <el-button type="primary" plain>主要按钮</el-button>
      <el-button type="success" plain>成功按钮</el-button>
      <el-button type="info" plain>信息按钮</el-button>
      <el-button type="warning" plain>警告按钮</el-button>
      <el-button type="danger" plain>危险按钮</el-button>
    </p>
    <p>
      <el-button round>圆角按钮</el-button>
      <el-button round class="is-theme">主题按钮</el-button>
      <el-button type="primary" round>主要按钮</el-button>
      <el-button type="success" round>成功按钮</el-button>
      <el-button type="info" round>信息按钮</el-button>
      <el-button type="warning" round>警告按钮</el-button>
      <el-button type="danger" round>危险按钮</el-button>
    </p>
    <p>
      <el-button icon="el-icon-search" circle></el-button>
      <el-button icon="el-icon-search" circle class="is-theme"></el-button>
      <el-button type="primary" icon="el-icon-edit" circle></el-button>
      <el-button type="success" icon="el-icon-check" circle></el-button>
      <el-button type="info" icon="el-icon-message" circle></el-button>
      <el-button type="warning" icon="el-icon-star-off" circle></el-button>
      <el-button type="danger" icon="el-icon-delete" circle></el-button>
    </p>
    <p>
      <el-button type="text">文字按钮</el-button>
      <el-button type="text" disabled>文字按钮</el-button>
    </p>
    <p>
      <el-button-group>
        <el-button class="is-theme" round icon="el-icon-arrow-left"
          >上一页</el-button
        >
        <el-button class="is-theme" round
          >下一页<i class="el-icon-arrow-right el-icon--right"></i
        ></el-button>
      </el-button-group>
      <el-button-group>
        <el-button type="danger" icon="el-icon-edit"></el-button>
        <el-button type="warning" icon="el-icon-share"></el-button>
        <el-button type="success" icon="el-icon-delete"></el-button>
      </el-button-group>
    </p>
    <p>
      <el-button>默认按钮</el-button>
      <el-button size="medium" type="primary">中等按钮</el-button>
      <el-button size="small" type="success">小型按钮</el-button>
      <el-button size="mini" type="warning">超小按钮</el-button>
    </p>
    <p>
      <el-button round>默认按钮</el-button>
      <el-button size="medium" class="is-theme" round>中等按钮</el-button>
      <el-button size="small" type="danger" round>小型按钮</el-button>
      <el-button size="mini" type="text" round>超小按钮</el-button>
    </p>
    <p>
      <el-link href="https://element.eleme.io" target="_blank"
        >默认链接</el-link
      >
      <el-link type="primary">主要链接</el-link>
      <el-link type="success">成功链接</el-link>
      <el-link type="warning">警告链接</el-link>
      <el-link type="danger">危险链接</el-link>
      <el-link type="info">信息链接</el-link>
    </p>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { ElButton, ElButtonGroup, ElLink } from "element-plus";
import { AcceptEmail } from "@icon-park/vue-next";

export default defineComponent({
  name: "index",
  components: {
    AcceptEmail,
    ElButton,
    ElButtonGroup,
    ElLink,
  },
});
</script>
<style lang="scss" module>
.index {
  > p {
    margin: 1em;
  }
}
</style>
