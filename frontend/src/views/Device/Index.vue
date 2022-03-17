<!--
 * @Author: huangyh
 * @Date: 2022-03-07 10:37:34
 * @LastEditors: huangyh
 * @LastEditTime: 2022-03-07 16:45:55
-->
<template>
  <div ref="mainPanel" class="mainPanel">
    <div ref="searchPanel" class="searchPanel">
      <el-form ref="searchForm" :inline="true" size="small" :model="searchForm">
        <el-form-item label="设备编号：" prop="id">
          <el-input v-model="searchForm.id" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="search">查询</el-button>
          <el-button size="mini" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tablePanel" :style="{ height: tableHeight + 'px' }">
      <el-table :data="dataList" style="width: 100%" height="100%" class="tableGrow">
        <el-table-column label="操作" min-width="80" fixed>
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.state == 3" @click="handleWorkOrder(scope.row)">创建工单</el-button>
            <el-button type="text" v-else @click="setAbnormal(scope.row)">置为异常</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="设备名称" show-overflow-tooltip min-width="200">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleDetail(scope.row)">{{ scope.row.name }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="id" show-overflow-tooltip label="设备编号" min-width="200" />
        <el-table-column prop="state" show-overflow-tooltip label="设备状态" min-width="140">
          <template slot-scope="scope">{{ deviceState[scope.row.state] }}</template>
        </el-table-column>
        <el-table-column prop="type" label="机型" min-width="140" />
        <el-table-column prop="position" show-overflow-tooltip label="设备位置" min-width="200" />
      </el-table>
    </div>
    <div class="pagePanel">
      <el-pagination
        background
        :current-page.sync="pageInfo.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size.sync="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import array from "lodash/array";
import { parseTime } from "../../utils/index";
export default {
  components: {},
  filters: {},
  data() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      dataList: [],
      tableHeight: 0,
      searchForm: {
        id: "",
      },
      deviceState: {
        1: "正常",
        2: "检修中",
        3: "异常",
      },
    };
  },
  computed: {
    ...mapGetters(["deviceList"]),
  },
  created() {
    console.log("AutoConsole: deviceList", this.deviceList);
    this.getList();
  },
  mounted() {
    this.tableHeight =
      this.$refs.mainPanel.clientHeight -
      this.$refs.searchPanel.clientHeight -
      90;
    window.onresize = () => {
      return (() => {
        this.tableHeight =
          this.$refs.mainPanel.clientHeight -
          this.$refs.searchPanel.clientHeight -
          90;
      })();
    };
  },
  beforeDestroy() {
    window.onresize = null;
  },
  methods: {
    paging(list, pageIndex, pageSize) {
      if (!list) return [];
      const skipList = array.drop(list, pageSize * (pageIndex - 1));
      const pageData = array.take(skipList, pageSize);
      return pageData;
    },
    handleSizeChange(size) {
      this.pageInfo.pageNum = 1;
      this.getList();
    },
    handleCurrentChange(index) {
      this.pageInfo.pageNum = index;
      this.getList();
    },
    search() {
      this.pageInfo.pageNum = 1;
      this.getList();
    },
    resetForm() {
      this.$refs.searchForm.resetFields();
      this.search();
    },
    getList() {
      let searchData = this.deviceList.filter((i) =>
        i.id.includes(this.searchForm.id)
      );
      this.dataList = this.paging(
        searchData,
        this.pageInfo.pageNum,
        this.pageInfo.pageSize
      );
      this.total = searchData.length;
    },
    handleDetail(item) {
      this.$router.push({
        name: "deviceDetail",
        params: {
          id: item.id,
        },
      });
    },
    handleWorkOrder(item) {
      this.$router.push({
        name: "WorkOrderCreate",
        query: {
          device: item.id,
        },
      });
    },
    setAbnormal(item) {
      this.$store.commit("demo/UPDATE_DEVICELIST", {
        state: 3,
        id: item.id,
      });
      this.search()
    },
  },
};
</script>
<style lang="scss" scoped>
.btnsPanel {
  margin-bottom: 10px;
}
.previewBox {
  display: flex;
  & > div {
    height: 600px;
  }
  .previewBoxLeft {
    flex-grow: 1;
    padding: 20px;
    .previewBoxLeftTop {
      border-bottom: 1px solid #e5e5e5;
      padding: 0 0 20px 0;
      .previewBoxLeftTopTitle {
        font-size: 26px;
        font-weight: bold;
        line-height: 38px;
      }
      .previewBoxLeftTopNum {
        font-size: 18px;
        line-height: 38px;
      }
      .previewBoxLeftTopBtns {
        text-align: right;
        padding-right: 20px;
      }
    }
    .previewBoxLeftBom {
      padding: 20px 0 0 0;
    }
  }
  .previewBoxRight {
    flex-grow: 2;
    overflow: auto;
    .previewBoxRightHtml {
      width: 100%;
    }
  }
}
</style>
