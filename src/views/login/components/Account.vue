<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, nextTick } from 'vue'
import type { Ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import SvgIcon from '@/components/icons/index.vue'
import { createImgVerifyCode, checkImgVerifyCode } from '@/api/user'
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

const capsTooltip:Ref<boolean> = ref(false)
const checkCapslock = (e:event) => {
  const { key } = e
  capsTooltip.value = key && key.length == 1 && (key >= 'A' && key <= 'Z')
}
const password = ref<HTMLdivElement>()
const showPwd = async () => {
  passwordType.value = passwordType.value === 'password' ? '' : 'password'
  await nextTick()
  password.value.focus()
}
// 运行时声明
// const emits = defineEmits(['handleLogin'])

// 类型式声明
const emits = defineEmits<{
  (e: 'handleLogin'): void
}>()


// 3.3+：另一种更简洁的语法
// const emit = defineEmits<{
//   change: [id: number] // 具名元组语法
//   update: [value: string]
// }>()
const handleLogin = () => {
  emits('handleLogin')
}

const verificationImage = ref<string>('')
const refreshVerification = async () => {
  const verify = await createImgVerifyCode()
  verificationImage.value = `data:image/png;base64,${verify.base64}`
  loginForm.verifyCodeKey = verify.verifyCodeKey
  loginForm.verification = ''
}
onMounted(() => {
  refreshVerification()
})
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
        <span class="svg-container">
          <svg-icon icon-name="IconUser" viewBox="0 0 120 120" width="100" height="100" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          size="small"
          placeholder="请输入您的账号"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-tooltip :visible="capsTooltip" content="Caps lock is On" placement="right">
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-name="IconPassword" viewBox="0 0 120 120" width="100" height="100" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            size="small"
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
            <svg-icon v-show="passwordType === 'password'" icon-name="IconEye" viewBox="0 0 120 120" width="100" height="100" />
            <svg-icon v-show="passwordType !== 'password'" icon-name="IconEyeOpen" viewBox="0 0 950 950" width="100" height="100" />
          </span>
        </el-form-item>
      </el-tooltip>
      <div class="verification">
        <el-form-item prop="verification">
          <el-input
            ref="verification"
            v-model="loginForm.verification"
            size="mini"
            placeholder="请输入验证码"
            name="verification"
            type="text"
            tabindex="2"
            autocomplete="off"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <div class="verification-image">
          <img :src="verificationImage" @click="refreshVerification">
        </div>
        <!-- <el-icon v-show="loginForm.verification && checkIcon" class="el-icon" :name="checkStatus"/> -->
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.verification :deep() .el-icon{
    position: absolute;
    font-size: 18px;
    top: 50%;
    left: 100%;
    display: block;
    transform: translate(0,-50%);
}
.verification :deep() .el-icon-check{
    color: #28e228;
}
.verification :deep() .el-icon-close{
    color: #f00;
}
</style>
<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
$text_color:#606266;

.login-container {

  .svg-container {
    padding: 0px 6px 4px 8px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    font-size: 14px;
  }

  .show-pwd {
    position: absolute;
    right: 7px;
    top: 16px;
    font-size: 16px;
    color: #606266;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  .el-button.el-button--primary.el-button--medium{
    padding:15px 20px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
