<template>
  <div class="login">
    <div class="login-box">
      <img class="logo" src="@/assets/images/login/login-logo.png" alt="">
      <h2 class="title">企业内部用户报修</h2>
      <el-form ref="form" :model="form" :rules="rules" label-width="1px" label-position="left">
        <el-form-item label prop="loginName">
          <el-input
            v-model="form.loginName"
            :class="currentInput == 1 ? 'white' : 'green'"
            style="width:100%;"
            placeholder="请输入用户名"
            @focus="currentInput = 1"
            @keyup.enter.native="handleLogin"
          >
            <template slot="prepend">用户名</template>
          </el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input
            v-model="form.password"
            :class="currentInput == 2 ? 'white' : 'green'"
            style="width:100%;"
            type="password"
            placeholder="请输入密码"
            show-password
            @focus="currentInput = 2"
            @keyup.enter.native="handleLogin"
          >
            <template slot="prepend">密&#X3000;码</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button v-preventReClick class="red" size="medium" @click="handleLogin">登录</el-button>
        <!-- <p class="scan">扫码登录</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import { setToken } from '@/utils/auth'
import { preventReClick } from '@/directive'

export default {
  directives: {
    preventReClick
  },
  data() {
    return {
      form: {
        loginName: '',
        password: ''
      },
      rules: {
        loginName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      currentInput: 1
    }
  },
  methods: {
    handleLogin() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$http
            .post('/user/backUserLogin', this.form)
            .then(res => {
              if (res.status === '1') {
                setToken(res.obj);
                this.$message.success('登录成功');
                setTimeout(() => {
                  this.$router.push({ path: '/offerManage/QuotationInformation' });
                }, 1000);
              }
            })
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    background: url('../assets/images/login/logo-bg.png') no-repeat;
    background-size: cover;
    background-position: center center;
    position: relative;
    .login-box {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -200px;
        margin-top: -248px;
        width: 400px;
        height: 495px;
        border-radius: 8px;
        padding: 55px 30px 35px;
        background-color: #fff;
        ::v-deep .el-input {
            .el-input-group__prepend {
                font-family: MicrosoftYaHei;
                font-size: 16px;
                color: #333333;
            }
            .el-input__inner {
                height: 40px;
                line-height: 40px;
                border-left: none;
                &:hover {
                    border-color: #DCDFE6;
                }
                &:focus {
                    border-color: #DCDFE6;
                }
            }
        }
        ::v-deep .el-form-item.is-error .el-input__inner   {
            border-color: #DCDFE6!important;
        }
        ::v-deep .el-input.green {
            .el-input-group__prepend,
            .el-input__inner {
                background-color: #f5f7fa;
            }
        }
        ::v-deep .el-input.white {
            .el-input-group__prepend,
            .el-input__inner {
                background-color: white;
            }
        }
        ::v-deep .el-form-item {
            margin-bottom: 22px;
        }
    }
    .logo {
        display: block;
        width: 200px;
        height: 60px;
        margin: 20px auto;
    }
    .title {
        font-size: 24px;
        text-align: center;
        padding-bottom: 30px;
    }
    .el-button.red {
      width: 100%;
      height: 40px;
      font-size: 18px;
      background-color: #098cfc !important;
      color: #fff;
      margin-top: 12px;
      &:hover {
        opacity: 0.8;
      }
    }
    .scan {
        color: #d3181f;
        text-align: center;
        padding-top: 18px;
        cursor: pointer;
    }
}
</style>
