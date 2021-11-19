<template>
  <div class="menu">
    <ul>
      <li v-for="item in menuList" :key="item.name" @click="rou(item)">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          name: "助教列表",
          path: "/"
        },
        {
          name: "订单列表",
          path: "order"
        }
      ]
    };
  },
  methods: {
    rou(row) {
      if (this.$route.path !== row.path) {
        this.$router.push(row.path);
      }
    }
  }
};
</script>

<style lang="less">
.menu {
  width: 120px;
  height: calc(100% - 80px);
  background: #3e3a40;
  float: left;
  li {
    color: #fff;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #eee;
  }
}
</style>