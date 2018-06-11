<template>
  <div class="login">
    <h1 class="title is-1 has-text-centered">Login</h1>
      <div @keydown.enter="handleSubmit">
      <div class="field">
        <label class="label">E-Mail</label>
        <div class="control">
          <input class="input" type="email" placeholder="E-Mail" v-model="user.email">
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
.login {
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
