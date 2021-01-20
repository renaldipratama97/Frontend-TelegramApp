<template>
  <div class="container">
    <div class="side-profile">
      <div class="box">
        <div class="title">
          <span>Telegram</span>
          <router-link class="link" :to="{ path: `/profile`}"><img src="../../../assets/icon/menu.svg" alt="menu-button" /></router-link>
        </div>
        <div class="input-search">
          <div class="box-search">
            <img src="../../../assets/icon/search.svg" alt="search-icon" />
            <input type="text" name="search" id="search" placeholder="Type your message" />
          </div>
          <img src="../../../assets/icon/plus.svg" @click="methodLogout" alt="plus-icon" />
        </div>
        <div class="chosee">
          <div>All</div>
          <div>Important</div>
          <div>Unread</div>
        </div>
        <div class="chat-list">
          <div class="friend-list" v-for="data in getContactList" :key="data.id">
          <div class="link-message" @click="$emit('fire-click', data.id)">
            <div class="image">
              <img :src="data.picture" alt="pictures" />
            </div>
            <div class="friend-name">
              <div>{{data.username}}</div>
              <div>Your messages here</div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <div class="side-message">
      <span>Please select a chat to start messaging</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Swal from 'sweetalert2'
export default {
  name: 'ChatList',
  props: ['socket', 'idPenerima'],
  data () {
    return {
      idUser: null || localStorage.getItem('id'),
      contactList: []
    }
  },
  mounted () {
    this.getUsersList()

    const idUser = localStorage.getItem('idUser')
    this.idUser = idUser
    this.socket.emit('setupUserLogin', idUser)
  },
  methods: {
    ...mapActions(['getUsersList', 'logout']),
    methodLogout () {
      const idUser = localStorage.getItem('idUser')
      this.idUser = idUser
      this.socket.emit('setupUserLogout', idUser)
      this.logout()
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Logout Succes !!!',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push('/login')
        })
    }
  },
  computed: {
    ...mapGetters(['getContactList'])
  }
}
</script>

<style scoped>
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
  background: #e5e5e5;
  /* border: 1px solid black; */
}

.side-profile {
  display: flex;
  width: 350px;
  height: 100%;
  background: #ffffff;
  justify-content: center;
  align-items: center;
}

.side-profile .box {
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;
}

.title {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
}

.title span {
  font-style: normal;
  font-weight: bold;
  font-size: 29px;
  line-height: 34px;
  text-align: center;
  letter-spacing: -0.165px;
  color: #7e98df;
}

.title .link {
  margin-left: auto;
}

.input-search {
  display: flex;
  width: 100%;
  align-items: center;
}

.input-search .box-search {
  display: flex;
  width: 270px;
  height: 60px;
  background: #fafafa;
  border-radius: 15px;
  align-items: center;
}

.input-search .box-search img {
  margin-left: 5%;
}

.input-search .box-search input {
  height: 30px;
  margin-left: 5%;
  width: 190px;
  border: none;
  background: transparent;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.165px;
  color: #848484;
}

.input-search .box-search input:focus {
  outline: none;
}

.input-search img {
  margin-left: auto;
}

.chosee {
  display: flex;
  margin-top: 10%;
  width: 100%;
  justify-content: space-between;
}

.chosee div {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.165px;
  color: #232323;
}

.chosee div:nth-child(1) {
  width: 50px;
  color: #ffffff;
  background: #7e98df;
  border-radius: 20px;
}

.chat-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 350px;
  margin-top: 5%;
}

.friend-list {
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  margin-top: 2%;
}

.friend-list .link-message {
  text-decoration: none;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
}
.friend-list .link-message .image {
  width: 44px;
  height: 44px;
  border-radius: 20px;
}

.friend-list .link-message .image img {
  width: 44px;
  height: 44px;
  border-radius: 15px;
}

.friend-list .link-message .friend-name {
  display: flex;
  flex-direction: column;
  margin-left: 5%;
}

.friend-list .link-message .friend-name div:nth-child(1) {
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: -0.165px;
  color: #232323;
}

.friend-list .link-message .friend-name div:nth-child(2) {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 17px;
  text-align: center;
  letter-spacing: -0.165px;
  color: #7e98df;
}

.side-message {
  display: flex;
  width: 1016px;
  height: 100%;
  background: #fafafa;
  align-items: center;
  justify-content: center;
}

.side-message span {
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 28px;
  color: #848484;
}

@media only screen and (min-width: 481px) and (max-width: 767px) {
    .container {
      display: flex;
      flex-direction: column;
      height: auto;
    }
    .container .side-profile{
        width: 90%;
        height: 90%;
    }

    .container .side-message{
        display: none;
    }
}

</style>
