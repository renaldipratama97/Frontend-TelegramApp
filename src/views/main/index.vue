<template>
    <div>
        <router-view :idPenerima='idPenerima' :socket='socket' v-on:fire-click="handleChangeIdPenerima"/>
    </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'Main',
  data () {
    return {
      idUser: null || localStorage.getItem('idUser'),
      socket: io('http://localhost:5000/'),
      idPenerima: null
    }
  },
  mounted () {
  },
  methods: {
    handleChangeIdPenerima (id) {
      this.idPenerima = id
      if (this.$route.name !== 'Message') {
        return this.$router.push('/message')
      }
    }
  },
  computed: {

  }
}
</script>

<style scoped>

</style>
