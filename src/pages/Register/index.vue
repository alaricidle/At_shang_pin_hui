<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>

      <ValidationObserver ref="form">
        <form>
          <div class="content">
            <label>手机号:</label>
            <ValidationProvider name="手机号" :rules="{required: true, regex: /^1\d{10}$/}">
              <template slot-scope="{errors, classes}">
                <input type="text" placeholder="请输入你的手机号" v-model="mobile" :class="classes">
                <span class="error-msg">{{errors[0]}}</span>
              </template>
            </ValidationProvider>
          </div>
          
          <div class="content">
            <label>验证码:</label>

            <ValidationProvider name="验证码" :rules="{required: true, regex: /^.{4}$/}">
              <template slot-scope="{errors, classes}">
                <input type="text" placeholder="请输入验证码" v-model="code" :class="classes">
                <!-- http://182.92.128.115 -->
                <img ref="code" src="/api/user/passport/code" alt="code" @click="getCode">
                <span class="error-msg">{{ errors[0] }}</span>
              </template>
            </ValidationProvider>

          </div>
          <div class="content">
            <label>登录密码:</label>
            <ValidationProvider name="密码" :rules="{required: true, min: 6, max: 10}">
              <template slot-scope="{ errors, classes }">
                <input type="password" placeholder="请输入你的登录密码" v-model="password" :class="classes">
                <span class="error-msg">{{ errors[0] }}</span>
              </template>
            </ValidationProvider>
          </div>
          <div class="content">
            <label>确认密码:</label>
            <ValidationProvider name="确认密码" :rules="{required: true, is: password}">
              <template slot-scope="{ errors,classes}">
                <input type="password" placeholder="请输入确认密码" v-model="password2" :class="classes">
                <span class="error-msg">{{ errors[0] }}</span>
              </template>
            </ValidationProvider>
          </div>
          <div class="controls">
            <ValidationProvider name="协议" :rules="{oneOf: [true]}">
              <template slot-scope="{ errors,classes}">
                <input name="m1" type="checkbox" v-model="isAgree" :class="classes">
                <span>同意协议并注册《尚品汇用户协议》</span>
                <span class="error-msg">{{errors[0]}}</span>
              </template>
            </ValidationProvider>
          </div>

          <div class="btn">
            <button @click.prevent="overRegister">完成注册</button>
          </div>
        </form>
      </ValidationObserver>
      
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'Register',
    data(){
      return {
        mobile:"",
        code:"",
        password:"",
        password2:"",
        isAgree:true
        
      }
    },
    methods:{
     async getCode(){
      try{
        this.mobile &&(await this.$store.dispatch("user/getCode",this.mobile))
        
        this.code=this.$store.state.user.code
        console.log(this.code)
      }catch(error){
        console.log(error)
      }
      
      },
     async overRegister(){
        let params={
          phone:this.mobile,
          password:this.password,
          code:this.code
        }
        try{
          if(params.phone&&params.password==this.password1&&params.code)
          {
             await this.$store.dispatch("user/userRegisters",params)
          }
      this.$router.push('/login')
        }catch(error){
          console.log(error)
        }
     
      }
    },
    computed:{
     
    }
  }
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 40px;
      }

      .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }
  }
</style>