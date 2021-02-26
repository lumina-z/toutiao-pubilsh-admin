<!--  -->
<template>
  <div class="article-container">
    <el-card class="filtrate-card">
      <template #header>
        <div class="card-header">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item to="/">首页 </el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </template>
      <el-form size="mini" ref="form" :model="form" label-width="40px">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择">
            <el-option label="全部" :value="null"> </el-option>
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="(channel, index) in channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-col :span="11">
            <el-date-picker
              v-model="rangeDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :shortcuts="shortcuts"
              format="YYYY-MM-DD"
            >
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="loading" @click="loadArticles(1)"
            >立即查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <template #header #default="scope">
        <div class="card-header">
          根据筛选条件共查询到{{ total_count }}条结果:
        </div>
      </template>
      <el-table
        v-loading="loading"
        size="mini"
        :data="articles"
        stripe
        class="list-table"
      >
        <el-table-column prop="date" label="封面">
          <template #default="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.cover.images[0]"
              fit="cover"
              lazy
              :preview-src-list="scope.row.cover.images[0]"
            >
              <template #placeholder>
                <div class="image-slot">加载中<span class="dot">...</span></div>
              </template>
            </el-image>
            <!-- <img
              v-if="scope.row.cover.images[0]"
              class="articles-cover"
              :src="scope.row.cover.images[0]"
              alt=""
            />
            <img class="articles-cover" v-else src="./1.png" alt="" /> -->
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <!-- 如果需要在自定义模板中获取当前遍历数据,那么就要在 -->
          <!-- template上声明 s lot-scope= `scope` -->
          <template #default="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{
              articleStatus[scope.row.status].text
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="mini" circle icon="el-icon-edit"></el-button>
            <el-button
              size="mini"
              circle
              type="danger"
              icon="el-icon-delete"
              @click="onDeleteArticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="total_count"
        @current-change="onCurrentChange"
        :page-size="pageSize"
        :disabled="loading"
        :current-page.sync="page"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, getArticleChannels, delArticle } from "@/api/article";
import moment from "moment";

export default {
  name: "ArticleIndex",
  data() {
    return {
      shortcuts: [
        {
          text: "最近一周",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          })(),
        },
        {
          text: "最近一个月",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          })(),
        },
        {
          text: "最近三个月",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          })(),
        },
      ],
      articles: [], //文章数据列表
      articleStatus: [
        { status: 0, text: "草稿", type: "" },
        { status: 1, text: "待审核", type: "warning" },
        { status: 2, text: "审核通过", type: "success" },
        { status: 3, text: "审核失败", type: "danger" },
        { status: 4, text: "已删除", type: "info" },
      ],
      total_count: 0, //文章的条数
      pageSize: 10, //每页的大小
      status: null, //查询文章的状态
      channels: [], //文章的频道列表
      channelId: null, //查询文章的频道
      rangeDate: [], //筛选日期范围
      loading: true,
      page: 1         //当前页码
    };
  },

  created() {
    this.loadChannels();
    this.loadArticles(1);
  },

  props: {},

  components: {},

  computed: {},

  methods: {
    loadArticles(page) {
      this.loading = true;
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: moment(
          this.rangeDate[0] || moment().set({ year: 1000 })
        ).format("YYYY-MM-DD"), //开始日期
        end_pubdate: moment(
          this.rangeDate[1] || moment().set({ year: 5000 })
        ).format("YYYY-MM-DD"), //截至日期
      }).then((res) => {
        this.articles = res.data.data.results;
        this.total_count = res.data.data.total_count;

        this.loading = false;
        //console.log(moment(this.rangeDate[0]).format('YYYY-MM-DD'));
      });
    },
    onSubmit() {
      console.log("submit!");
    },
    onCurrentChange(page) {
      this.loadArticles(page);
    },
    loadChannels() {
      getArticleChannels().then((res) => {
        this.channels = res.data.data.channels;
      });
    },
    onDeleteArticle(articleId) {
      //console.log(articleId);
      this.$confirm("此操作将删除文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //
          delArticle(articleId.toString()).then((res) => {
            //删除成功后刷新页面
            this.loadArticles(thsi.page)
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
};
</script>
<style lang='less' scoped>
.filtrate-card {
  margin-bottom: 15px;
}
.list-table {
  width: 100%;
  margin-bottom: 20px;
}
.articles-cover {
  width: 100px;
  background-size: cover;
}
</style>