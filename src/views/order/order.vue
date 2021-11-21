<template>
  <div class="proListBox">
    <div class="proListTable">
      <el-table :data="proData" style="width: 100%;margin:auto" border>
        <el-table-column prop="tablename" label="球桌名称"></el-table-column>
        <el-table-column prop="xinmin" label="助教姓名"></el-table-column>
        <el-table-column prop="teachmobile" label="助教手机"></el-table-column>
        <el-table-column prop="customer" label="下单姓名"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="lookXiangxi(scope.row)" type="primary">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBox">
        <el-pagination
          background
          layout="total,sizes,prev, pager, next,jumper"
          :page-size="pageSize"
          :page-count="pageCount"
          :total="total"
          @current-change="changePage"
          @size-change="changeSize"
        ></el-pagination>
      </div>
    </div>
    <el-dialog title="查看详情" :visible.sync="dialogTableVisible" width="60%">
      <ul class="lookUl">
        <li>
          <span>球桌名称：</span>
          <span>{{row.tablename}}</span>
        </li>
        <li>
          <span>助教姓名:</span>
          <span>{{row.xinmin}}</span>
        </li>
        <li>
          <span>助教等级:</span>
          <span>{{row.grade}}</span>
        </li>
        <li>
          <span>单价:</span>
          <span>{{row.price}}</span>
        </li>
        <li>
          <span>助教手机号:</span>
          <span>{{row. teachmobile}}</span>
        </li>
        <li>
          <span>陪练开始时间:</span>
          <span>{{row.realstartsj}}</span>
        </li>
        <li>
          <span>陪练结束时间:</span>
          <span>{{row.realendsj}}</span>
        </li>
        <li>
          <span>客户名称:</span>
          <span>{{row.customer}}</span>
        </li>
        <li>
          <span>是否接单:</span>
          <span>{{row.usercheck===0?'未接单':'已接单'}}</span>
        </li>
        <li>
          <span>是否已来:</span>
          <span>{{row.usercome===0?'未来':'已来'}}</span>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import req from "../../api/request";
export default {
  data() {
    return {
      proData: [],
      total: 0,
      currentPage: 1,
      pageCount: 1,
      pageSize: 10,
      dialogTableVisible: false,
      row: {}
    };
  },
  mounted() {
    this.getPro();
  },
  methods: {
    lookXiangxi(row) {
      this.row = row;
      console.log(row);
      this.dialogTableVisible = !this.dialogTableVisible;
    },
    getPro() {
      req
        .post("/Tqorder/page", {
          curpage: this.currentPage,
          limit: this.pageSize
        })
        .then(res => {
          this.proData = res.data.data; //产品数据
          this.total = parseInt(res.data.msg); //总条数
        });
    },
    changePage(page) {
      this.currentPage = page;
      this.getPro();
    },
    changeSize(size) {
      this.currentPage = 1;
      this.pageSize = size;
      this.getPro();
    },
    recomPro(row) {
      this.$router.push({
        name: "editDesk",
        params: row
      });
    },
    delPro(row) {
      this.$confirm("是否删除该内容?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          req.post("/Tqfaq/DeleteByIds", [row.id]).then(res => {
            if (res) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getPro();
            } else {
              this.$message({
                message: "删除失败",
                type: "error"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="less">
.proListBox {
  .proListTable {
    padding: 50px 0;
  }

  .pageBox {
    padding: 50px 0;
  }
}
li {
  list-style: none;
}
.lookUl {
  width: 80%;
  margin: auto;
  text-align: left;
  li {
    margin-top: 10px;
    font-size: 16px;
  }
}
</style>