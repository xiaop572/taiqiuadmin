<template>
  <div>
    <img :src="'http://47.96.65.127:5020/'+row.photo1" alt class="photo" />
    <h2 class="realname">{{row.realname}}</h2>
    <p class="synopsis">魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑</p>
    <ul>
      <li></li>
    </ul>
  </div>
</template>

<script>
import req from "../../api/request";
export default {
  data() {
    return {
      row: {
        photo1:""
      },
      synopsis:"",
      time:[]
    };
  },
  mounted() {
    if (!this.$route.params.row) {
      this.$router.go(-1);
      return;
    }
    this.row = this.$route.params.row;
    req({
      url: "/backapi/api/casher/getteacherinfo",
      data: {
        openid: this.row.openid
      }
    }).then(res=>{
      
    });
    req({
      url:"/backapi/api/casher/getteachertime",
      method:"post",
      data:{
         openid: this.row.openid,
         current_page:1,
         per_page:9999
      }
    }).then(res=>{
      time
    })
  }
};
</script>

<style lang="less">
.photo {
  margin-top: 20px;
}
.realname{
  margin-top: 20px;
}
.synopsis{
  width: 94%;
  margin:20px auto 0 auto;
  text-align: left;
  font-size: 16px;
  line-height: 25px;
}
</style>