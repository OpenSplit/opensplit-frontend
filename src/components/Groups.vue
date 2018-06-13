<template>
  <div class="content">
    Hello {{ user.name }}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Groups',
  data () {
    return {
      user: {},
      session_key: ''
    }
  },
  beforeCreate () {
    if (localStorage.getItem('session_key')) {
      console.log(this.sesison_key)
    } else {
      location.href = '/login'
    }
  },
  beforeMount () {
    this.session_key = localStorage.getItem('session_key')
    var url = process.env.API_ROOT + '/users'
    const options = {
      method: 'GET',
      headers: {'Authorization': this.session_key},
      url
    }
    axios(options).then(response => {
      console.log(response)
      this.user = response.data
    }, error => {
      console.log(error)
    })
  }
}
</script>

<style>
</style>
