<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      status-icon
      :rules="rules"
      label-width="100px"
      class="login-form"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" autocomplete="on"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="passwordword" autocomplete="off"></el-input>
      </el-form-item>

      <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
      <el-button @click="resetForm('loginForm')">重置</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123'
      },
      rules: {
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { username, password } = this.loginForm
          this.$store
            .dispatch('user/login', { username, password })
            .then(() => {
              this.$router.push('/')
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 400px;
    padding: 40px 40px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
}
</style>