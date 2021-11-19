<template>
  <div>
      order
  </div>
</template>

<script>
import req from "../../api/request";
export default {
  data(){
    return{
      list:[]
    }
  },
  mounted(){
     req
      .post("/backapi/api/casher/getdayorder", {
        data: {
          day: 7
        } 
      })
      .then(res => {
        this.list = res.data;
      });
  }
}
</script>

<style>

</style>