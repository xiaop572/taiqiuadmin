<template>
  <div>
    <img src="../../assets/logo.png" alt class="logo" />
    <p>aswz网络会所</p>
    <div class="form">
      <el-input v-model="username" placeholder="用户名" class="int"></el-input>
      <el-input v-model="password" placeholder="密码" type="password" class="int"></el-input>
      <el-button class="Btn" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import req from "../../api/request";
export default {
  data() {
    return {
      username: "admin",
      password: ""
    };
  },
  methods: {
    login() {
      req({
        url: "/backapi/api/user/login",
        method: "post",
        data: {
          username: this.username,
          password: this.password,
          dept_id: 0
        }
      }).then(res => {
        if (res.data.success) {
          let data = res.data.data;
          localStorage.setItem("token", data.token);
          localStorage.setItem("nickname", data.nickname);
          this.$router.push('/')
        }
      });
    }
  },
  mounted() {}
};
</script>

<style>
.form {
  width: 60%;
  margin: auto;
}
.int {
  margin-top: 20px;
  overflow: hidden;
}
.Btn {
  width: 100%;
  display: block;
  margin-top: 40px !important;
  background: #422c17 !important;
  color: #fff !important;
}
.logo {
  margin-top: 50px;
}
</style>