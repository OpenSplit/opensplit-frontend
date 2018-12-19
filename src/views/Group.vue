<template lang="pug">
.group.container.content
    h1 {{ group.name }}
    ul
        li(v-for='m in group.member') {{ m.name }}
    Transactions(v-bind:id="group.id")

</template>

<script>
import Transactions from './../components/Transactions'
export default {
    components: {
        Transactions
    },
    data() {
        return {
            transactions: []
        }
    },
    computed: {
        group() {
            return this.$store.getters.groups[this.$route.params.id]
        }
    },
    beforeMount() {
        if(!this.$store.getters.groups[this.$route.params.id]) {
            this.$store.dispatch('groups')
        }
    }
}
</script>

<style lang="sass" scoped>
ul
    list-style-type: none
    display: flex
    li
        margin-top: 0
        padding: 0 .5rem
</style>
