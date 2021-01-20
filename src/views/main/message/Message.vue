<template>
  <div class="container">
    <notifications position="bottom left" group="notif-message"/>
    <div class="side-profile">
      <div class="box">
        <div class="title">
          <span @click="homeNavigation">Telegram</span>
          <router-link class="link" :to="{ path: `/profile` } "><img src="../../../assets/icon/menu.svg" alt="menu-button" /></router-link>
        </div>
        <div class="input-search">
          <div class="box-search">
            <img src="../../../assets/icon/search.svg" alt="search-icon" />
            <input type="text" name="search" id="search" placeholder="Type your message" />
          </div>
          <img src="../../../assets/icon/plus.svg" alt="plus-icon" />
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
      <div class="box-friend-profile">
        <div class="box">
          <img :src="dataFriendHeader.picture" alt="friend-profile" />
          <div class="name-status">
            <div class="name-profil">{{dataFriendHeader.username}}</div>
            <span>{{dataFriendHeader.status}}</span>
          </div>
          <div class="menu" @click="goContactFriend(dataFriendHeader.id)">
            <img src="../../../assets/icon/profile-menu.svg" alt="profile-menu" />
          </div>
        </div>
      </div>

      <div class="body-message">
        <div class="receiver-message" v-for="(msg, index) in messages" :key="index">
          <img src="../../../assets/icon/default-picture.svg" alt="image-user">
          <div class="messages-text">
            <span>{{msg.message}}</span>
          </div>
          <span>{{formatDate(msg.time)}}</span>
        </div>

        <!-- <div class="sender-message" v-for="(message, index) in textMessages" :key="index">
          <img src="../../../assets/icon/default-picture.svg" alt="image-user">
          <div class="messages-text">
            <span>{{message.message}}</span>
          </div>
          <span>13.30</span>
        </div> -->
      </div>

      <div class="box-input-message">
        <div class="box">
          <input
            type="text"
            @keyup.enter="sendMessage"
            name="input-message"
            id="input-message"
            placeholder="Type your message"
          />
          <div class="icon">
            <img src="../../../assets/icon/plus.svg" alt="plus" />
            <img src="../../../assets/icon/emoticon.svg" alt="emoticon" />
            <img src="../../../assets/icon/img-send.svg" alt="pictures" />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
moment.locale('id')

export default {
  name: 'Message',
  props: ['socket', 'idPenerima'],
  data () {
    return {
      idUser: null || localStorage.getItem('idUser'),
      contactList: [],
      dataFriendHeader: [],
      messages: [],
      senderId: ''
    }
  },
  mounted () {
    this.getUsersList()

    this.getFriendHeader()

    const senderId = localStorage.getItem('idUser')
    this.senderId = senderId
    this.socket.emit('setupUserJoin', { senderId })

    this.socket.on('repeatSendMessage', data => {
      console.log('data from backend :' + data)
      this.messages.push(data)
      this.$notify({ group: 'notif-message', text: data.message })
    })
  },
  updated () {
  },
  methods: {
    ...mapActions(['getUsersList']),
    formatDate (date) {
      return moment(date).format('LT')
    },
    homeNavigation () {
      this.$router.push('/')
    },
    sendMessage (e) {
      const dataMessages = { message: e.target.value, senderId: this.idUser, receiverId: this.idPenerima, time: new Date() }
      this.socket.emit('sendMessage', dataMessages, data => {
        console.log('data from frontend :' + data)
        this.messages.push(data)
      })
      e.target.value = ''
      e.target.focus()
    },
    getFriendHeader () {
      axios.get(`${process.env.VUE_APP_URL_API}/users/${this.idPenerima}`).then(res => {
        this.dataFriendHeader = res.data.result
      }).catch((err) => {
        console.log(err)
      })
    },
    goContactFriend (id) {
      this.$router.push(`/contactinfo/${id}`)
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
  width: 25%;
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
  cursor: pointer;
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
  flex-direction: column;
  align-items: center;
  width: 75%;
  height: 100%;
  background: #fafafa;
}

.side-message .box-friend-profile {
  display: flex;
  width: 100%;
  height: 100px;
  background: #ffffff;
  justify-content: center;
  align-items: center;
}

.side-message .box-friend-profile .box {
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 100%;
  align-items: center;
  cursor: pointer;
}

.side-message .box-friend-profile .box img {
  width: 54px;
  height: 54px;
  border-radius: 15px;
}

.side-message .box-friend-profile .box .name-status {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  margin-left: 10px;
}

.side-message .box-friend-profile .box .name-profil {
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  letter-spacing: -0.165px;
  color: #232323;
}

.side-message .box-friend-profile .box span {
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  letter-spacing: -0.165px;
  color: #7e98df;
}

.side-message .box-friend-profile .box .menu {
  margin-left: auto;
  width: 20px;
  height: 19px;
}

.side-message .box-friend-profile .box .menu img {
  width: 20px;
  height: 19px;
}

.side-message .box-input-message {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000000;
  width: 100%;
  height: 80px;
  margin-top: auto;
}

.side-message .box-input-message .box {
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 40px;
  background: #fafafa;
  border-radius: 15px;
}

.side-message .box-input-message .box input {
  width: 85%;
  height: 100%;
  border: none;
  background: transparent;
  margin-left: 10px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.165px;
  color: #848484;
}

.side-message .box-input-message .box input:focus {
  outline: none;
}

.side-message .box-input-message .box .icon {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 100%;
  width: 100px;
}

/* Body Message */
.body-message {
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 430px;
  margin-top: 5px;
  overflow-y: auto;
  cursor: pointer;
}

.body-message .receiver-message {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
}

.body-message .receiver-message img{
  width: 44px;
  height: 44px;
  border-radius: 20px;
}

.body-message .receiver-message .messages-text{
  display: flex;
  align-items: center;
  width: max-content;
  height: 45px;
  background: #7E98DF;
  border-radius: 35px 35px 35px 10px;
  margin-left: 10px;
}

.body-message .receiver-message .messages-text span{
  width: 200px;
  font-weight: normal;
  font-size: 15px;
  line-height: 185.17%;
  color: #FFFFFF;
  margin-left: 10px;
}

.body-message .receiver-message span{
  font-weight: normal;
  font-size: 12px;
  line-height: 185.17%;
  color:  #000000;
  margin-left: 5px;
}

/* Body message sender */

.body-message .sender-message {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
}

.body-message .sender-message img{
  width: 44px;
  height: 44px;
  border-radius: 20px;
}

.body-message .sender-message .messages-text{
  display: flex;
  align-items: center;
  width: max-content;
  height: 45px;
  background: #FFFFFF;
  border-radius: 35px 10px 35px 35px;
  margin-left: 10px;
}

.body-message .sender-message .messages-text span{
  width: 200px;
  font-weight: normal;
  font-size: 15px;
  line-height: 185.17%;
  color: #232323;
  margin-left: 10px;
}

.body-message .sender-message span{
  font-weight: normal;
  font-size: 12px;
  line-height: 185.17%;
  color:  #000000;
  margin-left: 5px;
}

@media only screen and (min-width: 481px) and (max-width: 767px) {
    .container {
      display: flex;
      flex-direction: column;
      height: auto;
      width: 100vw;
    }
    .container .side-profile{
        width: 90%;
        height: 400px;
        background: rgb(199, 199, 199);
    }

    .container .side-message{
        width: 90%;
        height: 90%;
    }
}

</style>
