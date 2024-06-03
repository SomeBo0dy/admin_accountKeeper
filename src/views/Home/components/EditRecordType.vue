<script setup>
import { ref } from "vue";
import { uploadImgAPI } from "@/apis/upload";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { editTypeAPI } from "@/apis/type";
import { useTypeStore } from "@/stores/type";

const typeStore = useTypeStore();
const typeItem = ref(typeStore.type);

// const form = ref({
//   isIncome: "",
//   name: "",
//   imgUrl: "",
// });
const rules = {
  name: [{ required: true, message: "名称不得为空", trigger: "blur" }],
  isIncome: [
    {
      required: true,
      message: "请选择记录种类",
      trigger: "change",
      //   type: "number",
    },
    // { validator: validateCategory, trigger: "blur" },
  ],
  imgUrl: [{ required: true, message: "图片不得为空", trigger: "blur" }],
};

const uploadImg = async (item) => {
  const res = await uploadImgAPI(item);
  typeItem.value.imgUrl = res.data;
};
const formRef = ref(null);
const router = useRouter();

const editType = async () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      await editTypeAPI(typeItem.value);
      ElMessage({ type: "success", message: "编辑成功" });
      router.replace({ path: "/admin/type" });
    }
  });
};
const incomeList = [
  { id: 0, name: "支出" },
  { id: 1, name: "收入" },
];
</script>
<template>
  <div class="title">
    <h1>编辑记录种类</h1>
  </div>
  <div class="form">
    <el-form
      ref="formRef"
      :model="typeItem"
      :rules="rules"
      label-position="left"
      label-width="120px"
      status-icon
    >
      <el-form-item prop="name" label="名称">
        <el-input v-model="typeItem.name" />
      </el-form-item>
      <el-form-item prop="isIncome" label="记录类别种类">
        <el-select v-model="typeItem.isIncome" placeholder="请选择记录类别种类">
          <el-option
            v-for="item in incomeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="imgUrl" label="图片">
        <el-upload
          class="upload"
          drag
          action
          multiple
          :http-request="uploadImg"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            将文件移至此处或 <em>"点击上传"</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">jpg/png文件大小不得大于5mb</div>
          </template>
        </el-upload>
      </el-form-item>
      <div
        style="
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <el-button size="large" class="subBtn" @click="editType"
          >保存</el-button
        >
      </div>
    </el-form>
  </div>
</template>
<style lang="scss">
.title {
  padding: 20px 10px 10px 20px;
}
.form {
  padding: 30px 20px 20px 40px;
  .el-input {
    width: 300px;
  }
}
</style>
