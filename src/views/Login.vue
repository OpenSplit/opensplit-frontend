<template lang="pug">
    .login.container.is-fluid
        h1 {{ $t('navigation.login') }}
        v-form(ref='form' v-model='valid' lazy-validation v-on:submit.prevent='submit')
            v-text-field(label='E-Mail' placeholder='mail@domain.tld' required v-model='user.email' type='email' :rules='rules')
            v-btn(@click='submit') {{ $t('login.login') }}
</template>

<script>
import axios from 'axios'

export default {
    name: "Login",
    data () {
        return {
            valid: true,
            rules: [
                v => !!v || `${this.$t('login.email')} ${this.$t('common.required')}`,
            ],
            user: {
                email: ''
            }
        }
    },
    methods: {
        submit () {
            if (this.$refs.form.validate()) {
                var url = process.env.VUE_APP_API + '/login/' + this.user.email
                axios.get(url).then(() => {
                    this.$store.dispatch('notification', { message: 'Success. Please check your inbox.', type: 'success' })
                }).catch(() => {
                    this.$store.dispatch('notification', { message: 'Something went wrong. Please try again', type: 'error' })
                })
            }
        }
    },

}
</script>

<style lang="sass" scoped>

</style>
