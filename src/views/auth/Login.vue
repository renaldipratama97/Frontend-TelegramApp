<template>
  <div class="container">
    <div class="white-box">
      <div class="box">
        <span>Login</span>
        <div class="input-text">
          <label for="email">Email</label>
          <input type="text" v-model="email" id="email" name="email" />
        </div>
        <div class="input-text">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" name="password" />
        </div>
        <div class="forgot-password">
          <span>Forgot password ?</span>
        </div>
        <div class="login-button">
          <button @click.prevent="loginMethod">Login</button>
        </div>
        <div class="login-with">
          <span>Login With</span>
        </div>
        <div class="google-button">
          <button>Google</button>
        </div>
        <div class="sign-up">
          <span @click="goRegister">Don’t have an account? Sign Up</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    goRegister () {
      this.$router.push('/register')
    },
    loginMethod () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.login(payload)
        .then(res => {
          Swal.fire({
            icon: 'success',
            title: 'Login Success',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push('/')
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Your email or password wrong',
            showConfirmButton: false,
            timer: 1500
          })
        })
    }
  }
}
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  font-family: "Rubik", sans-serif;
}
.container {
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background: #e5e5e5;
}

.white-box {
  display: flex;
  height: 500px;
  width: 350px;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.05);
  border-radius: 30px;
}

.box {
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 85%;
  /* border: 1px solid black; */
}

.box span {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  text-align: center;
  letter-spacing: -0.165px;
  color: #7e98df;
}

.box .input-text {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10%;
}

.box .input-text label {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #848484;
  opacity: 0.75;
}

.box .input-text input {
  height: 25px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #232323;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  color: #232323;
}

.box .input-text input:focus {
  outline: none;
}

.box .forgot-password {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 8%;
}

.box .forgot-password span {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  text-align: right;
  color: #7e98df;
}

.box .login-button {
  display: flex;
  width: 100%;
  height: 50px;
  margin-top: 5%;
}

.box .login-button button {
  width: 100%;
  height: 100%;
  background: #7e98df;
  border-radius: 70px;
  border: none;
  color: #ffffff;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
}

.box .login-button button:hover {
  background: #ffffff;
  color: #7e98df;
  border: 1px solid #7e98df;
}

.box .google-button button:hover {
  background: #7e98df;
  color: #ffffff;
  border: 1px solid #7e98df;
}

.box .login-with {
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
}

.box .login-with span {
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #848484;
}

.box .google-button {
  display: flex;
  width: 100%;
  height: 50px;
}

.box .google-button button {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 70px;
  border: none;
  color: #7e98df;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  border: 1px solid #7e98df;
}

button:focus {
  outline: none;
}

.box .sign-up {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
  cursor: pointer;
}

.box .sign-up span {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 17px;
  color: #313131;
}

@media only screen and (min-width: 481px) and (max-width: 600px) {
    .container .white-box{
        width: 90%;
        height: 90%;
    }
}
</style>
