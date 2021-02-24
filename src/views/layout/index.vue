<template>
  <el-container class="layout">
    <el-aside width="auto">
      <AppAside :is-collapse="isCollapse" class="aside-menu" />
    </el-aside>
    <el-container>
      <el-header>
        <div class="header-left">
          <i
            :class="{
              'el-icon-s-unfold': isCollapse,
              'el-icon-s-fold': !isCollapse,
            }"
            @click="isCollapse = !isCollapse"
          ></i>
          <div>内容管理系统</div>
        </div>
        <el-dropdown>
          <div class="header-right">
            <img class="header-img" :src="user.photo" alt="" />
            <span>{{ user.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人设置</el-dropdown-item>
              <!-- 组件不识别原生事件,需要内部处理 -->
              <el-dropdown-item @click.native="onlogout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from "./components/aside";
import { getUserProfile } from "@/api/user";

export default {
  name: "layoutIndex",
  data() {
    return {
      user: {}, // 当前登录用户信息
      isCollapse: false, //侧边菜单栏
    };
  },

  props: {},

  components: {
    AppAside,
  },
  created() {
    this.loadUserProfile();
  },
  computed: {},

  methods: {
    loadUserProfile() {
      getUserProfile().then((res) => {
        this.user = res.data.data;
      });
    },

    onlogout() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        window.localStorage.removeItem("user");
        this.$router.push("/login");
        this.$message({
          type: "success",
          message: "成功退出登录!",
        });
      }).catch(() => {
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
.layout {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.el-header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid #ccc;
  color: #333;
  .header-left {
    display: flex;
    align-items: center;
  }
  .header-right {
    align-items: center;
    display: flex;
    .header-img {
      padding: 5px;
      width: 40px;
      height: 40px;
      border-radius: 25%;
    }
  }
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
.el-aside {
  background-color: #d3dce6;
  .aside-menu {
    height: 100%;
  }
}
</style>