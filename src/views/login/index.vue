<template>
  <div class="login-container">
    <el-form class="login-from" ref="login-form" :model="user" :rules="formRules">
    <div class="login-head"></div>
    <!--
       配置Form表单验证
       必须给el-from组件绑定model为表单数据对象
       给需要验证的表单项 el-from-item 绑定 prop 属性
       通过 el-from 组件的 rules 属性配置验证规则

       手动触发表单验证
       给 el-form 添加 ref 属性
       通过 ref 获取表单组件,调用组件的validate 进行验证
     -->
      <el-form-item prop="mobile">
        <el-input 
          v-model="user.mobile"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input 
          v-model="user.code"
          placeholder="请输入验证码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button 
          class="login-btn"
          :loading = "loginLoading"
          type="primary" 
          @click="onLogin"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>


import { ElMessage } from 'element-plus'
import { login } from '@/api/user'

export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
          mobile: '13911111111',
          code: '246810',
          agree: false        //是否同意协议
      },
      //checked: true,          //是否选中协议
      loginLoading: false,    //登录按钮的状态
      formRules: {            //表单验证规则配置
        //
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4,max: 6, message: '请输入正确的验证码', trigger: 'blur' }
        ],
        agree: [
          {
            //自定义校验规则
            validator: (rule, value, callback) => {
              if(value){
                callback()
              } else {
                callback(new Error('请阅读并勾选用户协议'))
              }
            },
            //message: '请阅读并勾选用户协议', 
            trigger: 'change' 
          }
        ]
      }
    }
  },
  methods: {
    onLogin() {
      //获取表单数据
      //const user = this.user

      //验证表单
      this.$refs['login-form'].validate((valid) => {
        if (!valid) {
          return                      //阻止
        } else{
          this.login()
        }
      });

    },
    login(){
      //验证通过,提交登录
      this.loginLoading = true        //该便登录按钮状态
      login(this.user).then(res =>{
        ElMessage.success({
          message: '恭喜你，登录成功',
          type: 'success'
        });
        this.loginLoading = false
        window.localStorage.setItem('user',JSON.stringify(res.data.data))

        //his.$router.push('/')
        this.$router.push({
          name: 'home'
        })
      }).catch(err =>{
        ElMessage.error('手机号或验证码错误');
        this.loginLoading = false
      })
      
      //处理后端响应结果

    }
  }
};
</script>
<style scoped lang="less">
.login-container{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("./loadingpic232.png") no-repeat;
  background-size: cover;
  .login-head{
    height: 83px;
    width: 401px;
    background: url(./logo.png) no-repeat;
    margin-bottom: 30px;
  }
  .login-from{
    background-color: rgba(245, 245, 220, 0.815);
    padding: 50px;
  }
  .login-btn{
    width: 100%;
  }
}
</style>