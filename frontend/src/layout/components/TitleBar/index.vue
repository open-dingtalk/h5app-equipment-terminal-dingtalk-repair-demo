<!--
 * @Author: huangyh
 * @Date: 2021-09-17 15:46:48
 * @LastEditors: huangyh
 * @LastEditTime: 2021-09-18 17:29:12
-->
<template>
  <div class="panelHead">
    <div class="panelHeadLeft">
      <span v-if="needBack" class="retuBtn" @click="back"><i class="el-icon-arrow-left" /></span>
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
  name: 'TitleBar',
  data() {
    return {
      title: '',
      needBack: false
    }
  },
  computed: {
    ...mapGetters({
      visitedRoutes: 'visitedRoutes'
    })
  },
  watch: {
    $route(n) {
      this.title = n.meta.title;
      this.needBack = n.meta.needBack ? n.meta.needBack : false
    }
  },
  created() {
    this.title = this.$route.meta.title;
    this.needBack = this.$route.meta.needBack ? this.$route.meta.needBack : false
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
      console.log(view)
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 30px;
  background: #fff;
  height: 60px;
  width: 100%;
  .panelHeadLeft {
    .retuBtn {
      cursor: pointer;
      font-size: 14px;
      color: #098cfc;
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
