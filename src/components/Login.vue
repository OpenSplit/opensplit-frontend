<template>
  <div class="login">
    <h1>Login</h1>Login
      <div @keydown.enter="handleSubmit">
      <label>
        Email:
        <input type='email' v-model="user.email"/>
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
        email: ''
      }
    }
  },
  methods: {
    handleSubmit () {
      var url = process.env.API_ROOT + '/login/' + this.user.email
      axios.get(url).then(response => {
        console.log(response)
        document.getElementById('errormessage').classList.add('success')
        this.errormessage = 'Success. Please check your inbox.'
      }, error => {
        console.log(error)
        document.getElementById('errormessage').classList.add('error')
        this.errormessage = 'Something went wrong. Please try again'
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
