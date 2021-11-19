<template>
  <div>助教详情</div>
</template>

<script>
import req from "../../api/request";
export default {
  mounted() {
    const row = this.$route.query.row;
    if(!row.openid){
      this.$router.go(-1)
    }
    req({
      url: "/backapi/api/casher/getteacherinfo",
      data: {
        openid: row.openid
      }
    });
  }
};
</script>

<style>
</style>