import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import "element-plus/theme-chalk/el-message.css";

const httpInstance = axios.create({
  baseURL: "http://jzkeeper.somebodycn.xyz:7964",
  // baseURL: "http://localhost:7886",
  timeout: 10000,
});

//拦截器
// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.userInfo.accessToken;
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (e) => Promise.reject(e)
);
const router = useRouter();
// axios响应式拦截器
httpInstance.interceptors.response.use(
  (res) => {
    res = res.data;
    if (res.code != 200) {
      if (res.code == 401002 || res.code == 401001) {
        ElMessage({ type: "warning", message: "登录凭证过期，请重新登录" });
        router.replace({ path: "/login" });
      } else {
        ElMessage({
          type: "warning",
          message: res.msg,
        });
      }
      return Promise.reject();
    }
    return res;
  },

  (e) => {
    return Promise.reject(e);
  }
);
export default httpInstance;
