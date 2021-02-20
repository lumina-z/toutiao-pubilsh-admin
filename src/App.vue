<template>
  <div id="nav">
    <h1>黑马内容发布管理系统</h1>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </div> 
  <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less"></style>
