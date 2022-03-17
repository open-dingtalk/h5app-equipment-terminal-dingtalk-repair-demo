<!--
 * @Author: huangyh
 * @Date: 2022-01-04 10:45:44
 * @LastEditors: huangyh
 * @LastEditTime: 2022-01-06 17:54:59
-->
<template>
  <div ref="mainPanel" class="mainPanel">
    <!-- <div ref="searchPanel" class="searchPanel">
      <el-form ref="searchForm" :inline="true" size="small" :model="searchForm">
        <el-form-item label="工单号：" prop="id">
          <el-input v-model="searchForm.id" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="search">查询</el-button>
          <el-button size="mini" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>-->
    <div class="tablePanel" :style="{ height: tableHeight + 'px' }">
      <el-table :data="dataList" style="width: 100%" height="100%" class="tableGrow">
        <el-table-column label="操作" min-width="80" fixed>
          <template slot-scope="scope">
            <el-button type="text" :disabled="scope.row.assigners.length > 0" @click="handleAssign(scope.row)">
              指派
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="工单号" show-overflow-tooltip min-width="260">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleDetail(scope.row)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" show-overflow-tooltip min-width="200" />
        <el-table-column prop="customerName" label="客户名称" min-width="140" />
        <el-table-column prop="contactName" label="联系人名称" min-width="140" />
        <el-table-column prop="contactPhone" label="联系人电话" min-width="140" />
        <el-table-column prop="address" show-overflow-tooltip label="服务地址" min-width="180" />
        <el-table-column prop="category" show-overflow-tooltip label="服务项目" min-width="180" />
        <el-table-column prop="appointsTime" label="预约时间" min-width="160" />
        <el-table-column prop="priority" label="工单优先级" min-width="140" />
        <el-table-column prop="label" show-overflow-tooltip label="工单标签" min-width="180">
          <template slot-scope="scope">{{ scope.row.label.toString() }}</template>
        </el-table-column>
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
    <el-dialog title="指派工单" width="60%" :visible.sync="dialogFormVisible">
      <el-table :data="assignPerson" height="300px" class="tableGrow">
        <el-table-column label="指派" min-width="80" fixed>
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.assign"></el-checkbox>
          </template>
        </el-table-column>
        <!-- <el-table-column label="协同" min-width="80" fixed>
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.coordination"></el-checkbox>
          </template>
        </el-table-column>-->
        <el-table-column prop="name" label="姓名" show-overflow-tooltip min-width="140"></el-table-column>
        <el-table-column prop="distance" label="工单距离" min-width="160" />
        <el-table-column prop="phone" label="电话" min-width="140" />
        <el-table-column prop="team" label="服务团队" min-width="140" />
        <el-table-column prop="incompleteNum" label="未完成工单" min-width="140" />
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" :loading="loading" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import array from 'lodash/array'
import { parseTime } from '../../utils/index'
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
        id: '',
      },
      dialogFormVisible: false,
      currentRow: null,
      loading: false,
    }
  },
  computed: {
    ...mapGetters(['orderList', 'assignPerson', 'userInfo', 'corpId']),
  },
  created() {
    console.log('AutoConsole: assignPerson', this.assignPerson)

    this.getList()
  },
  mounted() {
    this.tableHeight =
      this.$refs.mainPanel.clientHeight -
      // this.$refs.searchPanel.clientHeight -
      90
    window.onresize = () => {
      return (() => {
        this.tableHeight =
          this.$refs.mainPanel.clientHeight -
          // this.$refs.searchPanel.clientHeight -
          90
      })()
    }
  },
  beforeDestroy() {
    window.onresize = null
  },
  methods: {
    paging(list, pageIndex, pageSize) {
      if (!list) return []
      const skipList = array.drop(list, pageSize * (pageIndex - 1))
      const pageData = array.take(skipList, pageSize)
      return pageData
    },
    handleSizeChange(size) {
      this.pageInfo.pageNum = 1
      this.getList()
    },
    handleCurrentChange(index) {
      this.pageInfo.pageNum = index
      this.getList()
    },
    search() {
      this.pageInfo.pageNum = 1
      this.getList()
    },
    resetForm() {
      this.$refs.searchForm.resetFields()
      this.search()
    },
    popoverResetForm() {
      this.$refs.popoverForm.resetFields()
      this.search()
    },
    getList() {
      this.dataList = this.paging(this.orderList, this.pageInfo.pageNum, this.pageInfo.pageSize)
      this.total = this.orderList.length
    },
    handleDetail(item) {
      this.$router.push({
        name: 'WorkOrderDetail',
        params: {
          id: item.id,
        },
      })
    },
    handleAssign(row) {
      this.currentRow = row
      // this.dialogFormVisible = true;
      let self = this
      if (this.$dd) {
        try {
          this.$dd.ready(function() {
            console.log('DDJSAPI初始化完成')
            self.$dd.biz.contact.choose({
              multiple: false, //是否多选：true多选 false单选； 默认true
              users: [], //默认选中的用户列表，员工userid；成功回调中应包含该信息
              corpId: self.corpId, //企业id
              max: 1, //人数限制，当multiple为true才生效，可选范围1-1500
              onSuccess: function(data) {
                console.log('AutoConsole: handleAssign -> data', data)
                let names = []
                for (let item of data) {
                  self.currentRow.assigners.push(item)
                  names.push(item.name)
                }
                // self.currentRow
                console.log('AutoConsole: handleAssign -> self.currentRow', self.currentRow)
                self.$http.post('/biz/sendWorkNotification', {
                  userIdList: data.map((v) => v.emplId).join(','),
                  content: `工单号：${self.currentRow.id}\n工单标题：${self.currentRow.title}\n您有一笔新的工单，请及时处理！`,
                })
                if (self.currentRow.assigners.length) {
                  self.$store.commit('demo/UPDATE_ORDERLIST', self.currentRow)
                  self.$store.commit('demo/UPDATE_LOGOBJ', {
                    title: '指派工单',
                    date: parseTime(new Date()),
                    des: `${self.userInfo.name}将工单指派给[${names.toString()}]`,
                    orderId: self.currentRow.id,
                  })
                }
                self.getList()
              },
              onFail: function(err) {
                console.log(err)
              },
            })
          })
        } catch (e) {
          console.log(e)
        } finally {
        }
      }
    },
    confirm() {
      this.loading = true
      let names = []
      for (let item of this.assignPerson) {
        if (item.assign) {
          this.currentRow.assigners.push(item)
          names.push(item.name)
        }
        // if (item.coordination) {
        //   this.currentRow.coordinationers.push(item);
        // }
      }
      if (this.currentRow.assigners.length) {
        this.$store.commit('demo/UPDATE_ORDERLIST', this.currentRow)
        this.$store.commit('demo/UPDATE_LOGOBJ', {
          title: '指派工单',
          date: parseTime(new Date()),
          des: `系统管理员将工单指派给[${names.toString()}]`,
          orderId: this.currentRow.id,
        })
      }
      this.dialogFormVisible = false
      this.loading = false
      this.getList()
    },
  },
}
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
