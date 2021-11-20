<template>
  <div class="proListBox">
    <div class="proListTable">
      <el-table :data="proData" style="width: 100%;margin:auto" border>
        <el-table-column prop="tablename" label="球桌名称"></el-table-column>
        <el-table-column prop="xinmin" label="助教姓名"></el-table-column>
        <el-table-column prop="teachmobile" label="助教手机"></el-table-column>
        <el-table-column prop="grabe" label="助教等级"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="customer" label="下单姓名"></el-table-column>
        <el-table-column prop="addtime" label="订单时间"></el-table-column>
        <el-table-column prop="realstartsj" label="开始时间"></el-table-column>
        <el-table-column prop="realendsj" label="结束时间"></el-table-column>
        <el-table-column label="是否接单">
          <template slot-scope="scope">
            {{scope.row.usercheck===0?'未接单':'已接单'}}
          </template>
        </el-table-column>
        <el-table-column label="是否已来">
          <template slot-scope="scope">
            {{scope.row.usercome===0?'未来':'已来'}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="recomPro(scope.row)" type="primary">编辑</el-button>
            <el-button size="mini" @click="delPro(scope.row)" type="danger">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBox">
        <el-pagination background layout="total,sizes,prev, pager, next,jumper" :page-size="pageSize"
          :page-count="pageCount" :total="total" @current-change="changePage" @size-change="changeSize"></el-pagination>
      </div>
    </div>
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
        pageSize: 10
      };
    },
    mounted() {
      this.getPro()
    },
    methods: {
      getPro() {
        req
          .post("/Tqorder/page", {
            curpage: this.currentPage,
            limit: this.pageSize
          })
          .then(res => {
            this.proData = res.data.data; //产品数据
            this.total = res.data.msg; //总条数
          });
      },
      changePage(page) {
        this.currentPage = page;
        this.getPro()
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
        })
      },
      delPro(row) {
        this.$confirm('是否删除该内容?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          req
            .post("/Tqfaq/DeleteByIds",[row.id])
            .then(res => {
              if (res) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.getPro()
              } else {
                this.$message({
                  message:'删除失败',
                  type: 'error'
                });
              }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
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
</style>