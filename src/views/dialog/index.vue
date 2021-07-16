<template>
  <div>
    <el-button type="primary" @click="openMessageBox">MessageBox</el-button>
    <hr />
    <el-button type="primary" @click="openMessage">Message</el-button>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { ElDialog, ElButton, ElMessageBox, ElMessage } from "element-plus";

export default defineComponent({
  components: {
    ElDialog,
    ElButton,
  },
  setup() {
    return {
      openMessageBox() {
        ElMessageBox.alert("这是一段内容", "标题名称", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        });
      },
      openMessage() {
        ElMessage("只是一条消息提示");
      },
    };
  },
});
</script>
