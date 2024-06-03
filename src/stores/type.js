import { ref } from "vue";
import { defineStore } from "pinia";

export const useTypeStore = defineStore(
  "type",
  (t) => {
    const type = ref({});
    type.value = t;
    return {
      type,
    };
  },
  {
    persist: true,
  }
);
