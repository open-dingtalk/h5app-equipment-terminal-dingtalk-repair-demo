<!--
 * @Author: huangyh
 * @Date: 2021-05-24 15:10:03
 * @LastEditors: huangyh
 * @LastEditTime: 2021-09-24 13:35:30
-->
<template>
  <div class="panelHead">
    <div class="panelHeadLeft">
      <span v-if="needBack" class="retuBtn" @click="back"><i class="el-icon-arrow-left" />返回</span>
      <span class="panelHeadTitle">{{ title }}</span>
    </div>
    <div class="panelHeadRight">
      <slot />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PanelHead',
  props: {
    title: {
      type: String,
      default: ''
    },
    needBack: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      visitedRoutes: 'visitedRoutes'
    })
  },
  methods: {
    async back() {
      this.$router.back();
      let view;
      let tabActive = this.$route.path
      this.visitedRoutes.forEach((item, index) => {
        if (tabActive == item.path) {
          view = item;
        }
      });
      // console.log(view)
      await this.$store.dispatch(
        'tabsBar/delRoute',
        view
      );
    }
  }
}
</script>
<style lang="scss" scoped>
.panelHead {
  border-bottom: solid 1px #e5e5e5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 15px 0;
  .panelHeadLeft {
    .retuBtn {
      cursor: pointer;
      font-size: 14px;
      color: #d3181f;
      margin-right: 30px;
      i {
        font-size: 18px;
      }
    }
    .panelHeadTitle {
      cursor: default;
      user-select: none;
      font-size: 16px;
      font-weight: bold;
      color: #333333;
    }
  }
}
</style>
