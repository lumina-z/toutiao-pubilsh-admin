<!--  -->
<template>
  <div class="publish-container">
    <el-card class="box-card">
      <template #header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页 </el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="form.resource">
            <el-radio label="单图"></el-radio>
            <el-radio label="三图"></el-radio>
            <el-radio label="无图"></el-radio>
            <el-radio label="自动"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择频道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "PublishIndex",
  data() {
    return {
      form: {
        name: "nnn",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      article: {
        title: "", //文章标题
        content: "", //文章内容
        cover: { //文章封面
        type: 0,//封面类型
        images: []//封面图片的地址
        },
        channel_id: "",
      },
    };
  },

  created() {},

  props: {},

  components: {},

  computed: {},

  methods: {},
};
</script>
<style lang='less' scoped>
</style>