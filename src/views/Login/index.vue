<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { useRouter } from "vue-router";

import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
//表单对象
const form = ref({
  phone: "",
  password: "",
  agree: true,
});
//规则对象
const rules = {
  phone: [{ required: true, message: "手机号不得为空", trigger: "blur" }],
  password: [
    { required: true, message: "密码不得为空", trigger: "blur" },
    { min: 6, max: 14, message: "密码长度为6-14个字符", trigger: "blur" },
  ],
  agree: [
    {
      validator: (rule, value, callback) => {
        if (value) {
          callback();
        } else {
          callback(new Error("请勾选协议"));
        }
      },
    },
  ],
};

const formRef = ref(null);
const router = useRouter();
const doLogin = () => {
  const { phone, password } = form.value;
  formRef.value.validate(async (valid) => {
    if (valid) {
      await userStore.getUserInfo({
        phone,
        password,
        type: "1",
      });
      ElMessage({ type: "success", message: "登录成功" });
      router.replace({ path: "/admin/user" });
    }
  });
};
</script>

<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo" style="margin-top: 2%; margin-bottom: 2%">
          几张记账后台
        </h1>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">管理员登录</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form
              ref="formRef"
              :model="form"
              :rules="rules"
              label-position="right"
              label-width="60px"
              status-icon
            >
              <el-form-item prop="phone" label="账户">
                <el-input v-model="form.phone" />
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input
                  type="password"
                  show-password
                  v-model="form.password"
                />
              </el-form-item>
              <el-form-item prop="agree" label-width="22px">
                <el-checkbox size="large" v-model="form.agree">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>

              <el-button size="large" class="subBtn" @click="doLogin"
                >点击登录</el-button
              >
              <div
                style="
                  margin-top: 10px;
                  width: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              ></div>
            </el-form>
          </div>
        </div>
      </div>
    </section>
    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">友情链接</a>
        </p>
        <p>CopyRight &copy; 许影杰</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.login-section {
  background: url("@/assets/images/login-bg.png") no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~ a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;
    a {
      padding: 0 15px;
      color: #cdcdcd;
      line-height: 1;
      display: inline-block;
      i {
        font-size: 14px;
        margin-right: 2px;
      }

      &:hover {
        color: $xtxColor;
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}
</style>
