<template>
  <div id="app">
    <header-com></header-com>
    <menu-com></menu-com>
    <div id="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import headerCom from "../../components/header";
import menuCom from "../../components/menu";
export default {
  components: {
    headerCom,
    menuCom
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  height: 100%;
}
#main {
  height: calc(100% - 80px);
  overflow: auto;
  box-sizing: border-box;
  width: calc(100% - 120px);
  background: rgba(255, 239, 219, 0.4);
}
</style>