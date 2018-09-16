<template>
  <div class="content container">
    <h3>Join Group</h3>

    <p>You requested to join the group <strong>{{ this.group }}</strong>.</p>

    <p>Are you sure?</p>
    <button class="button is-primary" v-on:click="join">YES!</button>
    <a class="button" href="/groups">nope</a>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Groups',
  data () {
    return {
      group: '',
      token: ''
    }
  },
  filters: {
  },
  methods: {
    join: function () {
      this.$root.session_key = localStorage.getItem('session_key')
      var instance = axios.create({
        headers: {'Authorization': this.$root.session_key}
      })
      var url = process.env.API_ROOT + '/groups/join/' + this.token
      instance.post(url).then(response => {
        location.href = '/groups'
      }, error => {
        console.log(error)
      })
    }
  },
  beforeCreate () {
    if (localStorage.getItem('session_key')) {
      this.$root.session_key = localStorage.getItem('session_key')
      var instance = axios.create({
        headers: {'Authorization': this.$root.session_key}
      })

      var url = process.env.API_ROOT + '/checktoken'
      instance.get(url).then(response => {
      }, _ => {
        location.href = '/login'
        localStorage.removeItem('session_key')
        this.$root.session_key = ''
      })
    } else {
      location.href = '/login'
    }
  },
  created () {
    var instance = axios.create({
      headers: {'Authorization': this.$root.session_key}
    })

    this.token = this.$route.params.token
    var url = process.env.API_ROOT + '/groups/join/' + this.token
    instance.get(url).then(response => {
      if (response.data.is_member) {
        location.href = '/groups'
      }
      this.group = response.data.name
    }, error => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
