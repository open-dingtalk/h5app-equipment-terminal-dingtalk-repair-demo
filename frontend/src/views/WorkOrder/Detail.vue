<!--
 * @Author: huangyh
 * @Date: 2022-01-04 10:46:14
 * @LastEditors: huangyh
 * @LastEditTime: 2022-03-07 15:01:32
-->
<template>
  <div class="mainPanel">
    <div class="detailLeft">
      <div class="orderInfoP1">{{id}}</div>
      <div class="orderInfoP2">
        <div class="orderInfoP2Item">
          <div class="itemT">标题：</div>
          <div class="itemC line1">{{ workOrder.title }}</div>
        </div>
        <div class="orderInfoP2Item">
          <div class="itemT">工单模板：</div>
          <div class="itemC line1">售后报修</div>
        </div>
        <div class="orderInfoP2Item">
          <div class="itemT">服务项目：</div>
          <div class="itemC line1">{{ workOrder.category }}</div>
        </div>
        <div class="orderInfoP2Item">
          <div class="itemT">工单优先级：</div>
          <div class="itemC line1">{{ workOrder.priority }}</div>
        </div>
        <div class="orderInfoP2Item">
          <div class="itemT">工单标签：</div>
          <div class="itemC line1">{{ workOrder.label.toString() }}</div>
        </div>
      </div>
      <div class="orderInfoP2">
        <div class="orderInfoP2Item">
          <div class="itemT">预约时间：</div>
          <div class="itemC line1">{{ workOrder.appointsTime }}</div>
        </div>
        <div class="orderInfoP2Item">
          <div class="itemT">详情描述：</div>
          <div class="itemC moLine">{{ workOrder.content }}</div>
        </div>
        <div class="orderInfoP2Item">
          <div class="itemT">邮箱地址：</div>
          <div class="itemC line1">-</div>
        </div>
        <div class="orderInfoP2Item">
          <div class="itemT">现场图片：</div>
          <div class="itemC">
            <el-image v-for="item in workOrder.imgs" :key="item.uid" style="width: 50px; height: 50px;margin-right: 5px;" :src="item.fileUrl" :preview-src-list="[item.fileUrl]"></el-image>
          </div>
        </div>
      </div>
      <div class="orderInfoP2">
        <div class="orderInfoP2Item">
          <div class="itemT">客户名称：</div>
          <div class="itemC line1">{{ workOrder.customerName }}</div>
        </div>
        <div class="orderInfoP2Item">
          <div class="itemT">预约人：</div>
          <div class="itemC moLine">{{ workOrder.contactName }}</div>
        </div>
        <div class="orderInfoP2Item">
          <div class="itemT">服务地址：</div>
          <div class="itemC moLine">{{ workOrder.address }}</div>
        </div>
        <div class="orderInfoP2Item">
          <div class="itemT">详细地址：</div>
          <div class="itemC moLine">{{ workOrder.detailAdd }}</div>
        </div>
      </div>
      <div class="orderInfoP2">
        <!-- <div class="orderInfoP2Item">
          <div class="itemT">服务团队：</div>
          <div class="itemC line1">{{ workOrder.assigners.length && workOrder.assigners[0].team }}</div>
        </div>-->
        <div class="orderInfoP2Item">
          <div class="itemT">服务人员：</div>
          <div class="itemC line1">{{ workOrder.assigners.length > 0 ? workOrder.assigners[0].name: '' }}</div>
        </div>
      </div>
      <div class="orderInfoP2 orderInfoP3">
        <div class="orderInfoP2Item">
          <div class="itemT">创建人员：</div>
          <div class="itemC line1">{{ workOrder.creater}}</div>
        </div>
        <div class="orderInfoP2Item">
          <div class="itemT">创建时间：</div>
          <div class="itemC line1">{{ workOrder.createTime }}</div>
        </div>
      </div>
    </div>
    <div class="detailRight" ref="detailRight">
      <el-tabs v-model="activeName">
        <el-tab-pane label="工单日志" name="1">
          <div class="stepBox" :style="{height: tabPaneH + 'px'}">
            <el-timeline reverse>
              <el-timeline-item v-for="(activity, index) in logList" :key="index">
                <div class="timeLineBox">
                  <div class="timeLineP2">
                    <div>{{activity.title}}</div>
                    <div>{{activity.des}}</div>
                  </div>
                  <div class="timeLineP3">
                    <div>{{activity.date}}</div>
                  </div>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="服务进度" name="2">
          <div class="stepBox" :style="{height: tabPaneH + 'px'}">
            <el-timeline reverse>
              <el-timeline-item v-for="(activity, index) in serviceList" :key="index">
                <div class="timeLineBox">
                  <div class="timeLineP2">
                    <div>{{activity.title}}</div>
                  </div>
                  <div class="timeLineP3">
                    <div>{{activity.date}}</div>
                  </div>
                </div>
                <div class="timeLineBox2">
                  <div class="timeLineItem" v-show="activity.add != ''">
                    <div class="timeLineLe">签到地址</div>
                    <div class="timeLineRi">{{activity.add}}</div>
                  </div>
                   <div class="timeLineItem" v-show="activity.person != ''">
                    <div class="timeLineLe">负责人</div>
                    <div class="timeLineRi">{{activity.person}}</div>
                  </div>
                   <div class="timeLineItem" v-show="activity.result != ''">
                    <div class="timeLineLe">处理结果</div>
                    <div class="timeLineRi">{{activity.result}}</div>
                  </div>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-tab-pane>-->
        <el-tab-pane label="报修设备" name="3">
          <div class="stepBox" :style="{height: tabPaneH + 'px'}">
            <el-table :data="device" style="width: 100%" height="100%" class="tableGrow">
              <el-table-column prop="name" label="设备名称" show-overflow-tooltip min-width="200">
              </el-table-column>
              <el-table-column prop="type" label="机型" min-width="140" />
              <el-table-column prop="id" show-overflow-tooltip label="设备编号" min-width="200" />
              <el-table-column prop="position" show-overflow-tooltip label="设备位置" min-width="200" />
              <el-table-column  show-overflow-tooltip label="维修状态" min-width="140">
                <template >未完成</template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { dataURItoBlob } from "@/utils/fileHelper";
export default {
  data() {
    return {
      id: "",
      workOrder: {},
      activeName: "1",
      tabPaneH: 0,
      logList: [
        {
          title: "分单",
          date: "2022-01-04 15:03:04",
          des: "系统自动分单给承办部门",
        },
        {
          title: "抄送",
          date: "2022-01-04 15:03:04",
          des: "系统自动抄送给[李四]",
        },
        {
          title: "创建",
          date: "2022-01-04 15:03:04",
          des: "系统管理员[张三]创建了工单",
        },
        {
          title: "指派",
          date: "2022-01-04 17:25:18",
          des: "系统管理员[张三]把工单指派给服务人员[王五]",
        },
      ],
      serviceList: [
        {
          title: "开始服务",
          date: "2022-01-04 15:03:04",
          add: "福建省厦门市思明区观日路54号",
          person: "",
          result: "",
        },
        {
          title: "维修进度",
          date: "2022-01-04 16:03:04",
          add: "",
          person: "[王五]，进度填写人[马六]",
          result: "修为完成",
        },
        {
          title: "服务完成",
          date: "2022-01-04 17:03:04",
          add: "福建省厦门市思明区观日路54号",
          person: "",
          result: "",
        },
      ],
      device:[]
    };
  },
  computed: {
    ...mapGetters(["orderList", "logObj","deviceList"]),
  },
  created() {
    this.id = this.$route.params.id;
    this.workOrder = this.orderList.filter((i) => i.id == this.id)[0];
    console.log("AutoConsole: created -> this.workOrder", this.workOrder);
    this.logList = this.logObj[this.id];
    this.device = this.deviceList.filter(i=>i.id == this.workOrder.deviceId)
    this.init();
  },
  mounted() {
    this.tabPaneH = this.$refs.detailRight.clientHeight - 40;
  },
  methods: {
    init() {
      this.$http.post("/biz/getDepartmentUserBasicInfo").then((res) => {
        console.log("AutoConsole: init -> res", res);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.mainPanel {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  overflow: auto;
  .detailLeft {
    width: 30%;
    min-height: 100%;
    border-right: 1px solid gainsboro;
    padding-right: 10px;
    .orderInfoP1 {
      padding-bottom: 20px;
      border-bottom: 1px dashed gainsboro;
    }
    .orderInfoP2 {
      padding: 20px 0;
      border-bottom: 1px dashed gainsboro;
      .orderInfoP2Item {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        .itemT {
          width: 30%;
        }
        .itemC {
          width: 70%;
        }
        .line1 {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .moLine {
          word-break: break-all;
        }
      }
    }
    .orderInfoP3 {
      border-width: 0;
    }
  }
  .detailRight {
    width: 69%;
    height: 100%;
    .stepBox {
      overflow: auto;
    }
    .timeLineBox {
      display: flex;
      justify-content: space-between;
      .timeLineP2 {
        width: 70%;
      }
      .timeLineP3 {
        width: 30%;
        text-align: right;
      }
    }
    .timeLineBox2 {
      width: 100%;
      .timeLineItem {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .timeLineLe {
          width: 20%;
        }
        .timeLineRi {
          width: 80%;
        }
      }
    }
  }
}
</style>