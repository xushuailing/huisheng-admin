<template>
  <div class='login wh100'>
    <div class=" flex-ac flex-jc wh100">

      <div class="login-form">
        <div class="font-30 font-bold text-center mb-30 pt-20 pb-20">莱赶集管理后台</div>
        <el-form :model="form">
          <el-form-item prop="username">
            <el-input class="w100" v-model="form.username"
                      placeholder="请输入账号"
                      clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="w100" show-password
                      placeholder="请输入密码"
                      clearable
                      v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item prop="memory">
            <el-checkbox v-model="form.memory">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item>
            <div class="pr-15 pl-15">
              <el-button class="w100"
                         type="success"
                         block
                         @click="onSubmit">登录</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { LoginDate } from '../../@types';
@Component
export default class Login extends Vue {
  form = {
    username: '',
    password: '',
    memory: false,
  };

  created() {
    const loginForm = this.$utils._Storage.get('user_login_form');

    this.form = loginForm || {
      username: '',
      password: '',
      memory: false,
    };
  }

  onSubmit() {
    this.$http
      .get<LoginDate>(this.$api.login, {
        username: this.form.username,
        password: this.form.password,
      })
      .then((res) => {
        this.$utils._Storage.set('user_token', res.data.access_token);
        this.$utils._Storage.set('user_info', res.data);
        this.$router.push('/');
        if (this.form.memory) {
          this.$utils._Storage.set('user_login_form', this.form);
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  }
}
</script>
<style lang="scss" scoped>
.login-form {
  width: 400px;
}
</style>
