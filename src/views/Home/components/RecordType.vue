<script setup>
import { onMounted, ref } from "vue";
import { getTypeListAPI, deleteTypeAPI } from "@/apis/type";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useTypeStore } from "@/stores/type";

const typeStore = useTypeStore();
const router = useRouter();
const typeList = ref([]);
const total = ref(0);
const params = ref({
  pageNum: 1,
  pageSize: 10,
  type: 0,
});
const getTypeList = async () => {
  const res = await getTypeListAPI(params.value);
  typeList.value = res.data.rows;
  total.value = Number(res.data.totalNum);
};

onMounted(() => getTypeList());
const pageChange = (page) => {
  params.value.pageNum = page;
  getTypeList();
};
const reject = async (typeId) => {
  await deleteTypeAPI(typeId);
  ElMessage({ type: "success", message: "记录类别删除成功" });
  location.reload();
};
const editType = (typeItem) => {
  typeStore.type = typeItem;
  router.replace({ path: "/admin/editType" });
};
</script>
<template>
  <div>
    <div class="main-container">
      <div class="title">
        <h1>记录种类列表</h1>
      </div>

      <div class="holder-container" v-if="typeList.length === 0">
        <el-empty description="暂无记录种类" />
      </div>
      <div v-else>
        <!-- 列表 -->
        <div class="type-item" v-for="typeItem in typeList" :key="typeItem.id">
          <div class="body">
            <div class="column type">
              <ul>
                <li>
                  <a class="image" href="javascript:;">
                    <img :src="typeItem.imgUrl" alt="" />
                  </a>

                  <div class="column amount">
                    {{ typeItem.name }}
                  </div>
                  <div class="column amount" v-if="typeItem.isIncome === 1">
                    <p class="green">收入</p>
                  </div>
                  <div class="column amount" v-if="typeItem.isIncome === 0">
                    <p class="red">支出</p>
                  </div>
                  <div class="column amount">
                    <el-button
                      size="large"
                      class="subBtn"
                      @click="editType(typeItem)"
                      >编辑</el-button
                    >
                  </div>
                  <div class="column amount">
                    <el-popconfirm
                      title="确认删除该记录类型吗?"
                      @confirm="reject(typeItem.id)"
                    >
                      <template #reference>
                        <el-button type="danger" size="large">删除</el-button>
                      </template>
                    </el-popconfirm>
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

    &.type {
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
      width: 230px;

      .red {
        color: $priceColor;
      }
      .green {
        color: $xtxColor;
      }
    }
  }
}
.pagination-container {
  display: flex;
  justify-content: center;
}
</style>
