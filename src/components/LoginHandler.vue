<template>
  <div class="login">
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginHandler',
  mounted () {
    var url = process.env.API_ROOT + '/session/' + this.$route.params.token
    axios.get(url).then(response => {
      console.log(response)
      var key = response.data.session_key
      localStorage.setItem('session_key', key)
      location.href = '/groups'
    }, error => {
      console.log(error)
      location.href = '/login'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
