<!--
 * @Author: huangyh
 * @Date: 2022-03-07 11:35:54
 * @LastEditors: huangyh
 * @LastEditTime: 2022-03-07 14:57:50
-->
<template>
  <div class="mainPanel">
    <div class="detailLeft">
      <div class="orderInfoP2">
        <div class="orderInfoP2Item">
          <div class="itemT">设备名称：</div>
          <div class="itemC line1">{{ device.name }}</div>
        </div>
        <div class="orderInfoP2Item">
          <div class="itemT">机型：</div>
          <div class="itemC line1">{{ device.type }}</div>
        </div>
        <div class="orderInfoP2Item">
          <div class="itemT">联系人：</div>
          <div class="itemC line1">{{ device.contacts }}</div>
        </div>
        <div class="orderInfoP2Item">
          <div class="itemT">设备编号：</div>
          <div class="itemC line1">{{ device.id }}</div>
        </div>
        <div class="orderInfoP2Item">
          <div class="itemT">设备位置：</div>
          <div class="itemC line1">{{ device.position }}</div>
        </div>
        <div class="orderInfoP2Item">
          <div class="itemT">设备状态：</div>
          <div class="itemC line1">{{ deviceState[device.state]}}</div>
        </div>
        <div class="orderInfoP2Item">
          <div class="itemT">设备图片：</div>
          <div class="itemC">
            <el-image v-for="(url,index) in device.imgs" :key="index" style="width: 50px; height: 50px;margin-right: 5px;" :src="url" :preview-src-list="[url]"></el-image>
          </div>
        </div>
      </div>
    </div>
    <div class="detailRight" ref="detailRight">
      <el-tabs v-model="activeName">
        <el-tab-pane label="设备维护日志" name="1">
          <div class="stepBox" :style="{height: tabPaneH + 'px'}">
            <el-table :data="logList" style="width: 100%" height="100%" class="tableGrow">
              <el-table-column prop="name" label="设备名称" show-overflow-tooltip min-width="200">
              </el-table-column>
              <el-table-column prop="type" label="机型" min-width="140" />
              <el-table-column prop="id" show-overflow-tooltip label="设备编号" min-width="200" />
              <el-table-column  show-overflow-tooltip label="维修状态" min-width="140">
                <template >维修中</template>
              </el-table-column>
              <el-table-column prop="position" show-overflow-tooltip label="设备位置" min-width="200" />
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      id: "",
      device: {},
      activeName: "1",
      tabPaneH: 0,
      deviceState: {
        1: "正常",
        2: "检修中",
        3: "异常",
      },
      logList: [
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
    };
  },
  computed: {
    ...mapGetters(["deviceLogObj", "deviceList"]),
  },
  created() {
    this.id = this.$route.params.id;
    this.device = this.deviceList.filter((i) => i.id == this.id)[0];
    console.log("AutoConsole: created -> this.device", this.device);
    let arr = this.deviceLogObj[this.id];
    console.log("AutoConsole: created -> arr", arr);
    if (arr.length) {
      for (let item of arr) {
        this.logList.push(item.data);
      }
    }
  },
  mounted() {
    this.tabPaneH = this.$refs.detailRight.clientHeight - 40;
  },
  methods: {},
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