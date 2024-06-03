import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/views/Layout/index.vue";
import Login from "@/views/Login/index.vue";
import Home from "@/views/Home/index.vue";
import UserAccount from "@/views/Home/components/UserAccount.vue";
import RecordType from "@/views/Home/components/RecordType.vue";
import AddRecordType from "@/views/Home/components/AddRecordType.vue";
import editRecordType from "@/views/Home/components/EditRecordType.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "admin",
          component: Home,
          children: [
            {
              path: "user",
              component: UserAccount,
            },
            {
              path: "type",
              component: RecordType,
            },
            {
              path: "addType",
              component: AddRecordType,
            },
            {
              path: "editType",
              component: editRecordType,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      component: Login,
    },
  ],
});

export default router;
