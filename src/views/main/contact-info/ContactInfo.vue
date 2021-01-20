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
          <img src="../../../assets/icon/plus.svg" alt="plus-icon" />
        </div>
        <div class="chosee">
          <div>All</div>
          <div>Important</div>
          <div>Unread</div>
        </div>
        <div class="chat-list">
          <div class="friend-list" v-for="data in getContactList" :key="data.id">
          <router-link class="link-message" :to="{ path: `/message` }">
            <div class="image">
              <img :src="data.picture" alt="pictures" />
            </div>
            <div class="friend-name">
              <div>{{data.username}}</div>
              <div>Your messages here</div>
            </div>
          </router-link>
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
          <div class="menu">
            <img src="../../../assets/icon/profile-menu.svg" alt="profile-menu" />
          </div>
        </div>
      </div>

      <div class="box-input-message">
        <div class="box">
          <input
            type="text"
            v-model="textMessage"
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
    <div class="side-contactinfo">
      <div class="username-contact">
        <img src="../../../assets/icon/back.svg" @click.prevent="backNavigation()" alt="back-button" />
        <span>@{{dataFriendHeader.username.toLowerCase()}}</span>
      </div>
      <div class="picture-contact">
          <img :src="dataFriendHeader.picture" alt="photo-profile" />
      </div>
      <div class="description-contact">
        <div class="name-contact">
          <div class="name-status">
            <div>{{dataFriendHeader.username}}</div>
            <span>{{dataFriendHeader.status}}</span>
          </div>
          <img src="../../../assets/icon/trash.svg" @click="deleteUser" alt="icon-chat">
        </div>
        <div class="phone-contact">
          <div>Phone Number</div>
          <span>{{dataFriendHeader.phonenumber}}</span>
        </div>
      </div>
      <div class="location">
        <GmapMap
          :center="{lat: location.lat, lng:location.lng}"
          :zoom="7"
          map-type-id="terrain"
          style="width: 100%; height: 100%;"
          >

          <GmapMarker
          :position="{lat: location.lat, lng:location.lng}"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
          />
          </GmapMap>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: 'Message',
  data () {
    return {
      location: {
        lat: 0,
        lng: 0
      },
      idUser: null || localStorage.getItem('id'),
      contactList: [],
      textMessage: '',
      dataFriendHeader: []
    }
  },
  mounted () {
    this.getUsersList()
    this.getFriendHeader()
    this.$getLocation()
      .then(coordinates => {
        this.location.lat = coordinates.lat
        this.location.lng = coordinates.lng
      })
  },
  methods: {
    ...mapActions(['getUsersList']),
    sendMessage () {
    },
    getFriendHeader () {
      axios.get(`${process.env.VUE_APP_URL_API}/users/${this.$route.params.id}`).then(res => {
        this.dataFriendHeader = res.data.result
      }).catch((err) => {
        console.log(err)
      })
    },
    deleteUser () {
      axios.delete(`${process.env.VUE_APP_URL_API}/users/${this.$route.params.id}`).then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Delete user success',
          showConfirmButton: false,
          timer: 1500
        })
        this.$router.push('/')
      }).catch((err) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Delete user failed',
          showConfirmButton: false,
          timer: 1500
        })
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
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100vh;
  width: 100vw;
  background: #e5e5e5;
  overflow: hidden;
  /* border: 1px solid black; */
}

.side-profile {
  display: flex;
  width: 300px;
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
  width: 700px;
  height: 100%;
  background: #fafafa;
}

.side-message .box-friend-profile {
  display: flex;
  width: 700px;
  height: 100px;
  background: #ffffff;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
}

.side-message .box-friend-profile .box {
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 100%;
  align-items: center;
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
  position: fixed;
  bottom: 0px;
  background: #ffffff;
  width: 700px;
  height: 80px;
}

.side-message .box-input-message .box {
  display: flex;
  flex-direction: row;
  width: 612px;
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

.side-contactinfo {
  display: flex;
  flex-direction: column;
  width: 364px;
  height: 100%;
  background: #FFFFFF;
}

.username-contact {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100px;
  background: rgb(255, 255, 255);
}

.username-contact img {
  width: 10.41px;
  height: 18.66px;
  margin-left: 15px;
}

.username-contact span {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #7E98DF;
  margin-left: 30%;
}

.picture-contact {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.picture-contact img {
  width: 82px;
  height: 82px;
  border-radius: 30px;
}

.side-contactinfo .description-contact {
  display: flex;
  flex-direction:column;
  width: 100%;
  height: 110px;
  margin-top: 10px;
  border-bottom: 2px solid #F6F6F6;
}

.side-contactinfo .description-contact .name-contact {
  display: flex;
  flex-direction: row;
  width: 90%;
  justify-content: space-between;
  margin-left: 15px;
}

.name-contact img {
  cursor: pointer;
}

.side-contactinfo .description-contact .name-contact .name-status {
  display: flex;
  flex-direction: column;
}

.side-contactinfo .description-contact .name-contact .name-status div {
  font-style: normal;
  font-weight: bold;
  font-size: 2opx;
  line-height: 26px;
  color: #232323;
}

.side-contactinfo .description-contact .name-contact .name-status span {
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  letter-spacing: 1.335px;
  color: #232323;
}

.side-contactinfo .description-contact .phone-contact {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-top: 10px;
  margin-left: 15px;
}

.side-contactinfo .description-contact .phone-contact div {
  font-style: normal;
  font-weight: bold;
  font-size: 2opx;
  line-height: 26px;
  color: #232323;
}

.side-contactinfo .description-contact .phone-contact span {
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  letter-spacing: 1.335px;
  color: #232323;
}

.side-contactinfo .location {
  display: flex;
  width: 100%;
  height: 200px;
  margin-top: 10px;
}
</style>
