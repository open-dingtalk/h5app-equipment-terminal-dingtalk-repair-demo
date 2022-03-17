<template>
  <div class="head">
    <header>
      <div class="logo">
        <!-- <img src="@/assets/images/public/logo.png" alt> -->
        <!-- <div class="line"></div> -->
        <h1>企业内部用户报修</h1>
      </div>
      <div class="flex-row">
        <el-avatar class="mr10" v-show="userInfo.name">{{ userInfo.name }}</el-avatar>
        <div class="exit-btn" @click="handleExit">
          <img src="@/assets/images/public/exit.png" alt />
          <span>退出</span>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { removeToken } from '@/utils/auth'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    handleExit() {
      this.$confirm('确定退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          removeToken()
          setTimeout(() => {
            this.$router.push({ path: '/login' })
          }, 1000)
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="scss" scoped>
.head {
  position: fixed;
  left: 0px;
  top: 0px;
  height: 60px;
  width: 100%;
  padding: 0px 22px;
  background-color: #070e35;
  z-index: 1999;
  .flex-row {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }
  .mr10 {
    margin-right: 10px;
  }
  header {
    cursor: pointer;
    height: 60px;
    display: flex;
    justify-content: space-between;
  }
  .logo {
    display: flex;
    align-items: center;
  }
  .line {
    margin: 0px 15px;
    width: 1px;
    height: 34px;
    background-color: #fff;
  }
  h1 {
    color: #fff;
    font-size: 16px;
  }
  .exit-btn {
    cursor: pointer;
    height: 60px;
    display: flex;
    align-items: center;
    img {
      width: 20px;
      height: 22px;
    }
    span {
      padding-left: 8px;
      color: #fff;
    }
  }
}
</style>
