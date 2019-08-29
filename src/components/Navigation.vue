<template lang="pug">
    v-toolbar
        v-toolbar-title OpenSplit
        v-spacer
        v-toolbar-items.hidden-sm-and-down
            v-btn(v-if="!loggedIn")
                router-link( :to="'/login'") {{ $t('navigation.login') }}
            v-btn(flat v-if="!loggedIn")
                router-link( :to="'/register'") {{ $t('navigation.register') }}
            v-btn(flat v-if="loggedIn")
                router-link( :to="'/groups'") {{ $t('navigation.groups') }}
            v-btn(flat v-if="loggedIn")
                router-link( :to="'/logout'") {{ $t('navigation.logout') }}
</template>

<script>
export default {
    name: "Navigation",
    data() {
        return {
        }
    },
    computed: {
        loggedIn() {
            return localStorage.getItem('session_key')
        },
    },
    methods: {
    }
}
</script>

<style lang="sass" scoped>
</style>