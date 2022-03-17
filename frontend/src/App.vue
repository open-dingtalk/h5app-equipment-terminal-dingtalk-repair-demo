<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "App",
  mounted() {
    this.loadData();
    this.getDDConfig();
  },
  computed: {
    ...mapGetters(["agentId", "corpId"]),
  },
  methods: {
    init() {
      this.$http.post("/biz/getDingSecretKey").then((res) => {
        if (res.success) {
          this.$store.commit("demo/SET_AGENTID", String(res.data.agentId));
          this.$store.commit("demo/SET_CORPID", String(res.data.corpId));
        }
      });
    },
    loadData() {
      let orderList = JSON.parse(localStorage.getItem("orderList"));
      this.$store.commit(
        "demo/SET_ORDERLIST",
        orderList == null ? [] : orderList
      );
      let logObj = JSON.parse(localStorage.getItem("logObj"));
      this.$store.commit("demo/SET_LOGOBJ", logObj == null ? {} : logObj);
      let deviceList = JSON.parse(localStorage.getItem("deviceList"));
      if (deviceList != null) {
        this.$store.commit("demo/SET_DEVICELIST", deviceList);
      }
      let deviceLogObj = JSON.parse(localStorage.getItem("deviceLogObj"));
      this.$store.commit("demo/SET_DEVICELOGOBJ", deviceLogObj == null ? {} : deviceLogObj);
    },
    // 获取钉钉 鉴权
    getDDConfig() {
      this.$http
        .post("/biz/getJsApiAuth", {
          // url: location.origin + '/',
          url: encodeURI(
            window.location.href.substring(0, window.location.href.indexOf("#"))
          ),
        })
        .then((res) => {
          this.$dd.config({
            agentId: this.agentId, // 必填，微应用ID
            corpId: this.corpId, //必填，企业ID
            timeStamp: res.data.timeStamp, // 必填，生成签名的时间戳
            nonceStr: res.data.nonceStr, // 必填，自定义固定字符串。
            signature: res.data.signature, // 必填，签名
            type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
            jsApiList: ["runtime.info", "biz.contact.choose"], // 必填，需要使用的jsapi列表，注意：不要带dd。
          });
          this.$dd.error(function (err) {
            alert("dd error: " + JSON.stringify(err));
          }); //该方法必须带上，用来捕获鉴权出现的异常信息，否则不方便排查出现的问题
          this.login();
        })
        .catch((err) => {
          console.log("AutoConsole: getDDConfig -> err", err);
          self.$message({ type: "warning", message: "登录失败" });
        });
    },
    login() {
      let self = this;
      try {
        self.$dd.ready(function () {
          // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
          try {
            self.$dd.runtime.permission.requestAuthCode({
              corpId: self.corpId,
              onSuccess: function (result) {
                //通过corpId，code获取userid
                self.$http
                  .get("/login", { params: { authCode: result.code } })
                  .then((res) => {
                    if (res.success) {
                      self.$store.commit("demo/SET_USERINFO", {
                        name: res.data.userName,
                      });
                      self.$message({ type: "success", message: "登录成功" });
                    }
                  });
              },
              onFail: function (err) {
                self.$message({ type: "warning", message: "登录失败" });
                // alert(JSON.stringify(err))
              },
            });
          } catch (e) {
            alert(e);
          }
        });
      } catch (e) {
      } finally {
      }
    },
  },
  created() {
    this.init();
  },
};
</script>
