<template lang="pug">
    nav.navbar(role="navigation" aria-label="main navigation")
        div.navbar-brand
            a.navbar-item(href="/")
                img(src="./../assets/logo.png" alt="opensplit")
            a.navbar-burger(role="button" aria-label="menu" aria-expanded="false" v-on:click="toggleBurger" :class="{'is-active': this.toggled}")
                span(aria-hidden="true")
                span(aria-hidden="true")
                span(aria-hidden="true")
        div.navbar-menu(:class="{'is-active': this.toggled}")
            .navbar-end
                router-link.navbar-item(v-if="!loggedIn" :href="'/' + lang + '/login'") {{ $t('navigation.login') }}
                a.navbar-item(v-if="!loggedIn" :href="'/' + lang + '/register'") {{ $t('navigation.register') }}
                a.navbar-item(v-if="loggedIn" :href="'/' + lang + '/groups'") {{ $t('navigation.groups') }}
                a.navbar-item(v-if="loggedIn" :href="'/' + lang + '/logout'") {{ $t('navigation.logout') }}
</template>

<script>
export default {
    name: "Navigation",
    data() {
        return {
            toggled: false
        }
    },
    computed: {
        loggedIn() {
            return localStorage.getItem('session_key')
        },
        lang: function () {
            return this.$i18n.locale;
        }
    },
    methods: {
        toggleBurger() {
            this.toggled = !this.toggled
        }
    }
}
</script>

<style lang="sass" scoped>
.navbar-menu
    margin-bottom: 2rem
</style>