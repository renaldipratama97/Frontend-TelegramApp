<template>
  <div class="container">
    <div class="side-profile">
      <div class="box">
        <div class="username-title">
          <img src="../../../assets/icon/back.svg" @click.prevent="backNavigation()" alt="back-button" />
          <span>@{{myProfile.username.toLowerCase()}}</span>
        </div>
        <div class="photo-username">
          <div class="photo-profile">
            <label for="photoprofile">
              <img :src="myProfile.picture" id="pictureprofile" alt="photo-profile" />
            </label>
            <div class="input-file">
              <input type="file" accept="image/x-png/,image/gif,image/jpeg" @change = "uploadPhoto" class="input-photo" id="photoprofile">
            </div>
          </div>
          <div class="username">{{myProfile.username}}</div>
          <span>@{{myProfile.username.toLowerCase()}}</span>
        </div>
        <div class="account-box">
          <span>Account</span>
          <div class="phone">{{myProfile.phonenumber}}</div>
          <div @click.prevent="editPhones">Tap to change phone number</div>
        </div>

        <div class="change-username">
          <span>@{{myProfile.username.toLowerCase()}}</span>
          <div>Username</div>
        </div>

        <div class="change-bio">
          <span>{{myProfile.bio}}</span>
          <div @click.prevent="editBio">Bio</div>
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
    <div class="side-message">
      <span>Please select a chat to start messaging</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import $ from 'jquery'
import Swal from 'sweetalert2'

export default {
  name: 'Profile',
  data () {
    return {
      location: {
        lat: 0,
        lng: 0
      },
      picture: [],
      previewImg: '',
      idUser: null || localStorage.getItem('idUser')
    }
  },
  mounted () {
    this.getProfile()
    this.$getLocation()
      .then(coordinates => {
        this.location.lat = coordinates.lat
        this.location.lng = coordinates.lng
      })
    this.onInputUploadChange()
    this.updatePhoneNumber()
  },
  methods: {
    ...mapActions(['getProfile', 'updateUserProfile', 'updatePhoneNumber', 'bio']),
    backNavigation () {
      this.$router.push('/')
    },
    async uploadPhoto () {
      const imagename = (event.target.files[0].name)
      this.picture = imagename
      this.previewImg = URL.createObjectURL(event.target.files[0])
      const form = new FormData()
      const image = document.getElementById('photoprofile').files[0]
      form.append('picture', image)
      const idUser = localStorage.getItem('idUser')
      const payload = {
        idUser,
        formData: form
      }
      console.log(payload.formData)
      console.log(image)
      await this.updateUserProfile(payload)
    },
    onInputUploadChange () {
      const self = this
      $('#photoprofile').change(function () {
        self.readImgUrlAndPreview(this)
      })
    },
    readImgUrlAndPreview (input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = function (e) {
          $('#pictureprofile').attr('src', e.target.result)
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    async editPhones () {
      const { value: phone } = await Swal.fire({
        title: 'Input your phone number',
        input: 'text',
        inputLabel: 'Your phone number',
        inputPlaceholder: 'Enter your phone number'
      })

      if (phone) {
        // Swal.fire(`Entered phone: ${phone}`)
        const phonenumber = phone
        const payload = {
          idUser: localStorage.getItem('idUser'),
          phonenumber: phonenumber
        }
        await this.updatePhoneNumber(payload)
      }
    },
    async editBio () {
      const { value: bio } = await Swal.fire({
        title: 'Input your phone bio',
        input: 'text',
        inputLabel: 'Your bio',
        inputPlaceholder: 'Enter your bio'
      })

      if (bio) {
        // Swal.fire(`Entered phone: ${phone}`)
        const databio = bio
        const payload = {
          idUser: localStorage.getItem('idUser'),
          bio: databio
        }
        await this.bio(payload)
      }
    }
  },
  computed: {
    ...mapGetters(['myProfile'])
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

.side-profile .box .location{
  display: flex;
  width: 100%;
  height: 150px;
  margin-top: 10px;
}

.box .username-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 70px;
}

.box .username-title span {
  margin-left: 33%;
}

.photo-username {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 150px;
  justify-content: flex-start;
  align-items: center;
}

.photo-username .photo-profile {
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.photo-username .photo-profile label img{
  width: 82px;
  height: 82px;
  border-radius: 30px;
}

.photo-username .input-file{
  display: none;
}

.photo-username .username {
  margin-top: 13px;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: -0.165px;
  color: #232323;
}

.photo-username span {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 1.335px;
  color: #848484;
}

.account-box {
  display: flex;
  width: 100%;
  height: 80px;
  flex-direction: column;
  cursor: pointer;
}

.account-box span {
  display: flex;
  width: max-content;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 23px;
  color: #232323;
}

.account-box div {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #232323;
}

.account-box .phone {
  margin-top: 10px;
  letter-spacing: 0.5px;
  font-weight: bold;
}

.account-box div:nth-child(3) {
  color: #7E98DF;
}

.change-username {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70px;
  border-top: 1px solid #F6F6F6;
  border-bottom: 1px solid #F6F6F6;
  justify-content: center;
}

.change-username span{
  width: max-content;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #232323;
}

.change-username div {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.17px;
  color: #848484;
  margin-top: 5px;
}

/* bio */

.change-bio {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70px;
  border-top: 1px solid #F6F6F6;
  border-bottom: 1px solid #F6F6F6;
  justify-content: center;
  cursor: pointer;
}

.change-bio span{
  width: max-content;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #232323;
}

.change-bio div {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.17px;
  color: #848484;
  margin-top: 5px;
}

/* Akhir bio  */

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
</style>
