<!--  -->
<template>
  <el-menu
    :uniqueOpened="true"
    default-active="/"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse"
  >
    <el-menu-item index="/">
      <i class="iconfont iconHome-Filled"></i>
      <template #title>首页</template>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="iconfont iconUsermanagement-Filled"></i>
      <template #title>内容管理</template>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="iconfont iconCopy-1-Filled"></i>
      <template #title>素材管理</template>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="iconfont iconShare-Filled"></i>
      <template #title>发布文章</template>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="iconfont iconChat-Filled"></i>
      <template #title>评论管理</template>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="iconfont iconUsermanagement-Filled"></i>
      <template #title>粉丝管理</template>
    </el-menu-item>
    <el-menu-item index="/settings">
      <i class="iconfont iconSettings-Filled"></i>
      <template #title>个人设置</template>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "AppAside",
  data() {
    return {
      //isCollapse: false
    };
  },

  props: ['is-collapse'],

  components: {},

  computed: {},

  methods: {
  },
};
</script>
<style lang='less' scoped>
.el-menu {
    .iconfont {
        //margin-right: 10px;
        padding: 10px;
    }
}
</style>