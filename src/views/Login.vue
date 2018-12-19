<template lang="pug">
    .login.container.is-fluid
        h1.title.is-1.has-text-centered Login
        div(@keydown.enter='handleSubmit')
            .field
                label.label E-Mail
                .control
                    input.input(type='email', placeholder='E-Mail', v-model='user.email')
            button.button.is-primary(@click='handleSubmit') {{ $t('actions.submit') }}
        p#errormessage
            | {{ errormessage }}
</template>

<script>
import axios from 'axios'

export default {
    name: "Login",
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
            var url = process.env.VUE_APP_API + '/login/' + this.user.email
            axios.get(url).then(() => {
                document.getElementById('errormessage').classList.add('success')
                this.errormessage = 'Success. Please check your inbox.'
            }, () => {
                document.getElementById('errormessage').classList.add('error')
                this.errormessage = 'Something went wrong. Please try again'
            })
        }
    },

}
</script>

<style lang="sass" scoped>

</style>
