<template>
  <div class="listBox">
    <div class="personList" v-for="item in list" :key="item.id">
      <img :src="'http://47.96.65.127:5020/'+item.photo1" alt />
      <span class="name">{{item.realname}}</span>
      <span class="level">高级助教</span>
      <span class="price">100.00</span>
      <button class="submit" @click="lookCoach(item)">查看</button>
    </div>
  </div>
</template>

<script>
import req from "../../api/request";
export default {
  data() {
    return {
      list: []
    };
  },
  mounted() {
    req
      .post("/backapi/api/casher/getdayteacher", {
        data: {
          riqi: "2021-11-19"
        } 
      })
      .then(res => {
        this.list = res.data.data;
      });
  },
  methods: {
    lookCoach(row) {
      this.$router.push({
        path: "/coachDetails",
        query: {
          row
        }
      });
    }
  }
};
</script>

<style lang="less">
.listBox {
  padding: 20px;
  overflow: hidden;
}
.personList {
  width: 25%;
  float: left;
  max-width: 300px;
  margin-top: 20px;
  margin-left: 30px;
  text-align: left;
  img {
    width: 100%;
    display: block;
    margin: auto;
    border-radius: 10px;
  }
  .name {
    display: inline-block;
    width: 50%;
    margin-top: 20px;
  }
  .level {
    display: inline-block;
    width: 50%;
    margin-top: 20px;
  }
  .price {
    display: block;
    margin-top: 10px;
  }
  .time {
    display: block;
    margin-top: 10px;
  }
}
.submit {
  width: 100%;
  margin-top: 10px;
  height: 40px;
  background: #8d0b0d;
  color: #fff;
  border: none;
}
</style>