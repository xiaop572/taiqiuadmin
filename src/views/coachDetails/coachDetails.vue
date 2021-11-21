<template>
  <div>
    <img :src="'http://47.96.65.127:5020/'+row.photo1" alt class="photo" />
    <h2 class="realname">{{row.realname}}</h2>
    <p class="synopsis">魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦
      划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑魂牵梦萦 划莫柑</p>
    <h4 class="timeCaption">空闲时间选择
      <button class="xiadanBtn" @click="xiadan">下单</button>
    </h4>
    <ul class="timeList">
      <li v-for="item in times" :key="item.id" @click="selectTimeFun(item)" :class="{active:item.id===selectTime}">
        {{serializeTime(item.startsj,item.endsj)}}</li>
    </ul>
    <el-dialog title="下单" :visible.sync="dialogFormVisible" width="80%">
      <el-form :model="form">
        <el-form-item label="球桌号">
          <el-select v-model="form.tableid" placeholder="请选择">
            <el-option v-for="item in qzList" :key="item.id" :label="item.tablename" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="助教姓名">
          {{row.realname}}
        </el-form-item>
        <el-form-item label="空闲时间">
          {{selectDate}}
        </el-form-item>
        <el-form-item label="价格">
          ¥{{row.price}}
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import moment from 'moment';
  import req from "../../api/request";
  export default {
    data() {
      return {
        row: {
          photo1: ""
        },
        synopsis: "",
        times: [],
        selectTime: "",
        selectDate:"",
        dialogFormVisible: false,
        form: {
          tableid:"",
          tablename:""
        },
        qzList: [

        ]
      };
    },
    methods: {
      serializeTime(time1, time2) {
        return moment(time1).format('YYYY年MM月DD日    HH:MM') + '-' + moment(time2).format('HH:MM')
      },
      selectTimeFun(item) {
        this.selectDate=moment(item.startsj).format('YYYY年MM月DD日    HH:MM') + '-' + moment(item.endsj).format('HH:MM');
        this.selectTime = item.id;
      },
      xiadan() {
        if (!this.selectTime) {
          this.$message({
            message: '请选择空闲时间',
            type: 'error'
          });
          return;
        }
        this.dialogFormVisible = true;
      }
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
      }).then(res => {

      });
      req({
        url: "/backapi/api/casher/getteachertime",
        method: "post",
        data: {
          openid: this.row.openid,
          current_page: 1,
          per_page: 9999
        }
      }).then(res => {
        this.times = res.data.data
      })
      req({
        url: "/Tqtable/GetList",
        method: "post"
      }).then(res => {
        this.qzList = res.data
      })
    }
  };
</script>

<style lang="less">
  .photo {
    margin-top: 20px;
  }

  .realname {
    margin-top: 20px;
  }

  .synopsis {
    width: 94%;
    margin: 20px auto 0 auto;
    text-align: left;
    font-size: 16px;
    line-height: 25px;
  }

  .timeCaption {
    width: 94%;
    text-align: left;
    margin: 20px auto 20px auto;
  }

  .timeList {
    width: 94%;
    margin: auto;

    li {
      text-align: center;
      width: 45%;
      float: left;
      height: 40px;
      background: #fff;
      border-radius: 10px;
      margin-top: 10px;
      margin-right: 20px;
      line-height: 40px;
      box-sizing: border-box;
    }
  }

  .xiadanBtn {
    background: #8d0b0d;
    border: none;
    width: 100px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    border-radius: 10px;
    margin-left: 10px;
  }

  .active {
    border: 1px solid #8d0b0d;
  }
</style>