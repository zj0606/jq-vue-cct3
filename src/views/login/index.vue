<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, reactive, toRefs, onMounted, markRaw} from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/user'
import AccountLogin from '@/views/login/components/Account.vue'
import PhoneLogin from '@/views/login/components/Phone.vue'
import img from '@/assets/home/bg_yearOfRabbit.jpg';
// or
const textImg = new URL('@/assets/home/txt_yearOfRabbit.jpg', import.meta.url).href




const componentTag:Ref<string> = ref('account-login');
const handleSwitch = (comp:string) => {
  componentTag.value = comp
}
interface Comp {
  'account-login': any
  [prop: string]:any 
}
const compTabs = reactive<Comp>({
  'account-login': markRaw(AccountLogin),
  'phone-login': markRaw(PhoneLogin)
})
import { useUserStore } from '@/stores/user'
const store = useUserStore()

const loginForm = ref()
const handleLogin = async () => {
  const { validate, loginFormData } = loginForm.value
  
  const state = await validate()
  if (state) {
    store.login(loginFormData, componentTag.value)
    // login(loginFormData).then(res => console.log(res)
  } else {
    console.log('error submit!!')
    return false
  }
}

const router = useRouter();
const go = ({ path }) => {
  router.replace({
    path
  })
}

const loading:Ref<boolean> = ref(false);

</script>
<template>
  <div class="login-container" :style="{ backgroundImage: `url(${img})` }">
    <div class="login-text">
      <img :src="textImg" alt="" />
    </div>
    <div class="login-form">
      <div class="title-container">
        <h3
          :class="['title', { active: componentTag === 'account-login' }]"
          @click="handleSwitch('account-login')"
        >
          账号登录
        </h3>
        <!-- <h3
          :class="['title',{'active':componentTag === 'phone-login'}]"
          @click="handleSwitch('phone-login')"
        >手机号登录</h3> -->
      </div>

      <!-- 登录表单 -->
      <Transition name="fade-transform" mode="out-in">
        <component
          :is="compTabs[componentTag]"
          ref="loginForm"
          @handleLogin="handleLogin"
        />
      </Transition>

      <el-button
        :loading="loading"
        type="primary"
        class="btn"
        @click.prevent="handleLogin"
      >
        登录
      </el-button>
      <div class="bottom-link">
        <span />
        <a href="javascript:void(0)" @click="go({path: '/forgetPassword?type=forget'})">忘记密码</a>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
$bg: #e6f7ff;
$cursor: #5c8599;

// @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
//   .login-container .el-input input {
//     color: $cursor;
//   }
// }

/* reset element-ui css */
.login-container {
   
  .el-input {
    display: inline-block;
    height: 47px;
    width: 290px;
    .el-input__wrapper {
      width: 100%;
      padding: 0;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      // color: #606266;
      color: #5c8599;
      height: 47px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(0, 0, 0, 0.2);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    margin-top: 0;
    margin-bottom: 22px;
  }

  .verification {
    position: relative;
    margin-bottom: 22px;
    .el-form-item {
      display: inline-block;
      width: 220px;
      margin-right: 10px;
      margin-bottom: 0;
    }
    .verification-image {
      display: inline-block;
      img {
        vertical-align: middle;
        // height: 30px;
        cursor: pointer;
      }
    }
    .message-button {
      display: inline-block;
      width: 120px;
      text-align: center;
      padding: 15px 0;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$text_color: #606266;
.bottom-link {
  display: flex;
  justify-content: space-between;
  a {
    color: #9a9ea3;
  }
}
.login-container {
  //position:relative;
  min-height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  //background-size: 180% 100%;
  // background-color:#b11716;
  overflow: hidden;
  // .login-ads{
  //     position:absolute;
  //     left:0;
  //     top:50%;
  //     height:640px;
  //     background-size: cover;
  //     width:100%;
  //     transform: translateY(-50%);
  // }
  .login-text {
    img {
      display: block;
      width: 600px;
      position: absolute;
      left: calc(15% - 100px);
      top: 26%;
    }
    span {
      display: block;
      width: 600px;
      position: absolute;
      left: calc(23% - 100px);
      top: 40%;
      font-size: 42px;
      color: red;
      font-weight: bold;
    }
  }
  .login-logo {
    position: relative;
    img {
      width: 180px;
      height: auto;
      display: block;
      position: absolute;
      top: 36px;
      left: 8%;
    }
  }
  .login-form {
    position: absolute;
    width: 420px;
    max-width: 100%;
    padding: 50px 35px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 10px;
    top: 50%;
    left: calc(100% - 150px);
    transform: translate(-100%, -50%);
    .btn {
      width: 100%;
      margin-bottom: 30px;
      padding: 15px 20px;
      font-size: 14px;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 0px 5px 4px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 16px;
      color: $dark_gray;
      margin: 0px 10px 40px auto;
      text-align: center;
      font-weight: bold;
      display: inline-block;
      position: relative;
      cursor: pointer;
      &.active {
        color: $text_color;
        font-size: 26px;
        &::after {
          content: ' ';
          position: absolute;
          bottom: -10px;
          left: 50%;
          background: #047bb8;
          width: 40px;
          height: 5px;
          transform: translate(-50%, 0);
        }
      }
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $text_color;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  .el-button.el-button--primary.el-button--medium {
    padding: 15px 20px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
