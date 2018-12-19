<template lang="pug">
    .content.container
        p {{ $t('common.hello') }} {{ user.name }}
        p {{ $t('groups.intro') }}:
        div
            button.button(v-for='(g,index) in this.groups', :key='g.id', v-on:click='selectGroup(index)') {{ g.name }}
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['user', 'groups'])
    },
    components: {
    },
    name: 'Groups',
    methods: {
        selectGroup(index) {
            this.$router.push({ name: 'group', params: { id: index } })
        }
    },
    created () {
        var session_key = localStorage.getItem('session_key')
        var instance = axios.create({
            headers: {'Authorization': session_key}
        })
        this.$store.dispatch('user')
        this.$store.dispatch('groups')
    }
}
</script>

<style lang="sass" scoped>

</style>
