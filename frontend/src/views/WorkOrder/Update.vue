<!--
 * @Author: huangyh
 * @Date: 2022-01-04 10:45:29
 * @LastEditors: huangyh
 * @LastEditTime: 2022-03-07 14:53:17
-->
<template>
  <div class="mainPanel">
    <el-form :model="orderForm" ref="orderForm" label-width="120px" :rules="orderFormRules">
      <el-row type="flex" align="middle">
        <el-col :span="12">
          <el-form-item label="客户名称：" prop="customerName">
            <el-input placeholder="请输入内容" v-model="orderForm.customerName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="12">
          <el-form-item label="联系人：" prop="contactName">
            <el-input placeholder="请输入内容" v-model="orderForm.contactName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="12">
          <el-form-item label="联系电话：" prop="contactPhone">
            <el-input placeholder="请输入内容" v-model="orderForm.contactPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="12">
          <el-form-item label="服务地址：" prop="address">
            <el-input placeholder="请输入内容" v-model="orderForm.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="12">
          <el-form-item label="详细地址：">
            <el-input placeholder="请输入内容" v-model="orderForm.detailAdd"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="12">
          <el-form-item label="工单标题：" prop="title">
            <el-input placeholder="请输入内容" v-model="orderForm.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="12">
          <el-form-item label="服务项目：" prop="category">
            <el-input placeholder="请输入内容" v-model="orderForm.category"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="12">
          <el-form-item label="选择设备：" prop="deviceId">
            <el-select v-model="orderForm.deviceId" style="width:100%">
              <el-option v-for="item in deviceList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="12">
          <el-form-item label="预约时间：" prop="appointsTime">
            <el-date-picker style="width:100%;" v-model="orderForm.appointsTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="12">
          <el-form-item label="工单优先级：" prop="priority">
            <el-radio-group v-model="orderForm.priority">
              <el-radio label="一般">一般</el-radio>
              <el-radio label="紧急">紧急</el-radio>
              <el-radio label="非常紧急">非常紧急</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="12">
          <el-form-item label="详细描述：" prop="content">
            <el-input placeholder="请输入内容" type="textarea" v-model="orderForm.content"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="12">
          <el-form-item label="图片描述：">
            <ImageUpload @change="orderForm.imgs = $event" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="12">
          <el-form-item label="工单标签：">
            <el-checkbox-group v-model="orderForm.label">
              <el-checkbox label="厦门"></el-checkbox>
              <el-checkbox label="已结款"></el-checkbox>
              <el-checkbox label="未结款"></el-checkbox>
              <el-checkbox label="已收预付款"></el-checkbox>
              <el-checkbox label="已付款"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import ImageUpload from "../../plugins/ImageUpload/local";
import { mapGetters } from 'vuex'
import { parseTime } from "../../utils/index"
export default {
  components: {
    ImageUpload,
  },
  data() {
    return {
      orderForm: {
        customerName: "",
        contactName: "",
        contactPhone: "",
        address: "",
        detailAdd: "",
        title: "",
        category: "",
        appointsTime: "",
        priority: "",
        content: "",
        imgs: [],
        label: [],
        deviceId: ''
      },
      orderFormRules: {
        customerName: [
          { required: true, message: "客户名称", trigger: "blur" },
        ],
        contactName: [{ required: true, message: "联系人", trigger: "blur" }],
        contactPhone: [
          { required: true, message: "联系电话", trigger: "blur" },
        ],
        address: [{ required: true, message: "服务地址", trigger: "blur" }],
        title: [{ required: true, message: "工单标题", trigger: "blur" }],
        appointsTime: [
          { required: true, message: "预约时间", trigger: "change" },
        ],
        deviceId: [
          { required: true, message: "选择设备", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    if(this.$route.query.device != undefined){
      this.orderForm.deviceId = this.$route.query.device;
    }
  },
  computed: {
    ...mapGetters({
      visitedRoutes: 'visitedRoutes',
      userInfo: 'userInfo',
      deviceList: 'deviceList'
    })
  },
  methods: {
    onSubmit() {
      this.$refs.orderForm.validate(async (valid) => {
        if (valid) {
          let id = this.generateUUID();
          this.orderForm['id'] = id;
          this.orderForm['createTime'] = parseTime(new Date());
          this.orderForm['assigners'] = [];
          this.orderForm['creater'] = this.userInfo.name;
          // this.orderForm['coordinationers'] = [];
          this.$store.commit('demo/PUSH_ORDERLIST',this.orderForm);
          this.$store.commit('demo/UPDATE_LOGOBJ', {
            title: "创建工单",
            date: this.orderForm['createTime'],
            des: this.userInfo.name + "创建了新工单",
            orderId: id
          });
          this.$store.commit('demo/UPDATE_DEVICELIST', {
            state: 2,
            id: this.orderForm.deviceId
          });
          let device = this.deviceList.filter(i=>i.id == this.orderForm.deviceId)[0];
          this.$store.commit('demo/UPDATE_DEVICELOGOBJ', {
            title: "维修日志",
            date: this.orderForm['createTime'],
            data: device,
            deviceId: this.orderForm.deviceId,
            orderId: id
          });
          let view;
          let tabActive = this.$route.path
          this.visitedRoutes.forEach((item, index) => {
            if (tabActive == item.path) {
              view = item;
            }
          });
          await this.$store.dispatch(
            'tabsBar/delRoute',
            view
          );
          this.$router.push({
            path: '/workOrder/assign'
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    generateUUID() {
      var d = new Date().getTime();
      if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
      }
      var uuid = "xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      return uuid;
    },
  },
};
</script>
<style lang="scss" scoped>
.mainPanel {
  padding-left: 30px;
  height: 100%;
  overflow: auto;
}
</style>