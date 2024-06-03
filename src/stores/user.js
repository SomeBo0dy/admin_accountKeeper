import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from "@/apis/user";
export const useUserStore = defineStore(
  "user",
  () => {
    const userInfo = ref({});
    const getUserInfo = async ({ phone, password, type }) => {
      const res = await loginAPI({ phone, password, type });
      userInfo.value = res.data;
    };
    const clearUserInfo = () => {
      userInfo.value = {};
    };
    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
    };
  },
  {
    persist: true,
  }
);
