<template>
  <div class="register">
    <h1>Register</h1>Login
      <div @keydown.enter="handleSubmit">
      <label>
        Email:
        <input type='email' v-model="user.email"/>
      </label>
      <label>
        Name:
        <input type='text' v-model="user.name"/>
      </label>
      <button @click="handleSubmit">Submit</button>
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
        console.log(response)
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
