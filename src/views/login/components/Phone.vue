<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
interface LoginForm {
  username: string
  password: string
  tenant: string
  verification: string
  verifyCodeKey: string
}
const loginRef = ref<FormInstance>()
const loginForm = reactive<LoginForm>({
  username: '',
  password: '',
  tenant: 'EE',
  verification: '',
  verifyCodeKey: ''
})
const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('请输入6位以上的密码'))
  } else {
    callback()
  }
}
const checkIcon = ref<boolean>(false)
const verifyStatus = async () => {
  if (!loginForm.verification) return false
  const res = await checkImgVerifyCode({ verifyCodeKey: loginForm.verifyCodeKey, verifyCode: loginForm.verification})
  if(res?.data){
    checkIcon.value = true
    return true
  }
  checkIcon.value = false
  return false
}
const validateVerification = async (rule, value, callback) => {
  if (await verifyStatus()) {
    callback() 
  } else {
    callback(new Error('请填写正确的验证码'))
  }
}
const loginRules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, trigger: 'blur', message: '请输入账号' }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }],
  verification: [{ required: true, trigger: 'blur', validator: validateVerification }]
})

const passwordType = ref<string>('password')

</script>
<template>
  <div>
    <el-form
      ref="loginRef"
      :model="loginForm"
      autocomplete="on"
      :rules="loginRules"
    >
      <el-form-item prop="username">
        <!-- <span class="svg-container">
          <svg-icon icon-class="user" />
        </span> -->
        <el-input
          ref="username"
          v-model="loginForm.username"
          size="mini"
          placeholder="请输入您的账号"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <!-- <span class="svg-container">
            <svg-icon icon-class="password" />
          </span> -->
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            size="mini"
            :type="passwordType"
            placeholder="请输入您的密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
    </el-form>

  </div>
</template>

<style scoped lang="less">
</style>
