<template>
  <div :class="$style.form">
    <el-form :model="formOne" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="formOne.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formOne.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="formOne.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker
            placeholder="选择时间"
            v-model="formOne.date2"
            style="width: 100%"
          ></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="formOne.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="formOne.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="formOne.resource">
          <el-radio-button label="线上品牌商赞助"></el-radio-button>
          <el-radio-button label="线下场地免费"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="formOne.desc"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <el-form :model="formTwo" label-width="80px" size="mini">
      <el-form-item label="活动名称">
        <el-input v-model="formTwo.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formTwo.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="formTwo.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker
            placeholder="选择时间"
            v-model="formTwo.date2"
            style="width: 100%"
          ></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="formTwo.type">
          <el-checkbox-button
            label="美食/餐厅线上活动"
            name="type"
          ></el-checkbox-button>
          <el-checkbox-button label="地推活动" name="type"></el-checkbox-button>
          <el-checkbox-button
            label="线下主题活动"
            name="type"
          ></el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="formTwo.resource" size="medium">
          <el-radio border label="线上品牌商赞助"></el-radio>
          <el-radio border label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

    <el-form :model="formThree" label-width="80px">
      <el-form-item>
        <el-input placeholder="请输入内容" v-model="formThree.input1">
          <template #prepend>Http://</template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElCol,
  ElDatePicker,
  ElTimePicker,
  ElSelect,
  ElOption,
  ElSwitch,
  ElCheckboxGroup,
  ElCheckbox,
  ElRadioGroup,
  ElRadio,
  ElButton,
  ElCheckboxButton,
  ElRadioButton,
} from "element-plus";

export default defineComponent({
  name: "test-form",
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElCol,
    ElDatePicker,
    ElTimePicker,
    ElSelect,
    ElOption,
    ElSwitch,
    ElCheckboxGroup,
    ElCheckbox,
    ElRadioGroup,
    ElRadio,
    ElButton,
    ElCheckboxButton,
    ElRadioButton,
  },
  setup() {
    return {
      formOne: reactive({
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      }),
      formTwo: reactive({
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      }),
      formThree: reactive({
        input1: "",
      }),
      onSubmit() {
        alert("onSubmit");
      },
    };
  },
});
</script>
<style lang="scss" module>
.form {
  margin: 0 auto;
  width: 70%;
}
</style>
