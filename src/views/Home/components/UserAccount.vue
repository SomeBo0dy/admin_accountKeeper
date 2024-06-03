<script setup>
import { onMounted, ref } from "vue";
import { getUserListAPI, updateUserStateAPI } from "@/apis/user";

const userList = ref([]);
const total = ref(0);
const params = ref({
  pageNum: 1,
  pageSize: 10,
  type: 0,
});
const getUserList = async () => {
  const res = await getUserListAPI(params.value);
  userList.value = res.data.rows;
  total.value = Number(res.data.totalNum);
};

onMounted(() => getUserList());
const pageChange = (page) => {
  params.value.pageNum = page;
  getUserList();
};
const accept = (user) => {
  const stateDto = {
    Id: user.id,
    toState: 0,
  };
  updateUserStateAPI(stateDto);
  user.state = 0;
};
const reject = (user) => {
  const stateDto = {
    Id: user.id,
    toState: 1,
  };
  updateUserStateAPI(stateDto);
  user.state = 1;
};
</script>
<template>
  <div>
    <div class="main-container">
      <div class="title">
        <h1>用户列表</h1>
      </div>
      <div class="holder-container" v-if="userList.length === 0">
        <el-empty description="暂无用户" />
      </div>
      <div v-else>
        <!-- 用户列表 -->
        <div class="user-item" v-for="user in userList" :key="user.state">
          <div class="body">
            <div class="column user">
              <ul>
                <li>
                  <a class="image" href="javascript:;">
                    <img :src="user.avatar" alt="" />
                  </a>
                  <div class="info">
                    <p class="name ellipsis-2">
                      {{ user.nickName }}
                    </p>
                    <p class="attr ellipsis">
                      <span>{{ user.typeName }}</span>
                    </p>
                  </div>
                  <div class="column amount">
                    {{ user.phoneNumber }}
                  </div>
                  <div class="column amount">
                    {{ user.introduction }}
                  </div>
                  <div class="column state" v-if="user.state == 1">
                    <p class="red">账号停用</p>
                  </div>
                  <div class="column state" v-if="user.state == 0">
                    <p class="green">账号正常</p>
                  </div>
                  <div class="column amount" v-if="user.state == 0">
                    <el-button type="danger" size="large" @click="reject(user)"
                      >账号停用</el-button
                    >
                  </div>
                  <div class="column amount" v-if="user.state == 1">
                    <el-button type="primary" size="large" @click="accept(user)"
                      >账号启用</el-button
                    >
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div class="pagination-container">
          <el-pagination
            :total="total"
            :page-size="params.pageSize"
            @current-change="pageChange"
            background
            layout="prev, pager, next"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.body {
  display: flex;
  align-items: stretch;
  .column {
    border-left: 1px solid #f5f5f5;
    text-align: center;
    padding: 20px;
    > p {
      padding-top: 10px;
    }

    &:first-child {
      border-left: none;
    }

    &.user {
      flex: 1;
      padding: 0;
      align-self: center;

      ul {
        li {
          border-bottom: 1px solid #f5f5f5;
          padding: 10px;
          display: flex;

          &:last-child {
            border-bottom: none;
          }

          .image {
            width: 70px;
            height: 70px;
            border: 1px solid #f5f5f5;
          }

          .info {
            width: 220px;
            text-align: left;
            padding: 0 10px;

            p {
              margin-bottom: 5px;

              &.name {
                height: 38px;
              }

              &.attr {
                color: #999;
                font-size: 12px;

                span {
                  margin-right: 5px;
                }
              }
            }
          }
        }
      }
    }
    &.state {
      width: 120px;
      color: $xtxColor;
      .green {
        color: $xtxColor;
      }
      .red {
        color: $priceColor;
      }
    }
    &.amount {
      width: 200px;

      .red {
        color: $priceColor;
      }
    }
  }
}
.pagination-container {
  display: flex;
  justify-content: center;
}
</style>
