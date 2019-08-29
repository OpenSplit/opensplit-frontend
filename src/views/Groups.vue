<template lang="pug">
    .content.container
        p {{ $t('common.hello') }} {{ user.name }}
        p {{ $t('groups.intro') }}
        div
            v-btn(v-for='(g,index) in this.groups', :key='g.id', v-on:click='selectGroup(g)') {{ g.name }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['user', 'groups'])
    },
    components: {
    },
    name: 'Groups',
    methods: {
        selectGroup(group) {
            this.$router.push({ name: 'group', params: { id: group.id } })
        }
    }
}
</script>

<style lang="sass" scoped>

</style>
