<template>
  <div class="login">
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'LoginHandler',
    mounted () {
        if(this.$route.params.token) {
            var url = process.env.VUE_APP_API + '/session/' + this.$route.params.token
            axios.get(url).then(response => {
                var key = response.data.session_key
                console.log('session key:'+key)
                localStorage.setItem('session_key', key)
                this.$router.push('/groups')
            }, error => {
                console.log(error)
            })
        }
    }
}
</script>

<style scoped>
</style>