<template>
  <div class="register">
    <h1 class="title is-1 has-text-centered">Register</h1>
      <div @keydown.enter="handleSubmit">
      <div class="field">
        <label class="label">E-Mail</label>
        <div class="control">
          <input class="input" type="email" placeholder="E-Mail" v-model="user.email">
        </div>
      </div>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Nickname" v-model="user.name">
        </div>
      </div>
      <button class="button is-primary" @click="handleSubmit">Submit</button>
    </div>
    <p id="errormessage">
    {{ errormessage }}
    </p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      errormessage: '',
      user: {
        email: '',
        name: ''
      }
    }
  },
  methods: {
    handleSubmit () {
      var url = process.env.API_ROOT + '/users'
      axios.post(url, this.user).then(response => {
        this.errormessage = 'Success. Redirecting to login page'
        document.getElementById('errormessage').classList.add('success')
        location.href = '/login'
      }, error => {
        console.log(error)
        document.getElementById('errormessage').classList.add('error')
        this.errormessage = 'Something went wrong. Maybe this email is already in use?'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register {
  width: 50%;
  margin: 0 auto;
}

#errormessage {
  margin: 10px;
}
.success {
  color: green;
}
.error {
  color: red;
}
</style>
